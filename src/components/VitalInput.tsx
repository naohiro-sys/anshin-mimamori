"use client";

import { useState } from "react";
import { Check, Plus, Minus, Loader2 } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

export default function VitalInput() {
    const [value, setValue] = useState(36.5);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const increment = () => setValue((prev) => parseFloat((prev + 0.1).toFixed(1)));
    const decrement = () => setValue((prev) => parseFloat((prev - 0.1).toFixed(1)));

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Ensure user is signed in (anonymously)
            let user = auth.currentUser;
            if (!user) {
                const userCredential = await signInAnonymously(auth);
                user = userCredential.user;
            }

            await addDoc(collection(db, "users", user.uid, "vitals"), {
                temperature: value,
                timestamp: serverTimestamp(),
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("送信に失敗しました。もう一度お試しください。");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="h-[50%] flex flex-col items-center justify-center bg-gray-50 p-4 shrink-0">
            {isSubmitted ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="bg-green-100 p-8 rounded-full mb-4 ring-4 ring-green-200">
                        <Check size={80} className="text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-green-700">送信完了</span>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 text-gray-500 underline"
                    >
                        修正する
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-sm flex flex-col items-center gap-6">
                    <div className="text-center">
                        <h2 className="text-lg text-gray-600 mb-2">本日の体温</h2>
                        <div className="text-6xl font-bold text-gray-800 tracking-tight">
                            {value.toFixed(1)}
                            <span className="text-2xl ml-2 text-gray-500">℃</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 w-full justify-center">
                        <button
                            onClick={decrement}
                            className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center active:bg-slate-300 transition-colors shadow-sm"
                            aria-label="減らす"
                            disabled={isLoading}
                        >
                            <Minus size={32} className="text-slate-700" />
                        </button>

                        <button
                            onClick={increment}
                            className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center active:bg-slate-300 transition-colors shadow-sm"
                            aria-label="増やす"
                            disabled={isLoading}
                        >
                            <Plus size={32} className="text-slate-700" />
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-all mt-2 flex items-center justify-center disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "記録する"}
                    </button>
                </div>
            )}
        </section>
    );
}
