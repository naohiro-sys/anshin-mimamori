"use client";

import { X, Phone, BellRing } from "lucide-react";

type EmergencyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-[90%] max-w-md rounded-3xl p-6 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-300">

                <div className="bg-red-100 p-6 rounded-full mb-6 animate-pulse">
                    <BellRing size={64} className="text-red-600" />
                </div>

                <h2 className="text-2xl font-bold text-red-600 mb-2">緊急通報しました</h2>
                <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed">
                    ご家族と管理会社に<br />
                    緊急連絡を送信しました。<br />
                    <span className="text-sm text-gray-400 mt-2 block">※デモモードです</span>
                </p>

                <div className="w-full space-y-4">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all">
                        <Phone size={24} />
                        電話をかける (119)
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                    >
                        <X size={20} />
                        閉じる
                    </button>
                </div>

            </div>
        </div>
    );
}
