'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface WebcamPixelGridProps {
    gridCols?: number;
    gridRows?: number;
    maxElevation?: number;
    motionSensitivity?: number;
    elevationSmoothing?: number;
    colorMode?: 'webcam' | 'grayscale';
    backgroundColor?: string;
    mirror?: boolean;
    gapRatio?: number;
    invertColors?: boolean;
    darken?: number;
    borderColor?: string;
    borderOpacity?: number;
    className?: string;
    onWebcamReady?: () => void;
    onWebcamError?: (err: Error) => void;
}

export function WebcamPixelGrid({
    gridCols = 60,
    gridRows = 40,
    maxElevation = 50,
    motionSensitivity = 0.25,
    elevationSmoothing = 0.2,
    colorMode = 'webcam',
    backgroundColor = '#030303',
    mirror = true,
    gapRatio = 0.05,
    invertColors = false,
    darken = 0.6,
    borderColor = '#ffffff',
    borderOpacity = 0.06,
    className,
    onWebcamReady,
    onWebcamError,
}: WebcamPixelGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const prevFrameRef = useRef<ImageData | null>(null);
    const elevationsRef = useRef<Float32Array | null>(null);
    const animationRef = useRef<number>(0);
    const [isReady, setIsReady] = useState(false);

    const initWebcam = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: gridCols * 4 }, height: { ideal: gridRows * 4 } },
            });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            await video.play();
            videoRef.current = video;
            setIsReady(true);
            onWebcamReady?.();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Webcam access denied');
            onWebcamError?.(error);
        }
    }, [gridCols, gridRows, onWebcamReady, onWebcamError]);

    useEffect(() => {
        initWebcam();
        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((t) => t.stop());
            }
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [initWebcam]);

    useEffect(() => {
        if (!isReady || !canvasRef.current || !videoRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const totalCells = gridCols * gridRows;
        if (!elevationsRef.current || elevationsRef.current.length !== totalCells) {
            elevationsRef.current = new Float32Array(totalCells);
        }

        // Offscreen canvas for sampling video
        const offscreen = document.createElement('canvas');
        offscreen.width = gridCols;
        offscreen.height = gridRows;
        const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
        if (!offCtx) return;

        const render = () => {
            const { width, height } = canvas.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            const video = videoRef.current!;
            if (video.readyState < 2) {
                animationRef.current = requestAnimationFrame(render);
                return;
            }

            // Sample webcam frame
            offCtx.save();
            if (mirror) {
                offCtx.translate(gridCols, 0);
                offCtx.scale(-1, 1);
            }
            offCtx.drawImage(video, 0, 0, gridCols, gridRows);
            offCtx.restore();

            const frame = offCtx.getImageData(0, 0, gridCols, gridRows);
            const prev = prevFrameRef.current;

            // Calculate motion-based elevation
            const elevations = elevationsRef.current!;
            for (let i = 0; i < totalCells; i++) {
                const idx = i * 4;
                let motion = 0;
                if (prev) {
                    const dr = Math.abs(frame.data[idx] - prev.data[idx]);
                    const dg = Math.abs(frame.data[idx + 1] - prev.data[idx + 1]);
                    const db = Math.abs(frame.data[idx + 2] - prev.data[idx + 2]);
                    motion = (dr + dg + db) / 3;
                }
                const targetElev = motion * motionSensitivity * maxElevation;
                elevations[i] += (targetElev - elevations[i]) * elevationSmoothing;
            }
            prevFrameRef.current = frame;

            // Render pixel grid
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cellW = canvas.width / gridCols;
            const cellH = canvas.height / gridRows;
            const gap = Math.min(cellW, cellH) * gapRatio;

            for (let row = 0; row < gridRows; row++) {
                for (let col = 0; col < gridCols; col++) {
                    const i = row * gridCols + col;
                    const idx = i * 4;
                    let r = frame.data[idx];
                    let g = frame.data[idx + 1];
                    let b = frame.data[idx + 2];

                    if (invertColors) {
                        r = 255 - r;
                        g = 255 - g;
                        b = 255 - b;
                    }

                    r = Math.round(r * (1 - darken));
                    g = Math.round(g * (1 - darken));
                    b = Math.round(b * (1 - darken));

                    if (colorMode === 'grayscale') {
                        const gray = Math.round((r + g + b) / 3);
                        r = g = b = gray;
                    }

                    const elev = elevations[i];
                    const x = col * cellW + gap;
                    const y = row * cellH + gap - elev * 0.3;
                    const w = cellW - gap * 2;
                    const h = cellH - gap * 2;

                    // Cell fill
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    ctx.fillRect(x, y, w, h);

                    // Cell border
                    if (borderOpacity > 0) {
                        ctx.strokeStyle = `${borderColor}${Math.round(borderOpacity * 255).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.5;
                        ctx.strokeRect(x, y, w, h);
                    }

                    // Elevation shadow
                    if (elev > 2) {
                        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.3, elev / maxElevation * 0.3)})`;
                        ctx.fillRect(x, y, w, 1);
                    }
                }
            }

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [
        isReady, gridCols, gridRows, maxElevation, motionSensitivity,
        elevationSmoothing, colorMode, backgroundColor, mirror,
        gapRatio, invertColors, darken, borderColor, borderOpacity,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={cn('w-full h-full', className)}
            style={{ display: 'block' }}
        />
    );
}
