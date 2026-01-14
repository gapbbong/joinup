"use client"

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
    Users,
    Check,
    X,
    Users2,
    Utensils,
    Lock,
    ChevronRight,
    AlertCircle,
    PartyPopper,
    Calendar
} from 'lucide-react';

export default function SurveyPage({ params }) {
    const { data: session, status } = useSession();
    const [step, setStep] = useState(1); // 1: Welcome/Auth, 2: Name Matching, 3: Details, 4: Success
    const [isAttending, setIsAttending] = useState(null);
    const [parentCount, setParentCount] = useState(0);
    const [dietary, setDietary] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [loading, setLoading] = useState(false);

    // Mock event and invitation list
    const event = { name: "2026 동계 워크숍", date: "2026-02-15", location: "평창 알펜시아" };
    const mockInvitations = ["홍길동", "김철수", "이영희", "박지성", "손흥민"];

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (loading) return;

            if (e.key === 'Enter' || e.key === ' ') {
                if (step === 1) handleNextStep();
                else if (step === 2 && selectedName) handleNextStep();
                else if (step === 3 && isAttending !== null) handleNextStep();
                e.preventDefault();
            } else if (e.key === 'Escape') {
                if (step > 1 && step < 4) {
                    setStep(step - 1);
                    e.preventDefault();
                }
            } else if (step === 3 && (e.key === '1' || e.key === '2')) {
                setIsAttending(e.key === '1');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step, selectedName, isAttending, loading]);

    const handleNextStep = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setStep(step + 1);
            setLoading(false);
            window.scrollTo(0, 0);
        }, 600);
    };

    if (status === 'loading') return null;

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
                <div
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <main className="max-w-xl mx-auto px-6 pt-20 pb-20">

                {/* Step 1: Welcome & Auth */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-indigo-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                                <PartyPopper className="text-indigo-600 w-10 h-10" />
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight">{event.name}</h1>
                            <p className="text-slate-500 text-lg">초대받으신 행사에 대한 참석 여부를 알려주세요.</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                            <div className="flex items-center gap-4">
                                <Calendar className="text-slate-400 w-5 h-5" />
                                <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="text-slate-400 w-5 h-5" />
                                <span className="font-medium">{event.location}</span>
                            </div>
                        </div>

                        {status === 'unauthenticated' ? (
                            <button
                                onClick={() => signIn()}
                                className="w-full py-5 bg-slate-900 text-white rounded-3xl font-extrabold text-xl shadow-xl transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95 animate-pulse-subtle"
                            >
                                소셜 로그인 후 응답하기 (Enter)
                            </button>
                        ) : (
                            <button
                                onClick={handleNextStep}
                                className={`w-full py-5 bg-indigo-600 text-white rounded-3xl font-extrabold text-xl shadow-xl transition-all hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 scale-95' : ''}`}
                            >
                                시작하기 (Enter)
                                <ChevronRight className={`w-6 h-6 ${loading ? 'animate-ping' : ''}`} />
                            </button>
                        )}
                        <p className="text-center text-slate-400 text-sm">타인 명의 방지를 위해 소셜 로그인이 필요합니다.</p>
                    </div>
                )}

                {/* Step 2: Name Matching (Locking) */}
                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
                                <Lock className="w-4 h-4" />
                                Identity Verification
                            </div>
                            <h2 className="text-3xl font-extrabold">본인 확인</h2>
                            <p className="text-slate-500">초대 명단에서 본인의 이름을 선택해주세요. 한 번 선택하면 변경이 어렵습니다.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {mockInvitations.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setSelectedName(name)}
                                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center ${selectedName === name
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                                        }`}
                                >
                                    {name}
                                    {selectedName === name && <Check className="w-5 h-5" />}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={!selectedName || loading}
                            onClick={handleNextStep}
                            className={`w-full py-5 bg-slate-900 text-white rounded-3xl font-extrabold text-xl shadow-xl transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-30 disabled:hover:translate-y-0 ${loading ? 'animate-pulse' : ''}`}
                        >
                            {loading ? "확인 중..." : "본인 확인 완료 (Enter)"}
                        </button>
                        <button
                            onClick={() => setStep(1)}
                            className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 active:scale-95 transition-all"
                        >
                            이전으로 돌아가기 (Esc)
                        </button>
                    </div>
                )}

                {/* Step 3: Attendance Details */}
                {step === 3 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-extrabold">참석 여부 조사</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsAttending(true)}
                                    className={`flex-1 py-6 rounded-3xl border-2 font-bold text-lg transition-all flex flex-col items-center gap-3 active:scale-95 ${isAttending === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 text-slate-400'
                                        }`}
                                >
                                    <Check className={`w-8 h-8 ${isAttending === true ? 'scale-110' : ''}`} />
                                    참석합니다 (1)
                                </button>
                                <button
                                    onClick={() => setIsAttending(false)}
                                    className={`flex-1 py-6 rounded-3xl border-2 font-bold text-lg transition-all flex flex-col items-center gap-3 active:scale-95 ${isAttending === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 text-slate-400'
                                        }`}
                                >
                                    <X className={`w-8 h-8 ${isAttending === false ? 'scale-110' : ''}`} />
                                    불참합니다 (2)
                                </button>
                            </div>
                        </div>

                        {isAttending === true && (
                            <div className="space-y-8 animate-in zoom-in-95 duration-500">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 font-bold text-lg">
                                        <Users2 className="text-slate-400 w-5 h-5" />
                                        부모님 동반 인원
                                    </label>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                                        <button
                                            type="button"
                                            onClick={() => setParentCount(Math.max(0, parentCount - 1))}
                                            className="w-14 h-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600 hover:bg-slate-100"
                                        >
                                            -
                                        </button>
                                        <span className="text-4xl font-black text-slate-900">{parentCount}명</span>
                                        <button
                                            type="button"
                                            onClick={() => setParentCount(parentCount + 1)}
                                            className="w-14 h-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600 hover:bg-slate-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 font-bold text-lg">
                                        <Utensils className="text-slate-400 w-5 h-5" />
                                        식단 시 주의사항 (알러지 등)
                                    </label>
                                    <textarea
                                        value={dietary}
                                        onChange={(e) => setDietary(e.target.value)}
                                        placeholder="예: 땅콩 알러지가 있어요. 아기 의자가 필요해요."
                                        className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium resize-none shadow-sm"
                                        rows={4}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                disabled={isAttending === null || loading}
                                onClick={handleNextStep}
                                className={`w-full py-5 bg-indigo-600 text-white rounded-3xl font-extrabold text-xl shadow-xl transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-30 ${loading ? 'animate-pulse' : ''}`}
                            >
                                {loading ? "전송 중..." : "응답 제출하기 (Enter)"}
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 active:scale-95 transition-all"
                            >
                                본인 확인 단계로 (Esc)
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                    <div className="text-center space-y-8 animate-in zoom-in-95 duration-1000">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600">
                            <Check className="w-14 h-14" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-slate-900">제출 완료!</h2>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                {selectedName}님의 소중한 응답이 전달되었습니다.<br />
                                감사합니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-10">
                            <button className="py-5 bg-slate-900 text-white rounded-3xl font-bold flex items-center justify-center gap-3 transition-opacity hover:opacity-90">
                                <Calendar className="w-5 h-5" />
                                내 캘린더에 일정 추가
                            </button>
                            <Link
                                href={`/events/${params.eventId}/stats`}
                                className="py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-3xl font-bold hover:bg-slate-50 transition-colors"
                            >
                                현재 참석 현황 보기
                            </Link>
                        </div>
                    </div>
                )}

            </main>

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
