"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface EncryptedTextProps {
    text: string;
    interval?: number;
}

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>/?";

export function EncryptedText({ text, interval = 50 }: EncryptedTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let iteration = 0;
        setIsAnimating(true);

        const intervalId = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                setIsAnimating(false);
                clearInterval(intervalId);
            }

            iteration += 1 / 3;
        }, interval);

        return () => clearInterval(intervalId);
    }, [text, interval]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block relative overflow-hidden"
        >
            {displayText}
        </motion.span>
    );
}
