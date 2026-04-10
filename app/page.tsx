'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { sbtiTypes, type SbtiType } from '@/data/sbti-types'
import sbtiInfoRaw from '@/data/sbtiInfo.json'
import type { ProfileInfo } from '@/components/ProfileCard'

const sbtiInfo = sbtiInfoRaw as unknown as Record<string, ProfileInfo | undefined>

type CategoryConfig = {
  name: string
  emoji: string
  desc: string
  bg: string
  activeBg: string
  border: string
  activeBorder: string
  glow: string
  badge: string
  badgeBorder: string
  accent: string
  dot: string
}

const CATEGORIES: CategoryConfig[] = [
  {
    name: '控制',
    emoji: '👑',
    desc: '掌控全局，强势主导',
    bg: 'from-red-500/10 to-orange-500/10',
    activeBg: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
    activeBorder: 'border-red-400/70',
    glow: 'hover:shadow-red-500/20',
    badge: 'bg-red-500/20 text-red-300',
    badgeBorder: 'border-red-500/40',
    accent: 'text-red-400',
    dot: 'bg-red-400',
  },
  {
    name: '理性',
    emoji: '🧠',
    desc: '冷静分析，洞察本质',
    bg: 'from-blue-500/10 to-cyan-500/10',
    activeBg: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    activeBorder: 'border-blue-400/70',
    glow: 'hover:shadow-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-300',
    badgeBorder: 'border-blue-500/40',
    accent: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  {
    name: '情感',
    emoji: '💝',
    desc: '感知细腻，爱意深重',
    bg: 'from-pink-500/10 to-rose-500/10',
    activeBg: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/30',
    activeBorder: 'border-pink-400/70',
    glow: 'hover:shadow-pink-500/20',
    badge: 'bg-pink-500/20 text-pink-300',
    badgeBorder: 'border-pink-500/40',
    accent: 'text-pink-400',
    dot: 'bg-pink-400',
  },
  {
    name: '社交',
    emoji: '🎭',
    desc: '魅力四射，气场全开',
    bg: 'from-purple-500/10 to-violet-500/10',
    activeBg: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/30',
    activeBorder: 'border-purple-400/70',
    glow: 'hover:shadow-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-300',
    badgeBorder: 'border-purple-500/40',
    accent: 'text-purple-400',
    dot: 'bg-purple-400',
  },
  {
    name: '状态',
    emoji: '🌊',
    desc: '情绪多变，内心细腻',
    bg: 'from-teal-500/10 to-emerald-500/10',
    activeBg: 'from-teal-500/20 to-emerald-500/20',
    border: 'border-teal-500/30',
    activeBorder: 'border-teal-400/70',
    glow: 'hover:shadow-teal-500/20',
    badge: 'bg-teal-500/20 text-teal-300',
    badgeBorder: 'border-teal-500/40',
    accent: 'text-teal-400',
    dot: 'bg-teal-400',
  },
  {
    name: '补充',
    emoji: '⭐',
    desc: '特立独行，自成一派',
    bg: 'from-amber-500/10 to-yellow-500/10',
    activeBg: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/30',
    activeBorder: 'border-amber-400/70',
    glow: 'hover:shadow-amber-500/20',
    badge: 'bg-amber-500/20 text-amber-300',
    badgeBorder: 'border-amber-500/40',
    accent: 'text-amber-400',
    dot: 'bg-amber-400',
  },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<SbtiType | null>(null)
  const typesRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const catConfig = selectedCategory
    ? CATEGORIES.find((c) => c.name === selectedCategory) ?? null
    : null

  const typesInCategory = selectedCategory
    ? sbtiTypes.filter((t) => t.category === selectedCategory)
    : []

  function handleCategoryClick(catName: string) {
    if (selectedCategory === catName) {
      setSelectedCategory(null)
      setSelectedType(null)
      return
    }
    setSelectedCategory(catName)
    setSelectedType(null)
    setTimeout(() => {
      typesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 80)
  }

  function handleTypeClick(type: SbtiType) {
    setSelectedType(type)
    setTimeout(() => {
      profileRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const info = selectedType ? sbtiInfo[selectedType.code] : null

  return (
    <main className="min-h-screen bg-[#060810] text-white overflow-x-hidden">
      {/* Ambient background blobs — decorative only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[100px]" />
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[90px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-teal-600/5 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-5 py-12 md:py-20 flex flex-col gap-12 md:gap-20">

        {/* ── Hero ── */}
        <section className="text-center flex flex-col items-center gap-5 md:gap-7">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm text-gray-400 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span>28种人格 · MBTI对照 · 情侣匹配</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none">
            <span className="bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
              SBTI
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 -mt-2 md:-mt-3">
            人格系统
          </p>
          <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-md leading-relaxed">
            基于真实社交观察的人格分类体系，覆盖控制、理性、情感、社交、状态五大维度
          </p>
        </section>

        {/* ── Category Selection ── */}
        <section className="flex flex-col gap-6 md:gap-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">选择你的 SBTI 类型</h2>
            <p className="text-gray-500 text-xs sm:text-sm">点击分类展开，再选择具体类型</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name
              const count = sbtiTypes.filter((t) => t.category === cat.name).length
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={[
                    'group relative min-h-[140px] sm:min-h-[160px] rounded-2xl p-4 sm:p-6 text-left w-full',
                    'bg-gradient-to-br',
                    isActive ? cat.activeBg : cat.bg,
                    'border backdrop-blur-sm',
                    isActive ? cat.activeBorder : cat.border,
                    'transition-all duration-300 ease-out cursor-pointer',
                    'active:scale-95 sm:hover:scale-[1.03] sm:hover:shadow-2xl',
                    cat.glow,
                    isActive ? 'sm:scale-[1.02] shadow-xl' : '',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-2 sm:gap-3 h-full">
                    <div className="flex items-start justify-between">
                      <span className="text-2xl sm:text-3xl select-none">{cat.emoji}</span>
                      <span
                        className={[
                          'text-xs font-medium px-2 py-0.5 rounded-full border',
                          cat.badge,
                          cat.badgeBorder,
                        ].join(' ')}
                      >
                        {count} 种
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className={`text-base sm:text-lg font-bold ${isActive ? 'text-white' : 'text-gray-200'}`}>
                        {cat.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed hidden sm:block">
                        {cat.desc}
                      </div>
                    </div>
                    <div
                      className={`text-xs font-medium flex items-center gap-1 transition-opacity duration-200 ${
                        isActive
                          ? `${cat.accent} opacity-100`
                          : 'opacity-0 group-hover:opacity-60 text-gray-400'
                      }`}
                    >
                      {isActive ? <>展开中 <span>↓</span></> : <>点击查看</>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Types in Selected Category ── */}
        {selectedCategory && catConfig && (
          <section
            ref={typesRef}
            key={`types-${selectedCategory}`}
            className="section-animate-in flex flex-col gap-4 sm:gap-5"
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${catConfig.dot} flex-shrink-0`} />
              <h3 className="text-base sm:text-lg font-bold text-gray-100">
                {selectedCategory}
                <span className="text-gray-500 font-normal ml-1.5">
                  — {typesInCategory.length} 种类型
                </span>
              </h3>
              {selectedType && (
                <span className={`ml-auto text-xs ${catConfig.accent} hidden sm:inline`}>
                  已选：{selectedType.label}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {typesInCategory.map((type, i) => {
                const isSelected = selectedType?.code === type.code
                return (
                  <button
                    key={type.code}
                    onClick={() => handleTypeClick(type)}
                    className="type-card-animate text-left w-full"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    <div
                      className={[
                        'rounded-xl p-3 sm:p-4 border h-full',
                        'transition-all duration-200 ease-out cursor-pointer',
                        'active:scale-95 sm:hover:scale-[1.04]',
                        isSelected
                          ? `bg-gradient-to-br ${catConfig.activeBg} ${catConfig.activeBorder} shadow-lg`
                          : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20',
                      ].join(' ')}
                    >
                      <div
                        className={`text-xs font-bold mb-0.5 font-mono ${
                          isSelected ? catConfig.accent : 'text-gray-500'
                        }`}
                      >
                        {type.code}
                      </div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        {type.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 leading-relaxed hidden sm:block">
                        {type.tagline}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Profile Detail ── */}
        {selectedType && catConfig && (
          <section
            ref={profileRef}
            key={`profile-${selectedType.code}`}
            className="section-animate-in flex flex-col gap-3 sm:gap-4 scroll-mt-6"
          >
            {/* Banner */}
            <div
              className={[
                'rounded-2xl sm:rounded-3xl overflow-hidden border',
                catConfig.activeBorder,
                'bg-gradient-to-br',
                catConfig.activeBg,
              ].join(' ')}
            >
              <div className="p-5 sm:p-8 md:p-10 flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div
                    className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-mono ${catConfig.accent}`}
                  >
                    {selectedType.code}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1.5">
                    {selectedType.label}
                  </div>
                  <div className="text-gray-400 mt-1 text-sm sm:text-base italic">
                    {selectedType.tagline}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span
                    className={[
                      'text-xs font-semibold px-3 py-1 rounded-full border',
                      catConfig.badge,
                      catConfig.badgeBorder,
                    ].join(' ')}
                  >
                    {selectedType.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    MBTI：{selectedType.mbti}
                  </span>
                </div>
              </div>
            </div>

            {/* Content cards */}
            {info ? (
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Description */}
                {info.description && info.description !== '内容即将更新' && (
                  <div className="sm:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 sm:mb-3">
                      人格解读
                    </div>
                    <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                      {info.description}
                    </p>
                  </div>
                )}

                {/* Traits */}
                {info.traits?.length > 0 && (
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6">
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

                {/* In Relationships */}
                {info.inRelationships && (
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 sm:mb-3">
                      💝 在关系中
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {info.inRelationships}
                    </p>
                  </div>
                )}

                {/* Strengths */}
                {info.strengths?.length > 0 && (
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6">
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

                {/* Weaknesses */}
                {info.weaknesses?.length > 0 && (
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6">
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

                {/* CTA row */}
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Link
                    href={`/compatibility?a=${selectedType.code}`}
                    className="text-center bg-pink-500/15 hover:bg-pink-500/25 active:bg-pink-500/30 border border-pink-500/40 hover:border-pink-400/70 text-pink-300 font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-200 text-sm"
                  >
                    💕 情侣匹配测试
                  </Link>
                  <Link
                    href={`/profile/${selectedType.code}`}
                    className="text-center bg-white/[0.05] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white/10 hover:border-white/25 text-gray-300 font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-200 text-sm"
                  >
                    查看完整详情 →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-8 sm:p-10 text-center text-gray-500 text-sm">
                详细解读即将更新
              </div>
            )}
          </section>
        )}

        {/* ── Footer CTA ── */}
        <footer className="border-t border-white/[0.08] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="font-semibold text-gray-200 text-sm sm:text-base">情侣匹配度测试</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-0.5">输入两个 SBTI 类型，查看匹配分数与分析</div>
          </div>
          <Link
            href="/compatibility"
            className="bg-pink-500/15 hover:bg-pink-500/25 active:bg-pink-500/30 border border-pink-500/40 hover:border-pink-400/70 text-pink-300 font-medium px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap text-sm"
          >
            💕 情侣匹配测试 →
          </Link>
        </footer>
      </div>
    </main>
  )
}
