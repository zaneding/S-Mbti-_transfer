import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSbtiType, sbtiTypes } from '@/data/sbti-types'
import { getCategoryColors } from '@/lib/category-colors'
import sbtiInfo from '@/data/sbtiInfo.json'
import type { ProfileInfo } from '@/components/ProfileCard'

interface PageProps {
  params: Promise<{ type: string }>
}

export function generateStaticParams() {
  return sbtiTypes.map((t) => ({ type: t.code }))
}

export default async function ProfilePage({ params }: PageProps) {
  const { type: typeParam } = await params
  const sbtiType = getSbtiType(typeParam)

  if (!sbtiType) notFound()

  const info = (sbtiInfo as unknown as Record<string, ProfileInfo | undefined>)[sbtiType.code]
  const colors = getCategoryColors(sbtiType.category)

  return (
    <main className="min-h-screen" style={{ background: '#0d0d18' }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, var(--glow-color, rgba(139,92,246,0.4)) 0%, transparent 70%)` }}
        />
      </div>

      {/* Gradient header band */}
      <div className="relative z-10 overflow-hidden" style={{ minHeight: '240px' }}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-15`}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 60%, #0d0d18 100%)' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-8 pb-8">
          {/* Nav */}
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              ← 返回首页
            </Link>
            <Link
              href={`/compatibility?a=${sbtiType.code}`}
              className="text-sm px-4 py-1.5 rounded-full font-medium text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', boxShadow: '0 0 20px rgba(236,72,153,0.3)' }}
            >
              测匹配度 →
            </Link>
          </div>

          {/* Type header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
                {sbtiType.category}
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
              >
                {sbtiType.mbti}
              </span>
            </div>
            <h1
              className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text`}
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {sbtiType.code}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-white">{sbtiType.label}</span>
              <span className="text-white/40 text-sm italic">"{sbtiType.tagline}"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-20 -mt-2">
        {info ? (
          <div className="flex flex-col gap-4">
            {/* Traits */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">核心特征</p>
              <div className="flex flex-wrap gap-2">
                {info.traits.map((t, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-full text-sm font-medium ${colors.badge}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            {info.description && info.description !== '内容即将更新' && (
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">人格解读</p>
                <p className="text-white/65 leading-relaxed text-sm">{info.description}</p>
              </div>
            )}

            {/* Strengths */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
            >
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">✦ 优势</p>
              <ul className="space-y-2.5">
                {info.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="text-emerald-400 mt-0.5 shrink-0 font-bold">›</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
            >
              <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-3">✦ 劣势</p>
              <ul className="space-y-2.5">
                {info.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="text-rose-400 mt-0.5 shrink-0 font-bold">›</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In Relationships */}
            {info.inRelationships && (
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)' }}
              >
                <p className="text-pink-400 text-xs font-semibold uppercase tracking-widest mb-3">💕 在感情中</p>
                <p className="text-white/65 text-sm leading-relaxed">{info.inRelationships}</p>
              </div>
            )}

            {/* Compatibility CTA */}
            <Link
              href={`/compatibility?a=${sbtiType.code}`}
              className="group flex items-center justify-between rounded-2xl p-5 transition-all hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(190,24,93,0.08))',
                border: '1px solid rgba(236,72,153,0.2)',
              }}
            >
              <div>
                <p className="text-pink-400 font-semibold text-sm">测试你和 TA 的匹配度</p>
                <p className="text-white/35 text-xs mt-0.5">选择对方类型，立刻查看匹配分数</p>
              </div>
              <span className="text-pink-400 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-white/25 text-sm">详细解读即将更新</p>
          </div>
        )}
      </div>
    </main>
  )
}
