'use client'

import { useState, useEffect, Suspense } from 'react'
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
  const [typeA, setTypeA] = useState(searchParams.get('a') ?? '')
  const [typeB, setTypeB] = useState(searchParams.get('b') ?? '')
  const [result, setResult] = useState<Result | null>(null)
  const [noData, setNoData] = useState(false)

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

  // mount-only: intentionally reads initial URL params once
  useEffect(() => {
    const a = searchParams.get('a') ?? ''
    const b = searchParams.get('b') ?? ''
    if (!a || !b) return
    const score = getScore(a, b)
    if (score === null) {
      setNoData(true)
      return
    }
    setResult({ score, level: getScoreLevel(score) })
  }, [])

  function handleCompute() {
    compute(typeA, typeB)
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center gap-8">
      <div className="w-full max-w-lg flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← 返回首页
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center">情侣匹配度测试</h1>

        {/* Selectors */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TypeSelector
              value={typeA}
              onChange={(v) => { setTypeA(v); setResult(null); setNoData(false) }}
              label="你的类型"
              placeholder="请选择"
            />
            <TypeSelector
              value={typeB}
              onChange={(v) => { setTypeB(v); setResult(null); setNoData(false) }}
              label="TA的类型"
              placeholder="请选择"
            />
          </div>

          <button
            onClick={handleCompute}
            disabled={!typeA || !typeB}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            测试匹配度
          </button>
        </div>

        {/* Result */}
        {noData && (
          <div className="text-center text-gray-500 text-sm py-4">该类型暂无匹配数据</div>
        )}
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">加载中...</div>}>
      <CompatibilityContent />
    </Suspense>
  )
}
