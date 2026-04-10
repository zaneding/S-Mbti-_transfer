import type { SbtiType } from '@/data/sbti-types'

interface ProfileInfo {
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
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-gray-900">{type.code}</div>
          <div className="text-xl font-semibold text-gray-700 mt-1">{type.label}</div>
          <div className="text-sm text-gray-500 mt-1 italic">{type.tagline}</div>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          {type.category}
        </span>
      </div>

      {/* MBTI */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">对应MBTI：</span>{type.mbti}
      </div>

      {/* Info section */}
      {info ? (
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          <p className="leading-relaxed">{info.description}</p>

          {info.traits.length > 0 && (
            <div>
              <div className="font-semibold mb-1">特征</div>
              <ul className="list-disc list-inside space-y-0.5">
                {info.traits.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {info.strengths.length > 0 && (
            <div>
              <div className="font-semibold mb-1">优势</div>
              <ul className="list-disc list-inside space-y-0.5">
                {info.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {info.weaknesses.length > 0 && (
            <div>
              <div className="font-semibold mb-1">劣势</div>
              <ul className="list-disc list-inside space-y-0.5">
                {info.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {info.inRelationships && (
            <div>
              <div className="font-semibold mb-1">在关系中</div>
              <p className="leading-relaxed">{info.inRelationships}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-gray-400 italic">详细解读即将更新</div>
      )}
    </div>
  )
}
