import { getSbtiType } from '@/data/sbti-types'
import type { ScoreLevel } from '@/data/score-comments'

interface ScoreCardProps {
  typeA: string
  typeB: string
  score: number
  level: ScoreLevel
}

export default function ScoreCard({ typeA, typeB, score, level }: ScoreCardProps) {
  const tA = getSbtiType(typeA)
  const tB = getSbtiType(typeB)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4 max-w-md mx-auto">
      {/* Type names */}
      <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
        <span>{tA ? `${tA.code} ${tA.label}` : typeA}</span>
        <span className="text-red-400 text-xl">❤</span>
        <span>{tB ? `${tB.code} ${tB.label}` : typeB}</span>
      </div>

      {/* Score */}
      <div className="text-6xl font-bold text-blue-600">{score}</div>

      {/* Stars */}
      <div className="flex gap-1 text-2xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < level.stars ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="text-xl font-semibold text-gray-800">{level.title}</div>

      {/* Comment */}
      <p className="text-sm text-gray-600 text-center leading-relaxed">{level.comment}</p>
    </div>
  )
}
