'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070712] text-white flex flex-col overflow-hidden">
      {/* Vivid ambient gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[15%] -left-[8%] w-[650px] h-[650px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-[5%] right-[-12%] w-[550px] h-[550px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.20) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-8%] left-[25%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 65%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-14 gap-14 max-w-4xl mx-auto w-full">

        {/* ── Hero ── */}
        <section className="text-center flex flex-col items-center gap-5">
          {/* Type badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wide text-gray-400 backdrop-blur-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse flex-shrink-0" />
            Software Behavior Type Indicator
          </div>

          {/* Main title */}
          <h1
            className="text-[80px] sm:text-[110px] md:text-[140px] font-black tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, #c4b5fd 0%, #f472b6 45%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SBTI
          </h1>

          <p className="text-lg sm:text-xl font-semibold text-gray-300 -mt-3">
            人格系统
          </p>

          {/* Description */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
            基于真实社交行为观察的人格分类体系，覆盖控制、理性、情感、社交、状态五大维度，28 种类型，比 MBTI 更接地气。
          </p>

          {/* Stats */}
          <div
            className="flex items-center gap-8 sm:gap-12 mt-1 pt-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { n: '28', label: '人格类型' },
              { n: '5', label: '核心维度' },
              { n: '378', label: '匹配组合' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.n}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Two Entry Cards ── */}
        <div className="w-full grid sm:grid-cols-2 gap-4">

          {/* MBTI 对照查询 */}
          <Link href="/profile" className="group block">
            <div
              className="relative overflow-hidden rounded-3xl min-h-[210px] sm:min-h-[240px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.10) 100%)',
                border: '1px solid rgba(139,92,246,0.20)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(59,130,246,0.18) 100%)'
                el.style.borderColor = 'rgba(167,139,250,0.45)'
                el.style.boxShadow = '0 25px 60px rgba(139,92,246,0.18)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.10) 100%)'
                el.style.borderColor = 'rgba(139,92,246,0.20)'
                el.style.boxShadow = ''
              }}
            >
              {/* Decorative glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 70%)' }}
              />

              <div className="text-4xl sm:text-5xl select-none">🧠</div>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">MBTI 对照查询</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  选择你的 SBTI 类型，查看对应 MBTI 分析与完整人格解读
                </p>
              </div>

              <div
                className="absolute bottom-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(167,139,250,0.20)',
                  color: 'rgba(196,181,253,0.90)',
                  border: '1px solid rgba(167,139,250,0.30)',
                }}
              >
                →
              </div>
            </div>
          </Link>

          {/* 情侣匹配度测试 */}
          <Link href="/compatibility" className="group block">
            <div
              className="relative overflow-hidden rounded-3xl min-h-[210px] sm:min-h-[240px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(244,63,94,0.10) 100%)',
                border: '1px solid rgba(236,72,153,0.20)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(236,72,153,0.22) 0%, rgba(244,63,94,0.18) 100%)'
                el.style.borderColor = 'rgba(251,113,133,0.45)'
                el.style.boxShadow = '0 25px 60px rgba(236,72,153,0.18)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(244,63,94,0.10) 100%)'
                el.style.borderColor = 'rgba(236,72,153,0.20)'
                el.style.boxShadow = ''
              }}
            >
              {/* Decorative glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.6) 0%, transparent 70%)' }}
              />

              <div className="text-4xl sm:text-5xl select-none">💕</div>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">情侣匹配度测试</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  输入双方 SBTI 类型，立刻获取匹配分数和深度分析报告
                </p>
              </div>

              <div
                className="absolute bottom-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(251,113,133,0.20)',
                  color: 'rgba(253,164,175,0.90)',
                  border: '1px solid rgba(251,113,133,0.30)',
                }}
              >
                →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
