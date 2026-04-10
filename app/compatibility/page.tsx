'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import TypeSelector from '@/components/TypeSelector'
import ScoreCard from '@/components/ScoreCard'
import { getScore } from '@/data/compatibility'
import { getScoreLevel } from '@/data/score-comments'
import type { ScoreLevel } from '@/data/score-comments'

interface Result {
  score: number
  level: ScoreLevel
}

function CompatibilityContent() {
  const searchParams = useSearchParams()
  const initA = searchParams.get('a') ?? ''
  const initB = searchParams.get('b') ?? ''

  const [typeA, setTypeA] = useState(initA)
  const [typeB, setTypeB] = useState(initB)
  const [result, setResult] = useState<Result | null>(() => {
    if (!initA || !initB) return null
    const score = getScore(initA, initB)
    if (score === null) return null
    return { score, level: getScoreLevel(score) }
  })
  const [noData, setNoData] = useState<boolean>(() => {
    if (!initA || !initB) return false
    return getScore(initA, initB) === null
  })

  function compute(a: string, b: string) {
    setNoData(false)
    setResult(null)
    if (!a || !b) return
    const score = getScore(a, b)
    if (score === null) {
      setNoData(true)
      return
    }
    setResult({ score, level: getScoreLevel(score) })
  }

  return (
    <main className="min-h-screen" style={{ background: '#0d0d18' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="animate-orb absolute -top-32 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="animate-orb-slow absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white/40 hover:text-white/70 transition-colors text-sm">
            ← 返回首页
          </Link>
        </div>

        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <div className="text-4xl">💕</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">情侣匹配度测试</h1>
          <p className="text-white/35 text-sm">选择两个 SBTI 类型，查看你们的契合分数与深度分析</p>
        </div>

        {/* Selectors panel */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="grid grid-cols-2 gap-4">
            <TypeSelector
              value={typeA}
              onChange={(v) => { setTypeA(v); setResult(null); setNoData(false) }}
              label="你的类型"
              placeholder="请选择"
            />
            {/* VS divider */}
            <TypeSelector
              value={typeB}
              onChange={(v) => { setTypeB(v); setResult(null); setNoData(false) }}
              label="TA 的类型"
              placeholder="请选择"
            />
          </div>

          {/* VS badge center decoration */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-white/25 text-xs font-bold tracking-widest">VS</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <button
            onClick={() => compute(typeA, typeB)}
            disabled={!typeA || !typeB}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: typeA && typeB
                ? 'linear-gradient(135deg, #ec4899, #be185d)'
                : 'rgba(255,255,255,0.08)',
              color: 'white',
              boxShadow: typeA && typeB ? '0 0 30px rgba(236,72,153,0.3)' : 'none',
            }}
          >
            {typeA && typeB ? '✨ 测试匹配度' : '请选择两个类型'}
          </button>
        </div>

        {/* No data */}
        {noData && (
          <div
            className="text-center rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-white/30 text-sm">该类型暂无匹配数据</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <ScoreCard
            typeA={typeA}
            typeB={typeB}
            score={result.score}
            level={result.level}
          />
        )}
      </div>
    </main>
  )
}

export default function CompatibilityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d0d18' }}>
          <div className="text-white/25 text-sm">加载中...</div>
        </div>
      }
    >
      <CompatibilityContent />
    </Suspense>
  )
}
