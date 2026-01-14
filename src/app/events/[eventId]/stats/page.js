"use client"

import React, { useState } from 'react';
import {
    BarChart3,
    Users,
    UserPlus,
    Clock,
    UserX,
    CheckCircle2,
    PieChart,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function StatisticsPage({ params }) {
    // Mock data for results
    const [stats] = useState({
        eventName: "2026 동계 워크숍",
        totalInvited: 60,
        attending: 42,
        notAttending: 8,
        unanswered: 10,
        parentCount: 15, // Total parents attending
        unansweredList: ["박명수", "유재석", "정준하", "노홍철", "정형돈", "길", "하하", "권오중", "데프콘", "아이유"]
    });

    const completionRate = Math.round(((stats.totalInvited - stats.unanswered) / stats.totalInvited) * 100);

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-10">
                <div className="max-w-5xl mx-auto">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-6 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        대시보드로 돌아가기
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-2 uppercase tracking-widest">
                                <BarChart3 className="w-4 h-4" />
                                Live Statistics
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{stats.eventName}</h1>
                            <p className="text-slate-500 mt-2 text-lg">실시간 참석 현황 리포트</p>
                        </div>
                        <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-xl shadow-indigo-100 flex flex-col items-center">
                            <span className="text-xs font-bold opacity-80 uppercase">응답 완료율</span>
                            <span className="text-2xl font-black">{completionRate}%</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pt-10 space-y-8">
                {/* Main Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">{stats.attending + stats.parentCount}명</div>
                        <div className="text-slate-500 text-sm mt-1">총 참석 인원 (부모님 포함)</div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm border-b-4 border-b-indigo-500">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">{stats.attending}명</div>
                        <div className="text-slate-500 text-sm mt-1">멤버 참석자 수</div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm border-b-4 border-b-pink-500">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center mb-4 text-pink-600">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">{stats.parentCount}명</div>
                        <div className="text-slate-500 text-sm mt-1">동반 부모님 합계</div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-orange-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">{stats.unanswered}명</div>
                        <div className="text-slate-500 text-sm mt-1">미응답 멤버 수</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Unanswered List Section */}
                    <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                    <UserX className="text-orange-500 w-6 h-6" />
                                    미응답자 명단
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">아직 응답하지 않은 소중한 분들입니다.</p>
                            </div>
                            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                                명단 복사하기
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {stats.unansweredList.map((name) => (
                                    <div key={name} className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 group transition-all hover:bg-white hover:shadow-md hover:border-orange-200">
                                        <span className="font-bold text-slate-700 group-hover:text-orange-600 transition-colors">{name}</span>
                                    </div>
                                ))}
                            </div>
                            {stats.unansweredList.length === 0 && (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">모든 멤버가 응답했습니다!</h3>
                                    <p className="text-slate-500">완벽한 참석 조사가 완료되었습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Side Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">주최자 가이드</h3>
                            <ul className="space-y-4 text-indigo-100/70 text-sm relative z-10">
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                                    미응답자 명단을 복사해 단톡방에 공지하고 참여를 독려하세요.
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                                    부모님 동반 인원을 미리 파악해 식사 예약을 진행하세요.
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                                    상세 알러지 정보는 주최자 설정 메뉴에서 다운로드할 수 있습니다.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <PieChart className="text-pink-500 w-5 h-5" />
                                응답 분포
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-600">참석 확정</span>
                                        <span className="text-indigo-600">{stats.attending}명</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 transition-all duration-1000"
                                            style={{ width: `${(stats.attending / stats.totalInvited) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-600">불참</span>
                                        <span className="text-pink-600">{stats.notAttending}명</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-pink-500 transition-all duration-1000"
                                            style={{ width: `${(stats.notAttending / stats.totalInvited) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-600">미응답</span>
                                        <span className="text-orange-600">{stats.unanswered}명</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 transition-all duration-1000"
                                            style={{ width: `${(stats.unanswered / stats.totalInvited) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
