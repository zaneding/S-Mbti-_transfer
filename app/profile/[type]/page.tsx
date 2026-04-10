import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Hash, Sparkles } from 'lucide-react'
import { getSbtiType, sbtiTypes } from '@/data/sbti-types'
import sbtiInfo from '@/data/sbtiInfo.json'
import type { ProfileInfo } from '@/components/ProfileCard'

const CAT_GRADIENT: Record<string, string> = {
  '控制': 'from-rose-400 to-rose-600',
  '理性': 'from-slate-400 to-slate-600',
  '情感': 'from-pink-400 to-pink-600',
  '社交': 'from-orange-400 to-orange-600',
  '状态': 'from-amber-400 to-amber-600',
  '补充': 'from-teal-400 to-cyan-600',
}

const CAT_COLOR: Record<string, string> = {
  '控制': 'text-rose-500',
  '理性': 'text-slate-500',
  '情感': 'text-pink-500',
  '社交': 'text-orange-500',
  '状态': 'text-amber-500',
  '补充': 'text-teal-500',
}

const CAT_BG: Record<string, string> = {
  '控制': 'bg-rose-100 text-rose-600',
  '理性': 'bg-slate-100 text-slate-600',
  '情感': 'bg-pink-100 text-pink-600',
  '社交': 'bg-orange-100 text-orange-600',
  '状态': 'bg-amber-100 text-amber-600',
  '补充': 'bg-teal-100 text-teal-600',
}

interface PageProps {
  params: Promise<{ type: string }>
}

export function generateStaticParams() {
  return sbtiTypes.map((t) => ({ type: t.code }))
}

export default async function ProfileDetailPage({ params }: PageProps) {
  const { type: typeParam } = await params
  const sbtiType = getSbtiType(typeParam)

  if (!sbtiType) notFound()

  const info = (sbtiInfo as unknown as Record<string, ProfileInfo | undefined>)[sbtiType.code]
  const gradient = CAT_GRADIENT[sbtiType.category] ?? 'from-slate-400 to-slate-600'
  const colorText = CAT_COLOR[sbtiType.category] ?? 'text-slate-500'
  const colorBadge = CAT_BG[sbtiType.category] ?? 'bg-slate-100 text-slate-600'

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">

      {/* Sticky nav */}
      <nav className="w-full flex justify-between items-center px-5 py-4 z-10 sticky top-0 bg-slate-100/90 backdrop-blur-md">
        <Link
          href="/profile"
          className="p-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className={`font-bold tracking-widest text-sm uppercase ${colorText}`}>
          {sbtiType.category}
        </span>
        <Link
          href={`/compatibility?a=${sbtiType.code}`}
          className="p-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-slate-700"
        >
          <span className="text-xs font-bold px-1">💕</span>
        </Link>
      </nav>

      <main className="flex-1 w-full px-5 py-4 flex flex-col max-w-lg">

        {/* Main card */}
        <div className="relative bg-white rounded-[2rem] p-7 shadow-xl shadow-slate-200/60 flex flex-col">

          {/* Decoration blob */}
          <div className={`absolute top-0 right-0 w-56 h-56 bg-gradient-to-br ${gradient} blur-3xl opacity-15 rounded-bl-[100px]`} />
          <div className="absolute top-6 right-6">
            <Sparkles className={`w-7 h-7 opacity-35 ${colorText}`} />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black tracking-widest mb-5 ${colorBadge}`}>
              SBTI · {sbtiType.category}
            </span>

            {/* Name */}
            <h1 className="text-5xl font-black text-slate-900 mb-1 tracking-tighter">
              {sbtiType.label}
            </h1>
            <p className={`text-sm font-mono font-bold mb-2 ${colorText}`}>{sbtiType.code}</p>
            <p className="text-slate-500 text-sm italic mb-6">"{sbtiType.tagline}"</p>

            {/* Description */}
            {info?.description && info.description !== '内容即将更新' && (
              <p className="text-slate-600 text-base font-medium leading-relaxed mb-7">
                {info.description}
              </p>
            )}

            {/* MBTI mappings */}
            <div className="mb-7 border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                <Hash className="w-3.5 h-3.5" /> 对应高发 MBTI
              </h3>
              <div className="flex flex-wrap gap-2">
                {sbtiType.mbti.split('/').map((m) => (
                  <span
                    key={m}
                    className={`px-4 py-2 rounded-xl text-sm font-black text-white bg-gradient-to-r ${gradient} shadow-sm`}
                  >
                    {m.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Traits */}
            {info?.traits && info.traits.length > 0 && (
              <div className="border-t border-slate-100 pt-6 mb-7">
                <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" /> 核心特征
                </h3>
                <div className="flex flex-wrap gap-2">
                  {info.traits.map((t, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${colorBadge}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {info?.strengths && info.strengths.length > 0 && (
              <div className="border-t border-slate-100 pt-6 mb-7">
                <h3 className="text-xs font-bold text-emerald-500 mb-3 flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" /> 优势
                </h3>
                <ul className="space-y-2">
                  {info.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 bg-emerald-50 p-3.5 rounded-2xl">
                      <span className="text-sm font-black text-emerald-500 mt-0.5 shrink-0">0{i + 1}</span>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {info?.weaknesses && info.weaknesses.length > 0 && (
              <div className="border-t border-slate-100 pt-6 mb-7">
                <h3 className="text-xs font-bold text-rose-500 mb-3 flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" /> 注意事项
                </h3>
                <ul className="space-y-2">
                  {info.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 bg-rose-50 p-3.5 rounded-2xl">
                      <span className="text-sm font-black text-rose-400 mt-0.5 shrink-0">0{i + 1}</span>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* In relationships */}
            {info?.inRelationships && (
              <div className="border-t border-slate-100 pt-6 mb-7">
                <h3 className="text-xs font-bold text-pink-500 mb-3 flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" /> 在感情中
                </h3>
                <div className="bg-pink-50 p-4 rounded-2xl">
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{info.inRelationships}</p>
                </div>
              </div>
            )}

            {/* Branding */}
            <div className="flex justify-between items-center opacity-30 pt-5 border-t border-slate-100/50">
              <span className="text-xs font-bold font-mono">SBTI.APP</span>
              <span className="text-xs font-bold font-mono">s-mbti.com</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 mb-10">
          <Link
            href={`/compatibility?a=${sbtiType.code}`}
            className="flex w-full items-center justify-center gap-2 bg-slate-900 text-white font-bold text-base py-5 rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-[1.02] transition-transform active:scale-95"
          >
            💕 测算与TA的契合度
          </Link>
          <p className="text-center text-slate-400 text-xs font-medium mt-3">
            选择对方的人设类型，立刻查看匹配分数
          </p>
        </div>
      </main>
    </div>
  )
}
