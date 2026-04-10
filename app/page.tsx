'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden bg-slate-50">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(251,113,133,0.22) 0%, transparent 70%)' }} />
        <div className="absolute top-[20%] right-[-8%] w-[450px] h-[450px] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(251,146,60,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-5%] left-[30%] w-[400px] h-[400px] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(244,63,94,0.12) 0%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-14 gap-12 max-w-2xl mx-auto w-full">

        {/* ── Hero ── */}
        <section className="text-center flex flex-col items-center gap-5 section-animate-in">

          {/* Logo image */}
          <div className="relative w-48 h-20 sm:w-64 sm:h-28 mx-auto">
            <Image
              src="/page.png"
              alt="SBTI"
              fill
              className="object-contain"
              priority
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="text-rose-500 font-semibold tracking-wider text-sm">✦ NEW TREND</span>
          </div>

          {/* Title */}
          <h1 className="text-[56px] sm:text-[80px] font-black tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 60%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            SBTI
          </h1>

          <p className="text-base sm:text-lg font-bold text-slate-700 -mt-2">
            测MBTI过时了？来看你的人设
          </p>

          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm">
            基于真实社交行为观察，覆盖五大维度，28 种人格类型，比 MBTI 更接地气
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-10 pt-4 border-t border-slate-200">
            {[
              { n: '28', label: '人格类型' },
              { n: '5', label: '核心维度' },
              { n: '378', label: '匹配组合' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e, #fb923c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {s.n}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Two Entry Cards ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* MBTI 对照 */}
          <Link href="/profile" className="group block animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative overflow-hidden rounded-3xl min-h-[200px] sm:min-h-[220px] p-7 flex flex-col justify-between transition-all duration-300 ease-out group-hover:scale-[1.025] group-hover:shadow-2xl bg-white border border-slate-100 shadow-sm"
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(251,113,133,0.4)'
                el.style.boxShadow = '0 20px 60px rgba(244,63,94,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(226,232,240,1)'
                el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
              }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-rose-400 to-orange-400" />
              <div className="text-4xl select-none">🧠</div>
              <div className="flex flex-col gap-1.5 relative">
                <h2 className="text-xl font-black text-slate-900">MBTI 对照查询</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  选择你的 SBTI 类型，查看对应 MBTI 与完整人格解读
                </p>
              </div>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-110 bg-rose-50 text-rose-500 border border-rose-100">
                →
              </div>
            </div>
          </Link>

          {/* 情侣匹配 */}
          <Link href="/compatibility" className="group block animate-fade-up" style={{ animationDelay: '0.28s' }}>
            <div className="relative overflow-hidden rounded-3xl min-h-[200px] sm:min-h-[220px] p-7 flex flex-col justify-between transition-all duration-300 ease-out group-hover:scale-[1.025] group-hover:shadow-2xl bg-white border border-slate-100 shadow-sm"
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(251,146,60,0.4)'
                el.style.boxShadow = '0 20px 60px rgba(251,146,60,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(226,232,240,1)'
                el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
              }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-orange-400 to-amber-400" />
              <div className="text-4xl select-none">💕</div>
              <div className="flex flex-col gap-1.5 relative">
                <h2 className="text-xl font-black text-slate-900">情侣匹配度测试</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  输入双方 SBTI 类型，立刻获取匹配分数和深度分析
                </p>
              </div>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-110 bg-orange-50 text-orange-500 border border-orange-100">
                →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
