import { getSbtiType } from '@/data/sbti-types'
import { getCategoryColors } from '@/lib/category-colors'
import type { ScoreLevel } from '@/data/score-comments'

interface ScoreCardProps {
  typeA: string
  typeB: string
  score: number
  level: ScoreLevel
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52
  const stroke = 7
  const normalizedRadius = radius - stroke
  const circumference = 2 * Math.PI * normalizedRadius
  // score range is 40–90, normalize to 0–1
  const progress = Math.max(0, Math.min(1, (score - 40) / 50))
  const dashOffset = circumference * (1 - progress)

  // Color by score tier
  const ringColor =
    score >= 88 ? '#f59e0b'
    : score >= 80 ? '#10b981'
    : score >= 70 ? '#818cf8'
    : score >= 60 ? '#fb923c'
    : '#f87171'

  const glowColor =
    score >= 88 ? 'rgba(245,158,11,0.4)'
    : score >= 80 ? 'rgba(16,185,129,0.4)'
    : score >= 70 ? 'rgba(129,140,248,0.4)'
    : score >= 60 ? 'rgba(251,146,60,0.4)'
    : 'rgba(248,113,113,0.4)'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        style={{ background: glowColor }}
      />
      <svg
        width={120}
        height={120}
        className="absolute inset-0"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={60}
          cy={60}
          r={normalizedRadius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={60}
          cy={60}
          r={normalizedRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="animate-ring-fill"
        />
      </svg>
      {/* Label */}
      <div className="relative z-10 text-center">
        <div className="text-3xl font-black text-white leading-none">{score}</div>
        <div className="text-white/30 text-xs mt-0.5">分</div>
      </div>
    </div>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-lg transition-all"
          style={{ color: i < count ? '#f59e0b' : 'rgba(255,255,255,0.12)' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function ScoreCard({ typeA, typeB, score, level }: ScoreCardProps) {
  const tA = getSbtiType(typeA)
  const tB = getSbtiType(typeB)
  const colorsA = tA ? getCategoryColors(tA.category) : null
  const colorsB = tB ? getCategoryColors(tB.category) : null

  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center gap-5 animate-fade-up"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Type names */}
      <div className="flex items-center gap-3 w-full justify-center flex-wrap">
        <div className="text-center">
          <div
            className={`text-sm font-mono font-bold ${colorsA?.text ?? 'text-white'}`}
          >
            {tA?.code ?? typeA}
          </div>
          <div className="text-white/50 text-xs mt-0.5">{tA?.label}</div>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-pink-400 text-xl">❤</span>
        </div>

        <div className="text-center">
          <div
            className={`text-sm font-mono font-bold ${colorsB?.text ?? 'text-white'}`}
          >
            {tB?.code ?? typeB}
          </div>
          <div className="text-white/50 text-xs mt-0.5">{tB?.label}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Score ring */}
      <ScoreRing score={score} />

      {/* Stars */}
      <Stars count={level.stars} />

      {/* Title */}
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-xl font-black text-white">{level.title}</h2>
        <p className="text-white/45 text-sm leading-relaxed max-w-xs text-center">{level.comment}</p>
      </div>

      {/* Score bar */}
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-white/25">
          <span>40</span>
          <span className="text-white/40 font-medium">匹配度 {score}%</span>
          <span>90</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${((score - 40) / 50) * 100}%`,
              background: score >= 88
                ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                : score >= 80
                ? 'linear-gradient(90deg, #10b981, #34d399)'
                : score >= 70
                ? 'linear-gradient(90deg, #818cf8, #a78bfa)'
                : score >= 60
                ? 'linear-gradient(90deg, #fb923c, #fbbf24)'
                : 'linear-gradient(90deg, #f87171, #fb923c)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
