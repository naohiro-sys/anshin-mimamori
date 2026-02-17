import { LogOut } from "lucide-react";

export default function Header() {
    return (
        <header className="h-[10%] bg-blue-600 text-white flex items-center justify-between px-4 shadow-md shrink-0">
            <h1 className="text-xl font-bold">あんしん見守り</h1>
            <button className="p-2 rounded-full hover:bg-blue-700 transition-colors" aria-label="ログアウト">
                <LogOut size={24} />
            </button>
        </header>
    );
}
