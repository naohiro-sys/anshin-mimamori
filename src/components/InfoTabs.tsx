"use client";

import { useState } from "react";

export default function InfoTabs() {
    const [activeTab, setActiveTab] = useState<"bulletin" | "local">("bulletin");

    return (
        <section className="h-[25%] flex flex-col bg-white border-t border-gray-200 shrink-0">
            <div className="flex border-b border-gray-200 h-10 shrink-0">
                <button
                    onClick={() => setActiveTab("bulletin")}
                    className={`flex-1 font-bold text-sm transition-colors ${activeTab === "bulletin"
                            ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                            : "text-gray-500 bg-gray-50"
                        }`}
                >
                    掲示板
                </button>
                <button
                    onClick={() => setActiveTab("local")}
                    className={`flex-1 font-bold text-sm transition-colors ${activeTab === "local"
                            ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                            : "text-gray-500 bg-gray-50"
                        }`}
                >
                    地域情報 (札幌市)
                </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
                {activeTab === "bulletin" ? (
                    <div className="h-full p-4 flex items-center justify-center text-gray-500">
                        <p>新しいお知らせはありません</p>
                    </div>
                ) : (
                    <div className="h-full p-4 overflow-y-auto scrollable bg-slate-50">
                        {/* Mock RSS Feed Content */}
                        <ul className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <li key={i} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                                    <span className="text-xs text-blue-600 font-bold block mb-1">2026.02.18</span>
                                    <p className="text-sm text-gray-700 leading-snug">
                                        【札幌市】大雪警報が発令されています。外出の際は十分ご注意ください。
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
