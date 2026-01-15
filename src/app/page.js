"use client"

import React from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import {
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Users className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              JoinUp
            </span>
          </div>
          <div className="flex items-center gap-4">
            {status === 'authenticated' ? (
              <Link href="/dashboard" className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5">
                대시보드
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
              >
                시작하기
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-8 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>누구나 쉽고 안전한 참석자 조사</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            행사 준비의 <span className="text-indigo-600">번거로움</span>을<br />
            설렘으로 바꿔보세요
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            단톡방 링크 하나로 참석 여부부터 부모님 동반 인원까지.<br />
            실명 인증과 자동 미응답자 체크로 완벽한 행사를 준비하세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events/new" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-1 text-center">
              행사 생성하기
            </Link>
            <Link href="/events" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg transition-all hover:bg-slate-50 text-center">
              서비스 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">본인 확인 기반</h3>
              <p className="text-slate-600 leading-relaxed">
                소셜 로그인 연동과 명단 잠금 기능으로 타인이 내 이름으로 응답하는 것을 방지합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="text-indigo-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">실시간 통계</h3>
              <p className="text-slate-600 leading-relaxed">
                참석 인원, 부모님 동반 인원, 미응답자 목록을 한눈에 파악하고 실시간으로 공유하세요.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="text-pink-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">스마트한 편의성</h3>
              <p className="text-slate-600 leading-relaxed">
                캘린더 일정 추가, 지도 연동, 알러지 정보 수집까지 행사에 필요한 모든 것을 담았습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px]" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 relative z-10">
            지금 바로 첫 번째 행사를<br />만들어보세요
          </h2>
          <p className="text-indigo-200 mb-12 text-lg relative z-10">
            가장 스마트한 참석자 조사, JoinUp과 함께 시작하세요.
          </p>
          <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 relative z-10 inline-flex items-center gap-2">
            무료로 시작하기
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-bold text-slate-900">JoinUp</span>
          </div>
          <p>© 2026 JoinUp. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
