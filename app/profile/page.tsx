'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { sbtiTypes, type SbtiType } from '@/data/sbti-types'
import sbtiInfoRaw from '@/data/sbtiInfo.json'
import type { ProfileInfo } from '@/components/ProfileCard'

const sbtiInfo = sbtiInfoRaw as unknown as Record<string, ProfileInfo | undefined>

type CatConfig = {
  name: string
  emoji: string
  desc: string
  accent: string
  activeBg: string
  activeBorder: string
  badge: string
  badgeBorder: string
  dot: string
  glowColor: string
}

const CATEGORIES: CatConfig[] = [
  {
    name: '控制',
    emoji: '👑',
    desc: '掌控全局，强势主导',
    accent: 'text-red-400',
    activeBg: 'from-red-500/20 to-orange-500/20',
    activeBorder: 'border-red-400/60',
    badge: 'bg-red-500/20 text-red-300',
    badgeBorder: 'border-red-500/40',
    dot: 'bg-red-400',
    glowColor: 'rgba(239,68,68,0.25)',
  },
  {
    name: '理性',
    emoji: '🧠',
    desc: '冷静分析，洞察本质',
    accent: 'text-blue-400',
    activeBg: 'from-blue-500/20 to-cyan-500/20',
    activeBorder: 'border-blue-400/60',
    badge: 'bg-blue-500/20 text-blue-300',
    badgeBorder: 'border-blue-500/40',
    dot: 'bg-blue-400',
    glowColor: 'rgba(59,130,246,0.25)',
  },
  {
    name: '情感',
    emoji: '💝',
    desc: '感知细腻，爱意深重',
    accent: 'text-pink-400',
    activeBg: 'from-pink-500/20 to-rose-500/20',
    activeBorder: 'border-pink-400/60',
    badge: 'bg-pink-500/20 text-pink-300',
    badgeBorder: 'border-pink-500/40',
    dot: 'bg-pink-400',
    glowColor: 'rgba(236,72,153,0.25)',
  },
  {
    name: '社交',
    emoji: '🎭',
    desc: '魅力四射，气场全开',
    accent: 'text-purple-400',
    activeBg: 'from-purple-500/20 to-violet-500/20',
    activeBorder: 'border-purple-400/60',
    badge: 'bg-purple-500/20 text-purple-300',
    badgeBorder: 'border-purple-500/40',
    dot: 'bg-purple-400',
    glowColor: 'rgba(168,85,247,0.25)',
  },
  {
    name: '状态',
    emoji: '🌊',
    desc: '情绪多变，内心细腻',
    accent: 'text-teal-400',
    activeBg: 'from-teal-500/20 to-emerald-500/20',
    activeBorder: 'border-teal-400/60',
    badge: 'bg-teal-500/20 text-teal-300',
    badgeBorder: 'border-teal-500/40',
    dot: 'bg-teal-400',
    glowColor: 'rgba(20,184,166,0.25)',
  },
  {
    name: '补充',
    emoji: '⭐',
    desc: '特立独行，自成一派',
    accent: 'text-amber-400',
    activeBg: 'from-amber-500/20 to-yellow-500/20',
    activeBorder: 'border-amber-400/60',
    badge: 'bg-amber-500/20 text-amber-300',
    badgeBorder: 'border-amber-500/40',
    dot: 'bg-amber-400',
    glowColor: 'rgba(245,158,11,0.25)',
  },
]

export default function ProfileSelectorPage() {
  const [selected, setSelected] = useState<SbtiType | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const catConfig = selected ? CATEGORIES.find((c) => c.name === selected.category) ?? null : null
  const info = selected ? sbtiInfo[selected.code] : null

  function handleSelect(type: SbtiType) {
    setSelected(type)
    setTimeout(() => {
      profileRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <main className="min-h-screen bg-[#070712] text-white">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[15%] left-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-10 sm:gap-12">

        {/* ── Header ── */}
        <div className="flex items-start gap-4">
          <Link
            href="/"
            className="mt-1 text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 flex-shrink-0"
          >
            ← 返回
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">MBTI 对照查询</h1>
            <p className="text-gray-500 text-sm mt-1">选择你的 SBTI 类型，查看对应 MBTI 与完整人格解读</p>
          </div>
        </div>

        {/* ── Type Selector ── */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {CATEGORIES.map((cat) => {
            const types = sbtiTypes.filter((t) => t.category === cat.name)
            return (
              <section key={cat.name}>
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl select-none">{cat.emoji}</span>
                  <h2 className={`text-sm sm:text-base font-bold ${cat.accent}`}>{cat.name}</h2>
                  <span className="text-xs text-gray-600 hidden sm:inline">{cat.desc}</span>
                </div>

                {/* Type buttons — large glassmorphism */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                  {types.map((type) => {
                    const isSelected = selected?.code === type.code
                    return (
                      <button
                        key={type.code}
                        onClick={() => handleSelect(type)}
                        className={[
                          'relative min-h-[88px] sm:min-h-[100px] rounded-2xl p-3.5 sm:p-4 text-left',
                          'flex flex-col justify-between',
                          'transition-all duration-300 ease-out cursor-pointer',
                          'active:scale-95',
                          isSelected
                            ? [
                                'bg-gradient-to-br',
                                cat.activeBg,
                                'border',
                                cat.activeBorder,
                                'scale-[1.03] shadow-2xl',
                              ].join(' ')
                            : 'border border-white/[0.08] hover:border-white/[0.18] hover:scale-[1.02]',
                        ].join(' ')}
                        style={
                          isSelected
                            ? { boxShadow: `0 20px 50px ${cat.glowColor}` }
                            : { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }
                        }
                      >
                        {/* Selected glow ring */}
                        {isSelected && (
                          <div
                            className="absolute inset-0 rounded-2xl opacity-50"
                            style={{
                              background: `radial-gradient(ellipse at top left, ${cat.glowColor} 0%, transparent 60%)`,
                            }}
                          />
                        )}

                        <div className="relative">
                          <div
                            className={`text-xs font-bold font-mono tracking-wide ${
                              isSelected ? cat.accent : 'text-gray-600'
                            }`}
                          >
                            {type.code}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5 leading-tight">
                            {type.label}
                          </div>
                        </div>

                        <div className="relative text-xs text-gray-500 leading-snug mt-1">
                          {type.tagline}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* ── Profile Detail ── */}
        {selected && catConfig && (
          <div
            ref={profileRef}
            key={selected.code}
            className="section-animate-in flex flex-col gap-4 scroll-mt-8"
          >
            {/* Banner */}
            <div
              className={[
                'rounded-2xl sm:rounded-3xl overflow-hidden border',
                catConfig.activeBorder,
                'bg-gradient-to-br',
                catConfig.activeBg,
              ].join(' ')}
              style={{ boxShadow: `0 30px 80px ${catConfig.glowColor}` }}
            >
              <div className="p-5 sm:p-8 md:p-10 flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-mono ${catConfig.accent}`}>
                    {selected.code}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2">
                    {selected.label}
                  </div>
                  <div className="text-gray-400 mt-1 text-sm italic">{selected.tagline}</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span
                    className={[
                      'text-xs font-semibold px-3 py-1 rounded-full border',
                      catConfig.badge,
                      catConfig.badgeBorder,
                    ].join(' ')}
                  >
                    {selected.category}
                  </span>
                  <span className="text-xs text-gray-500">MBTI：{selected.mbti}</span>
                </div>
              </div>
            </div>

            {/* Content cards */}
            {info ? (
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {info.description && info.description !== '内容即将更新' && (
                  <div
                    className="sm:col-span-2 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      人格解读
                    </div>
                    <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                      {info.description}
                    </p>
                  </div>
                )}

                {info.traits?.length > 0 && (
                  <div
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 sm:mb-4">
                      核心特质
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {info.traits.map((t, i) => (
                        <span
                          key={i}
                          className={[
                            'text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border',
                            catConfig.badge,
                            catConfig.badgeBorder,
                          ].join(' ')}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {info.inRelationships && (
                  <div
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 sm:mb-3">
                      💝 在关系中
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">{info.inRelationships}</p>
                  </div>
                )}

                {info.strengths?.length > 0 && (
                  <div
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 sm:mb-4">
                      ✨ 优势
                    </div>
                    <ul className="flex flex-col gap-2">
                      {info.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {info.weaknesses?.length > 0 && (
                  <div
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 sm:mb-4">
                      ⚡ 劣势
                    </div>
                    <ul className="flex flex-col gap-2">
                      {info.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTAs */}
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Link
                    href={`/compatibility?a=${selected.code}`}
                    className="text-center font-medium py-3 sm:py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-95"
                    style={{
                      background: 'rgba(236,72,153,0.12)',
                      border: '1px solid rgba(236,72,153,0.35)',
                      color: 'rgba(249,168,212,0.90)',
                    }}
                  >
                    💕 情侣匹配测试
                  </Link>
                  <Link
                    href={`/profile/${selected.code}`}
                    className="text-center font-medium py-3 sm:py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-95"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(209,213,219,0.90)',
                    }}
                  >
                    查看完整详情 →
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl sm:rounded-2xl p-8 sm:p-10 text-center text-gray-500 text-sm"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                详细解读即将更新
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
