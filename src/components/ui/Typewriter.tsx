import { useState, useEffect } from "react";

interface TypewriterProps {
    text: string;
    speed?: number;
}

export const Typewriter = ({ text, speed = 20 }: TypewriterProps) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;

        const timer = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;

            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);


        return () => {
            clearInterval(timer);
            setDisplayedText("");
        };
    }, [text, speed]);

    return (
        <p className="text-sm text-(--primary-text) leading-relaxed whitespace-pre-wrap">
            {displayedText}
        </p>
    );
};