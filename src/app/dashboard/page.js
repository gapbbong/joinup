"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Calendar as CalendarIcon,
    Users,
    ChevronRight,
    MoreVertical,
    ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
    // Mock data for UI demonstration
    const [events] = useState([
        { id: '1', name: '2026 동계 워크숍', date: '2026-02-15', status: '진행중', attendees: 45, total: 60 },
        { id: '2', name: '신년 네트워킹 파티', date: '2026-01-20', status: '마감임박', attendees: 28, total: 30 },
    ]);

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Dashboard Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">내 행사 대시보드</h1>
                            <p className="text-slate-500 mt-1">참석자 현황을 실시간으로 확인하고 관리하세요.</p>
                        </div>
                        <Link
                            href="/events/new"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            새 행사 만들기
                        </Link>
                    </div>
                </div>
            </header>

            {/* Stats Summary */}
            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <CalendarIcon className="text-blue-600 w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">전체</span>
                        </div>
                        <div className="text-3xl font-extrabold text-slate-900">12</div>
                        <div className="text-slate-500 text-sm mt-1">등록된 총 행사 수</div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                                <Users className="text-green-600 w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">응답</span>
                        </div>
                        <div className="text-3xl font-extrabold text-slate-900">1,248</div>
                        <div className="text-slate-500 text-sm mt-1">누적 참석 응답자</div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                                <ArrowUpRight className="text-orange-600 w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">평균</span>
                        </div>
                        <div className="text-3xl font-extrabold text-slate-900">82%</div>
                        <div className="text-slate-500 text-sm mt-1">평균 응답 완료율</div>
                    </div>
                </div>

                {/* Event List */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">최근 행사 목록</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="행사 이름 검색..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none w-64"
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div key={event.id} className="p-6 transition-colors hover:bg-slate-50 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex flex-col items-center justify-center font-bold text-xs">
                                            <span>{event.date.split('-')[1]}월</span>
                                            <span>{event.date.split('-')[2]}일</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{event.name}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5" />
                                                    {event.attendees}/{event.total} 응답
                                                </span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${event.status === '진행중' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/events/${event.id}/stats`}
                                            className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl transition-all hover:border-indigo-600 hover:text-indigo-600"
                                        >
                                            결과보기
                                        </Link>
                                        <button className="p-2 text-slate-400 hover:text-slate-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                    <CalendarIcon className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">아직 진행중인 행사가 없습니다.</h3>
                                <p className="text-slate-500 mb-8">새로운 일정을 만들어 참석 조사를 시작해 보세요!</p>
                                <Link
                                    href="/events/new"
                                    className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                                >
                                    기념비적인 첫 행사 만들기
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
