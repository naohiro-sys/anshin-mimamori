"use client";

export default function EmergencyButton() {
    const handleEmergency = () => {
        alert("緊急連絡先に通知します（デモ）");
    };

    return (
        <footer className="h-[15%] shrink-0 bg-red-600 flex items-center justify-center p-4">
            <button
                onContextMenu={(e) => e.preventDefault()} // Prevent context menu on long press
                onClick={handleEmergency} // Simple click for now, can enhance to long-press later
                className="w-full h-full max-h-16 flex items-center justify-center bg-red-700 rounded-xl shadow-inner active:bg-red-800 transition-colors border-2 border-red-400"
            >
                <div className="flex flex-col items-center">
                    <span className="text-white text-xl font-bold tracking-widest">緊急連絡</span>
                    <span className="text-red-100 text-xs">(長押ししてください)</span>
                </div>
            </button>
        </footer>
    );
}
