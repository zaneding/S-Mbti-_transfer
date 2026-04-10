'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #fdf2f8 50%, #eef2ff 100%)' }}>

      {/* Vivid ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
        <div className="absolute top-[20%] right-[-8%] w-[450px] h-[450px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.14) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-5%] left-[30%] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-14 gap-12 max-w-2xl mx-auto w-full">

        {/* ── Hero ── */}
        <section className="text-center flex flex-col items-center gap-5 section-animate-in">

          {/* Logo image — put page.png in /public/ */}
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

          {/* Title */}
          <h1 className="text-[72px] sm:text-[96px] font-black tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #4f46e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            SBTI
          </h1>

          <p className="text-base sm:text-lg font-semibold text-violet-800/70 -mt-2">
            软件行为人格系统
          </p>

          <p className="text-sm sm:text-base text-violet-700/50 leading-relaxed max-w-sm">
            基于真实社交行为观察，覆盖五大维度，28 种人格类型，比 MBTI 更接地气
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-10 pt-4"
            style={{ borderTop: '1px solid rgba(139,92,246,0.15)' }}>
            {[
              { n: '28', label: '人格类型' },
              { n: '5', label: '核心维度' },
              { n: '378', label: '匹配组合' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {s.n}
                </div>
                <div className="text-xs text-violet-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Two Entry Cards ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* MBTI 对照 */}
          <Link href="/profile" className="group block animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative overflow-hidden rounded-3xl min-h-[200px] sm:min-h-[220px] p-7 flex flex-col justify-between
              transition-all duration-300 ease-out
              group-hover:scale-[1.025] group-hover:shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139,92,246,0.20)',
                boxShadow: '0 4px 24px rgba(139,92,246,0.10), 0 1px 3px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(139,92,246,0.45)'
                el.style.boxShadow = '0 20px 60px rgba(139,92,246,0.20), 0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(139,92,246,0.20)'
                el.style.boxShadow = '0 4px 24px rgba(139,92,246,0.10), 0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {/* Tinted inner glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.04) 100%)' }} />

              <div className="text-4xl select-none">🧠</div>

              <div className="flex flex-col gap-1.5 relative">
                <h2 className="text-xl font-bold text-violet-900">MBTI 对照查询</h2>
                <p className="text-sm text-violet-600/60 leading-relaxed">
                  选择你的 SBTI 类型，查看对应 MBTI 与完整人格解读
                </p>
              </div>

              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-xl flex items-center justify-center text-sm
                transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(139,92,246,0.12)',
                  color: '#7c3aed',
                  border: '1px solid rgba(139,92,246,0.25)',
                }}>
                →
              </div>
            </div>
          </Link>

          {/* 情侣匹配 */}
          <Link href="/compatibility" className="group block animate-fade-up" style={{ animationDelay: '0.28s' }}>
            <div className="relative overflow-hidden rounded-3xl min-h-[200px] sm:min-h-[220px] p-7 flex flex-col justify-between
              transition-all duration-300 ease-out
              group-hover:scale-[1.025] group-hover:shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(236,72,153,0.20)',
                boxShadow: '0 4px 24px rgba(236,72,153,0.10), 0 1px 3px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(236,72,153,0.45)'
                el.style.boxShadow = '0 20px 60px rgba(236,72,153,0.20), 0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(236,72,153,0.20)'
                el.style.boxShadow = '0 4px 24px rgba(236,72,153,0.10), 0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(244,63,94,0.04) 100%)' }} />

              <div className="text-4xl select-none">💕</div>

              <div className="flex flex-col gap-1.5 relative">
                <h2 className="text-xl font-bold text-pink-900">情侣匹配度测试</h2>
                <p className="text-sm text-pink-600/60 leading-relaxed">
                  输入双方 SBTI 类型，立刻获取匹配分数和深度分析
                </p>
              </div>

              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-xl flex items-center justify-center text-sm
                transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(236,72,153,0.12)',
                  color: '#db2777',
                  border: '1px solid rgba(236,72,153,0.25)',
                }}>
                →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
