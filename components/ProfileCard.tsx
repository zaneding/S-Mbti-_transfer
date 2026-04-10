import type { SbtiType } from '@/data/sbti-types'
import { getCategoryColors } from '@/lib/category-colors'

export interface ProfileInfo {
  description: string
  traits: string[]
  strengths: string[]
  weaknesses: string[]
  inRelationships: string
}

interface ProfileCardProps {
  type: SbtiType
  info?: ProfileInfo
}

export default function ProfileCard({ type, info }: ProfileCardProps) {
  const colors = getCategoryColors(type.category)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Gradient top strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient}`} />

      <div className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className={`text-3xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text`}
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {type.code}
            </span>
            <span className="text-lg font-bold text-white">{type.label}</span>
            <span className="text-white/40 text-sm italic">"{type.tagline}"</span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
              {type.category}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-mono"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
            >
              {type.mbti}
            </span>
          </div>
        </div>

        {info ? (
          <div className="flex flex-col gap-4 text-sm">
            {/* Traits */}
            <div className="flex flex-wrap gap-1.5">
              {info.traits.map((t, i) => (
                <span key={i} className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                  {t}
                </span>
              ))}
            </div>

            {info.description && info.description !== '内容即将更新' && (
              <p className="text-white/55 leading-relaxed text-xs">{info.description}</p>
            )}

            {/* Strengths */}
            {info.strengths.length > 0 && (
              <div className="rounded-xl p-3.5" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.12)' }}>
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">优势</p>
                <ul className="space-y-1.5">
                  {info.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-xs">
                      <span className="text-emerald-400 shrink-0">›</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {info.weaknesses.length > 0 && (
              <div className="rounded-xl p-3.5" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-2">劣势</p>
                <ul className="space-y-1.5">
                  {info.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-xs">
                      <span className="text-rose-400 shrink-0">›</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {info.inRelationships && (
              <div className="rounded-xl p-3.5" style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.12)' }}>
                <p className="text-pink-400 text-xs font-semibold uppercase tracking-widest mb-2">在感情中</p>
                <p className="text-white/55 text-xs leading-relaxed">{info.inRelationships}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-white/25 text-sm italic">详细解读即将更新</p>
        )}
      </div>
    </div>
  )
}
