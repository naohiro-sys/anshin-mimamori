"use client";

import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Header() {
    const handleLogout = async () => {
        if (confirm("ログアウトしますか？")) {
            await signOut(auth);
            window.location.reload(); // Reload to reset state/re-auth if needed
        }
    };

    return (
        <header className="h-[10%] bg-blue-600 text-white flex items-center justify-between px-4 shadow-md shrink-0">
            <h1 className="text-xl font-bold">あんしん見守り</h1>
            <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="ログアウト"
            >
                <LogOut size={24} />
            </button>
        </header>
    );
}
