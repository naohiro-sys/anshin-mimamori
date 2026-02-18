"use client";

import { useState, useRef, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import EmergencyModal from "./EmergencyModal";

export default function EmergencyButton() {
    const [isPressing, setIsPressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext on user interaction
    useEffect(() => {
        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
        };
        window.addEventListener('touchstart', initAudio);
        window.addEventListener('mousedown', initAudio);
        return () => {
            window.removeEventListener('touchstart', initAudio);
            window.removeEventListener('mousedown', initAudio);
        };
    }, []);

    const playBeep = () => {
        if (audioContextRef.current) {
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(880, audioContextRef.current.currentTime);

            gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

            oscillator.start();
            oscillator.stop(audioContextRef.current.currentTime + 0.5);
        }
    };

    const startPress = () => {
        setIsPressing(true);
        setProgress(0);

        const startTime = Date.now();
        const duration = 3000; // 3 seconds

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                triggerEmergency();
            }
        }, 50);
    };

    const endPress = () => {
        setIsPressing(false);
        setProgress(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const triggerEmergency = () => {
        endPress();
        playBeep();
        if (navigator.vibrate) navigator.vibrate([500, 200, 500]);
        setIsModalOpen(true);
    };

    return (
        <>
            <footer className="h-[15%] shrink-0 bg-red-600 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background ProgressBar */}
                <div
                    className="absolute bottom-0 left-0 h-full bg-red-800 transition-all ease-linear"
                    style={{ width: `${progress}%`, opacity: isPressing ? 1 : 0 }}
                />

                <button
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={startPress}
                    onMouseUp={endPress}
                    onMouseLeave={endPress}
                    onTouchStart={startPress}
                    onTouchEnd={endPress}
                    className="w-full h-full max-h-16 flex items-center justify-center bg-red-700 rounded-xl shadow-lg active:scale-[0.98] transition-all border-2 border-red-400 relative z-10 overflow-hidden group"
                >
                    {/* Animated striped background for active state */}
                    <div className={`absolute inset-0 bg-red-600 opacity-0 group-active:opacity-100 transition-opacity ${progress > 0 && 'animate-pulse'}`} />

                    <div className="flex flex-col items-center relative z-20">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="text-white" />
                            <span className="text-white text-xl font-bold tracking-widest">緊急連絡</span>
                        </div>
                        <span className="text-red-100 text-xs">
                            {isPressing ? `あと ${((300 - progress * 3) / 100).toFixed(1)} 秒` : "(長押し 3秒)"}
                        </span>
                    </div>
                </button>
            </footer>
            <EmergencyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
