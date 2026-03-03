'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"

interface CardImage {
    src: string;
    alt: string;
}

interface CardStackProps {
    images: CardImage[];
    className?: string;
    cardWidth?: number;
    cardHeight?: number;
    spacing?: {
        x?: number;
        y?: number;
    };
}

interface CardProps extends CardImage {
    index: number;
    isHovered: boolean;
    isFirstCard?: boolean;
    isMobile: boolean;
    isFront?: boolean;
    frontCardIndex: number | null;
    onClick: (index: number) => void;
    width: number;
    height: number;
    spacing: { x?: number; y?: number };
}

const Card = ({
    src,
    alt,
    index,
    isHovered,
    isMobile,
    isFront,
    frontCardIndex,
    onClick,
    width,
    height,
    spacing
}: CardProps) => {
    return (
        <motion.div
            className={cn(
                "absolute overflow-hidden rounded-xl shadow-lg",
                isFront && "z-20"
            )}
            style={{
                width,
                height,
                transformStyle: 'preserve-3d',
                transformOrigin: isMobile ? 'top center' : 'left center',
                zIndex: isFront ? 20 : 5 - index,
                filter: isFront || frontCardIndex === null ? 'none' : 'blur(5px)',
            }}
            initial={{
                rotateY: 0,
                x: 0,
                y: 0,
                scale: 1,
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            }}
            animate={isFront
                ? {
                    scale: 1.2,
                    rotateY: 0,
                    x: 0,
                    y: isMobile ? 0 : -50,
                    z: 50,
                    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.5)',
                }
                : isHovered
                    ? {
                        rotateY: isMobile ? 0 : -45,
                        x: isMobile ? 0 : index * (spacing.x ?? 50),
                        y: isMobile ? index * (spacing.y ?? 50) : index * -5,
                        z: index * 15,
                        scale: 1.05,
                        boxShadow: `10px 20px 30px rgba(0, 0, 0, ${0.2 + index * 0.05})`,
                        transition: { type: 'spring', stiffness: 300, damping: 50, delay: index * 0.1 }
                    }
                    : {
                        rotateY: 0,
                        x: 0,
                        y: 0,
                        z: 0,
                        scale: 1,
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 20, delay: (4 - index) * 0.1 }
                    }
            }
            onClick={() => onClick(index)}
        >
            <img
                src={src}
                alt={alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="rounded-xl"
            />
        </motion.div>
    );
};

export function CardStack3D({
    images,
    className,
    cardWidth = 320,
    cardHeight = 192,
    spacing = { x: 50, y: 50 }
}: CardStackProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={cn("flex justify-center items-center py-32", className)}>
            <div
                className="relative"
                style={{ width: cardWidth, height: cardHeight, perspective: '1000px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {images.map((image, index) => (
                    <Card
                        key={index}
                        {...image}
                        index={index}
                        isHovered={isHovered}
                        isFirstCard={index === 0}
                        isMobile={isMobile}
                        isFront={frontCardIndex === index}
                        frontCardIndex={frontCardIndex}
                        onClick={(idx) => setFrontCardIndex(prev => prev === idx ? null : idx)}
                        width={cardWidth}
                        height={cardHeight}
                        spacing={spacing}
                    />
                ))}
            </div>
        </div>
    );
}
