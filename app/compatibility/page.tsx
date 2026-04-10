'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, Sparkles, X, ArrowLeft } from 'lucide-react'
import { sbtiTypes, type SbtiType } from '@/data/sbti-types'
import { getScore } from '@/data/compatibility'
import { getScoreLevel } from '@/data/score-comments'
import type { ScoreLevel } from '@/data/score-comments'
import { motion, AnimatePresence } from 'motion/react'
import clsx from 'clsx'

// ── category colour helpers ────────────────────────────────────────────
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

const CATS = ['控制', '理性', '情感', '社交', '状态', '补充']

interface Result {
  score: number
  level: ScoreLevel
}

// ── SelectBox ─────────────────────────────────────────────────────────
function SelectBox({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const item = sbtiTypes.find((t) => t.code === value)
  const gradient = item ? CAT_GRADIENT[item.category] ?? 'from-slate-200 to-slate-300' : ''

  return (
    <div className="flex-1 relative">
      {/* Trigger card */}
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          'w-full aspect-square rounded-2xl flex flex-col items-center justify-center p-3 cursor-pointer transition-all select-none',
          item
            ? `bg-gradient-to-br ${gradient} text-white shadow-md`
            : 'bg-slate-50 border-2 border-dashed border-slate-200 hover:bg-slate-100 text-slate-400'
        )}
      >
        <span className="text-[10px] font-bold opacity-80 mb-1">{label}</span>
        {item ? (
          <>
            <span className="font-black text-lg sm:text-xl text-center leading-tight">{item.label}</span>
            <span className="text-[10px] opacity-70 mt-1 font-mono">{item.code}</span>
          </>
        ) : (
          <span className="font-black text-sm">点击选择</span>
        )}
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2rem] p-5 pb-10 max-w-lg mx-auto shadow-2xl h-[68vh] flex flex-col"
            >
              {/* Handle */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-800">选择{label}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Type list grouped by category */}
              <div className="overflow-y-auto flex-1 scrollbar-hide pb-4">
                {CATS.map((cat) => {
                  const types = sbtiTypes.filter((t) => t.category === cat)
                  return (
                    <div key={cat} className="mb-5">
                      <div className={clsx('text-xs font-black uppercase tracking-widest mb-2', CAT_COLOR[cat])}>
                        {cat}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {types.map((t) => (
                          <button
                            key={t.code}
                            onClick={() => { onChange(t.code); setIsOpen(false) }}
                            className={clsx(
                              'p-3 rounded-xl text-left border-2 transition-all',
                              value === t.code
                                ? 'border-rose-500 bg-rose-50'
                                : 'border-slate-100 bg-white hover:border-slate-200'
                            )}
                          >
                            <div className="text-[10px] font-bold text-slate-400 mb-0.5">{t.code}</div>
                            <div className="font-black text-slate-800 text-sm">{t.label}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{t.tagline}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main content ───────────────────────────────────────────────────────
function CompatibilityContent() {
  const searchParams = useSearchParams()
  const initA = searchParams.get('a') ?? ''
  const initB = searchParams.get('b') ?? ''

  const [typeA, setTypeA] = useState(initA)
  const [typeB, setTypeB] = useState(initB)
  const [isMatching, setIsMatching] = useState(false)
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

  function handleMatch() {
    if (!typeA || !typeB) return
    setIsMatching(true)
    setResult(null)
    setNoData(false)
    setTimeout(() => {
      const score = getScore(typeA, typeB)
      if (score === null) {
        setNoData(true)
      } else {
        setResult({ score, level: getScoreLevel(score) })
      }
      setIsMatching(false)
    }, 1200)
  }

  function handleReset() {
    setResult(null)
    setNoData(false)
  }

  const aItem = sbtiTypes.find((t) => t.code === typeA)
  const bItem = sbtiTypes.find((t) => t.code === typeB)

  return (
    <div className="min-h-screen bg-slate-50 pb-24 flex flex-col items-center">

      {/* Header */}
      <div className="w-full bg-white px-5 pt-10 pb-7 rounded-b-[2.5rem] shadow-sm mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-400 blur-[80px] opacity-10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-400 blur-[80px] opacity-10 rounded-full" />

        <Link href="/" className="relative z-10 flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors text-sm mb-4 w-fit">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-center gap-2 mb-3"
        >
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 text-2xl sm:text-3xl font-black text-slate-900 text-center tracking-tight"
        >
          灵魂契合度预测
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center text-slate-500 mt-2 text-sm font-medium"
        >
          选择两个SBTI人设，看看你们的化学反应
        </motion.p>
      </div>

      <div className="w-full px-5 flex-1 flex flex-col max-w-lg">

        {/* Selection row */}
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6 relative z-20 gap-4">
          <SelectBox
            label="TA的人设"
            value={typeA}
            onChange={(v) => { setTypeA(v); setResult(null); setNoData(false) }}
          />

          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>

          <SelectBox
            label="我的人设"
            value={typeB}
            onChange={(v) => { setTypeB(v); setResult(null); setNoData(false) }}
          />
        </div>

        {/* Action button */}
        {!result && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleMatch}
            disabled={!typeA || !typeB || isMatching}
            className="w-full bg-slate-900 text-white font-bold text-base sm:text-lg py-4 rounded-[1.5rem] shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed mb-6"
          >
            {isMatching ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-rose-400" />
                {typeA && typeB ? '点击测算契合度' : '请先选择两个人设'}
              </>
            )}
          </motion.button>
        )}

        {/* No data */}
        {noData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6"
          >
            <p className="text-slate-400 text-sm">该组合暂无匹配数据</p>
            <button onClick={handleReset} className="mt-3 text-xs text-rose-500 font-semibold">
              重新选择
            </button>
          </motion.div>
        )}

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="w-full bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200 border border-slate-50 relative overflow-hidden"
            >
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-rose-300 to-orange-300 blur-3xl opacity-15 rounded-full" />

              {/* Reset */}
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Names */}
              {aItem && bItem && (
                <div className="flex items-center justify-center gap-3 mb-5 text-slate-600">
                  <span className="font-black text-sm">{aItem.label}</span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 flex-shrink-0" />
                  <span className="font-black text-sm">{bItem.label}</span>
                </div>
              )}

              {/* Score */}
              <div className="text-center mb-5">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">MATCH SCORE</span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span
                    className="text-6xl sm:text-7xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, #f43f5e, #fb923c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {result.score}
                  </span>
                  <span className="text-2xl font-bold text-slate-300">%</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={clsx('text-xl', i < result.level.stars ? 'text-rose-400' : 'text-slate-200')}>
                    ★
                  </span>
                ))}
              </div>

              {/* Label + desc */}
              <div className="bg-slate-50 rounded-2xl p-5 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-black tracking-wider">
                  {result.level.title}
                </div>
                <p className="text-center text-slate-600 font-medium leading-relaxed mt-2 text-sm">
                  {result.level.comment}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={`/profile/${typeA}`}
                className="mt-4 flex w-full items-center justify-center gap-2 bg-rose-500 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-rose-500/25 hover:bg-rose-600 transition-colors"
              >
                查看 {aItem?.label} 人格详情 →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function CompatibilityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-slate-400 text-sm">加载中...</div>
        </div>
      }
    >
      <CompatibilityContent />
    </Suspense>
  )
}
