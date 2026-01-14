"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    MapPin,
    Users,
    ListOrdered,
    Save,
    Info
} from 'lucide-react';

export default function NewEvent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Logic will be added in the next step
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        돌아가기
                    </button>
                    <h1 className="text-xl font-extrabold text-slate-900">새 행사 만들기</h1>
                    <div className="w-20"></div> {/* Spacer for symmetry */}
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 pt-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Basic Info */}
                    <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Info className="text-indigo-600 w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">기본 정보</h2>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">행사 이름</label>
                            <input
                                required
                                type="text"
                                placeholder="예: 2026 동계 워크숍, OOO 결혼식 등"
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-lg font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">일시</label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        required
                                        type="date"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">장소 (선택)</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="행사 장소를 입력하세요"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Invitation List */}
                    <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <ListOrdered className="text-blue-600 w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">초대 명단 등록</h2>
                        </div>

                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
                            <div className="bg-blue-600/10 p-2 rounded-xl h-fit">
                                <Info className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                다른 사람 이름으로 응답하는 것을 방지하기 위해 초대 대상자 명단이 필요합니다. <br />
                                <strong>쉼표(,) 또는 줄바꿈</strong>으로 구분하여 이름을 입력해주세요.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">참석 대상 명단</label>
                            <textarea
                                required
                                rows={6}
                                placeholder="홍길동, 김철수, 이영희..."
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium resize-none"
                            ></textarea>
                            <p className="text-xs text-slate-400 ml-1">입력된 이름은 본인 확인 과정에서 사용됩니다.</p>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-4">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-5 bg-slate-900 text-white rounded-[32px] font-extrabold text-xl shadow-2xl shadow-slate-200 transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-6 h-6" />
                                    행사 생성 및 링크 발급
                                </>
                            )}
                        </button>
                        <p className="text-center text-slate-400 text-sm">기본 정보와 명단은 생성 후에도 수정할 수 있습니다.</p>
                    </div>
                </form>
            </main>
        </div>
    );
}
