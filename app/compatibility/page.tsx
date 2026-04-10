'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ScoreCard from '@/components/ScoreCard'
import { getScore } from '@/data/compatibility'
import { getScoreLevel } from '@/data/score-comments'
import type { ScoreLevel } from '@/data/score-comments'
import { sbtiTypes } from '@/data/sbti-types'

interface Result {
  score: number
  level: ScoreLevel
}

const CATS = [
  { name: '控制', emoji: '👑', color: '#7c3aed', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.25)' },
  { name: '理性', emoji: '🧠', color: '#0891b2', bg: 'rgba(8,145,178,0.10)', border: 'rgba(8,145,178,0.25)' },
  { name: '情感', emoji: '💖', color: '#db2777', bg: 'rgba(236,72,153,0.10)', border: 'rgba(236,72,153,0.25)' },
  { name: '社交', emoji: '🎉', color: '#d97706', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)' },
  { name: '状态', emoji: '🌀', color: '#059669', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.25)' },
  { name: '补充', emoji: '✨', color: '#e11d48', bg: 'rgba(244,63,94,0.10)', border: 'rgba(244,63,94,0.25)' },
]

function TypePicker({
  label,
  value,
  onChange,
  accentColor,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  accentColor: string
}) {
  const [open, setOpen] = useState(false)
  const selected = sbtiTypes.find(t => t.code === value)
  const cat = selected ? CATS.find(c => c.name === selected.category) : null

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: accentColor, opacity: 0.7 }}>
        {label}
      </div>

      {/* Trigger card */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full rounded-2xl p-5 flex flex-col items-center gap-2 text-left transition-all duration-200"
        style={{
          background: selected
            ? (cat?.bg ?? 'rgba(255,255,255,0.65)')
            : 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          border: `1.5px solid ${selected ? (cat?.border ?? 'rgba(139,92,246,0.25)') : 'rgba(139,92,246,0.18)'}`,
          boxShadow: open
            ? `0 8px 32px ${accentColor}22`
            : '0 2px 16px rgba(139,92,246,0.07)',
        }}
      >
        {selected ? (
          <>
            <span className="text-3xl">{cat?.emoji ?? '🔮'}</span>
            <span className="text-lg font-black" style={{ color: cat?.color ?? accentColor }}>
              {selected.code}
            </span>
            <span className="text-sm font-semibold text-violet-800/70">{selected.label}</span>
            <span className="text-xs text-violet-500/50">{selected.tagline}</span>
          </>
        ) : (
          <>
            <span className="text-3xl opacity-30">🔮</span>
            <span className="text-sm font-semibold text-violet-400">点击选择</span>
          </>
        )}
        <span className="text-xs text-violet-400/50 mt-1">{open ? '▲ 收起' : '▼ 展开'}</span>
      </button>

      {/* Dropdown: categories + types */}
      {open && (
        <div
          className="rounded-2xl p-4 flex flex-col gap-4"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.15)',
            boxShadow: '0 8px 40px rgba(139,92,246,0.12)',
          }}
        >
          {CATS.map(c => {
            const types = sbtiTypes.filter(t => t.category === c.name)
            return (
              <div key={c.name} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase"
                  style={{ color: c.color, opacity: 0.8 }}>
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {types.map(t => {
                    const isSelected = value === t.code
                    return (
                      <button
                        key={t.code}
                        onClick={() => { onChange(t.code); setOpen(false) }}
                        className="rounded-xl px-2 py-2 flex flex-col items-center gap-0.5 transition-all duration-150"
                        style={{
                          background: isSelected ? c.bg : 'rgba(255,255,255,0.60)',
                          border: `1px solid ${isSelected ? c.border : 'rgba(139,92,246,0.10)'}`,
                          boxShadow: isSelected ? `0 2px 12px ${c.color}22` : 'none',
                        }}
                      >
                        <span className="text-[11px] font-black" style={{ color: isSelected ? c.color : '#4c1d95' }}>
                          {t.code}
                        </span>
                        <span className="text-[10px]" style={{ color: isSelected ? c.color : '#7c3aed', opacity: 0.7 }}>
                          {t.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
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
    <main className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #fdf2f8 50%, #eef2ff 100%)' }}>

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.16) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-[20%] w-[350px] h-[350px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto w-full px-5 py-10 flex flex-col gap-8">

        {/* Nav */}
        <Link href="/" className="text-sm font-medium transition-colors"
          style={{ color: 'rgba(109,40,217,0.55)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(109,40,217,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(109,40,217,0.55)')}>
          ← 返回首页
        </Link>

        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <div className="text-5xl">💕</div>
          <h1 className="text-3xl sm:text-4xl font-black"
            style={{
              background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            情侣匹配度测试
          </h1>
          <p className="text-sm text-violet-600/50">选择两个 SBTI 类型，查看你们的契合分数与深度分析</p>
        </div>

        {/* Type pickers */}
        <div className="flex flex-col gap-4">
          <TypePicker label="你的类型" value={typeA}
            onChange={(v) => { setTypeA(v); setResult(null); setNoData(false) }}
            accentColor="#7c3aed" />

          {/* VS divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.15)' }} />
            <span className="text-xs font-black tracking-widest"
              style={{ color: 'rgba(139,92,246,0.35)' }}>VS</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.15)' }} />
          </div>

          <TypePicker label="TA 的类型" value={typeB}
            onChange={(v) => { setTypeB(v); setResult(null); setNoData(false) }}
            accentColor="#db2777" />
        </div>

        {/* Compute button */}
        <button
          onClick={() => compute(typeA, typeB)}
          disabled={!typeA || !typeB}
          className="w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: typeA && typeB
              ? 'linear-gradient(135deg, #ec4899, #7c3aed)'
              : 'rgba(139,92,246,0.15)',
            color: typeA && typeB ? 'white' : 'rgba(139,92,246,0.4)',
            boxShadow: typeA && typeB ? '0 8px 32px rgba(236,72,153,0.30)' : 'none',
          }}
        >
          {typeA && typeB ? '✨ 测试匹配度' : '请选择两个类型'}
        </button>

        {/* No data */}
        {noData && (
          <div className="text-center rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139,92,246,0.12)',
            }}>
            <p className="text-violet-400/70 text-sm">该类型暂无匹配数据</p>
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
        <div className="min-h-screen flex items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #fdf2f8 50%, #eef2ff 100%)' }}>
          <div className="text-violet-400/50 text-sm">加载中...</div>
        </div>
      }
    >
      <CompatibilityContent />
    </Suspense>
  )
}
