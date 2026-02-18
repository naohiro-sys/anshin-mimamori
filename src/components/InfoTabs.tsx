"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

type NewsItem = {
    id: string;
    date: string;
    category: "防犯" | "防災" | "イベント" | "その他";
    title: string;
};

const MOCK_NEWS: NewsItem[] = [
    { id: "1", date: "2026.02.18", category: "防災", title: "【札幌市】大雪警報が発令されています。不要不急の外出は控えてください。" },
    { id: "2", date: "2026.02.17", category: "防犯", title: "【北区】アポ電と思われる不審電話が多発しています。" },
    { id: "3", date: "2026.02.15", category: "イベント", title: "第77回さっぽろ雪まつりは終了しました。ご来場ありがとうございました。" },
    { id: "4", date: "2026.02.10", category: "その他", title: "後期高齢者医療制度の保険証更新についてのお知らせが発送されました。" },
    { id: "5", date: "2026.02.01", category: "防犯", title: "【ヒグマ出没情報】南区真駒内付近で目撃情報がありました。" },
];

export default function InfoTabs() {
    const [activeTab, setActiveTab] = useState<"bulletin" | "local">("bulletin");
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (activeTab === "local" && news.length === 0) {
            setLoading(true);
            // Simulate API fetch
            const timer = setTimeout(() => {
                setNews(MOCK_NEWS);
                setLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [activeTab, news.length]);

    return (
        <section className="h-[25%] flex flex-col bg-white border-t border-gray-200 shrink-0">
            <div className="flex border-b border-gray-200 h-10 shrink-0">
                <button
                    onClick={() => setActiveTab("bulletin")}
                    className={`flex-1 font-bold text-sm transition-colors ${activeTab === "bulletin"
                            ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                            : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                        }`}
                >
                    掲示板
                </button>
                <button
                    onClick={() => setActiveTab("local")}
                    className={`flex-1 font-bold text-sm transition-colors ${activeTab === "local"
                            ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                            : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                        }`}
                >
                    地域情報 (札幌市)
                </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
                {activeTab === "bulletin" ? (
                    <div className="h-full p-4 flex flex-col items-center justify-center text-gray-400 bg-slate-50">
                        <p className="text-sm">ご家族からのお知らせはありません</p>
                    </div>
                ) : (
                    <div className="h-full p-4 overflow-y-auto scrollable bg-slate-50">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader2 className="animate-spin text-blue-500" />
                            </div>
                        ) : (
                            <ul className="space-y-3 pb-4">
                                {news.map((item) => (
                                    <li key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-mono text-gray-400">{item.date}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded text-white font-bold
                            ${item.category === '防災' ? 'bg-red-500' :
                                                    item.category === '防犯' ? 'bg-orange-500' :
                                                        item.category === 'イベント' ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-snug font-medium">
                                            {item.title}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
