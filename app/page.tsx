import Link from 'next/link'
import { sbtiTypes } from '@/data/sbti-types'
import { getCategoryColors } from '@/lib/category-colors'

const GROUPS = [
  { name: '控制', emoji: '⚡', desc: '掌控全局，目标明确，雷厉风行' },
  { name: '理性', emoji: '🧠', desc: '逻辑驱动，独立思考，洞察本质' },
  { name: '情感', emoji: '💖', desc: '情感细腻，重视关系，全情投入' },
  { name: '社交', emoji: '🎭', desc: '活力四射，魅力天生，制造气场' },
  { name: '状态', emoji: '🌊', desc: '独特的处世哲学与生活方式' },
  { name: '补充', emoji: '✨', desc: '多元个性，各有风采' },
]

export default function Home() {
  const typesByCategory = sbtiTypes.reduce(
    (acc, t) => {
      if (!acc[t.category]) acc[t.category] = []
      acc[t.category].push(t)
      return acc
    },
    {} as Record<string, typeof sbtiTypes>
  )

  return (
    <main className="min-h-screen" style={{ background: '#0d0d18' }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="animate-orb absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="animate-orb-slow absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="animate-orb absolute bottom-0 left-1/3 w-[500px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot" />
            <span className="text-white/50">28 种人格类型 · 5 大维度 · 情侣匹配度</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl font-black leading-tight tracking-tight">
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              认识真实的
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fb7185 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              自己
            </span>
          </h1>

          {/* Sub */}
          <p className="text-base sm:text-lg text-white/40 max-w-lg leading-relaxed">
            SBTI 是基于真实社交观察的人格分类系统，比 MBTI 更接地气，帮你看清自己，也看懂他人。
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Link
              href="/compatibility"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                boxShadow: '0 0 30px rgba(236,72,153,0.3)',
              }}
            >
              <span className="text-white">情侣匹配度测试</span>
              <span className="text-white/70 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <a
              href="#types"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
            >
              浏览全部类型
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-4 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { n: '28', label: '人格类型' },
              { n: '5', label: '核心维度' },
              { n: '756', label: '匹配组合' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.n}</div>
                <div className="text-xs text-white/30 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Type Grid */}
      <section id="types" className="relative z-10 px-4 sm:px-6 pb-24 max-w-6xl mx-auto">
        {GROUPS.map((group) => {
          const types = typesByCategory[group.name] ?? []
          if (!types.length) return null
          const colors = getCategoryColors(group.name)

          return (
            <div key={group.name} className="mb-14">
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5 px-1">
                <span className="text-2xl">{group.emoji}</span>
                <div>
                  <h2 className={`text-lg font-bold ${colors.text}`}>{group.name}</h2>
                  <p className="text-xs text-white/30">{group.desc}</p>
                </div>
                <div
                  className="ml-auto h-px flex-1 max-w-xs"
                  style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)' }}
                />
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {types.map((t) => (
                  <Link
                    key={t.code}
                    href={`/profile/${t.code}`}
                    className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${colors.bg} ${colors.border}`}
                    style={{ border: `1px solid`, borderColor: `color-mix(in srgb, currentColor 20%, transparent)` }}
                  >
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <span className={`text-xs font-mono font-bold tracking-widest ${colors.text}`}>
                        {t.code}
                      </span>
                      <span className="text-white font-semibold text-sm leading-tight">{t.label}</span>
                      <span className="text-white/35 text-xs leading-relaxed">{t.tagline}</span>
                      <span
                        className="text-xs mt-1 px-2 py-0.5 rounded-full w-fit"
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}
                      >
                        {t.mbti}
                      </span>
                    </div>
                    {/* Hover glow */}
                    <div
                      className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-br ${colors.gradient}`}
                    />
                    {/* Arrow */}
                    <div className="absolute top-3 right-3 text-white/20 group-hover:text-white/50 transition-colors text-xs">
                      →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-12 text-white/20 text-xs">
        SBTI · 基于真实社交观察的人格分类系统
      </footer>
    </main>
  )
}
