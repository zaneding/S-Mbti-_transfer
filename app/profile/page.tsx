'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { sbtiTypes, type SbtiType } from '@/data/sbti-types'
import sbtiInfoRaw from '@/data/sbtiInfo.json'
import type { ProfileInfo } from '@/components/ProfileCard'

const sbtiInfo = sbtiInfoRaw as unknown as Record<string, ProfileInfo | undefined>

/* ── Category config ── */
const CATS = [
  { name: '控制', emoji: '👑', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', border: 'rgba(220,38,38,0.25)', glow: 'rgba(220,38,38,0.15)' },
  { name: '理性', emoji: '🧠', color: '#2563eb', bg: 'rgba(37,99,235,0.08)', border: 'rgba(37,99,235,0.25)', glow: 'rgba(37,99,235,0.15)' },
  { name: '情感', emoji: '💝', color: '#db2777', bg: 'rgba(219,39,119,0.08)', border: 'rgba(219,39,119,0.25)', glow: 'rgba(219,39,119,0.15)' },
  { name: '社交', emoji: '🎭', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.25)', glow: 'rgba(124,58,237,0.15)' },
  { name: '状态', emoji: '🌊', color: '#0d9488', bg: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.25)', glow: 'rgba(13,148,136,0.15)' },
  { name: '补充', emoji: '⭐', color: '#d97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.25)', glow: 'rgba(217,119,6,0.15)' },
]

function getCat(name: string) {
  return CATS.find(c => c.name === name) ?? CATS[0]
}

/* ── Profile detail cards ── */
function ProfileDetail({ type, onClose }: { type: SbtiType; onClose: () => void }) {
  const cat = getCat(type.category)
  const info = sbtiInfo[type.code]

  return (
    <div className="section-animate-in flex flex-col gap-3 sm:gap-4">
      {/* Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex items-start justify-between flex-wrap gap-4"
        style={{ background: cat.bg, border: `1px solid ${cat.border}`, boxShadow: `0 16px 40px ${cat.glow}` }}>
        <div>
          <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono" style={{ color: cat.color }}>
            {type.code}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-1.5">{type.label}</div>
          <div className="text-gray-500 text-sm italic mt-1">{type.tagline}</div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
            {type.category}
          </span>
          <span className="text-xs text-gray-400">MBTI：{type.mbti}</span>
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 mt-1 transition-colors">
            ✕ 收起
          </button>
        </div>
      </div>

      {info ? (
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {info.description && info.description !== '内容即将更新' && (
            <div className="sm:col-span-2 rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.90)', boxShadow: '0 4px 20px rgba(139,92,246,0.06)' }}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">人格解读</div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{info.description}</p>
            </div>
          )}

          {info.traits?.length > 0 && (
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.90)', boxShadow: '0 4px 20px rgba(139,92,246,0.06)' }}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">核心特质</div>
              <div className="flex flex-wrap gap-2">
                {info.traits.map((t, i) => (
                  <span key={i} className="text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium"
                    style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {info.inRelationships && (
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.90)', boxShadow: '0 4px 20px rgba(139,92,246,0.06)' }}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">💝 在关系中</div>
              <p className="text-gray-600 leading-relaxed text-sm">{info.inRelationships}</p>
            </div>
          )}

          {info.strengths?.length > 0 && (
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.90)', boxShadow: '0 4px 20px rgba(139,92,246,0.06)' }}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">✨ 优势</div>
              <ul className="flex flex-col gap-2">
                {info.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {info.weaknesses?.length > 0 && (
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.90)', boxShadow: '0 4px 20px rgba(139,92,246,0.06)' }}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">⚡ 劣势</div>
              <ul className="flex flex-col gap-2">
                {info.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />{w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Link href={`/compatibility?a=${type.code}`}
              className="text-center font-semibold py-3 rounded-xl text-sm transition-all duration-200 active:scale-95 hover:scale-[1.02]"
              style={{ background: 'rgba(219,39,119,0.10)', border: '1px solid rgba(219,39,119,0.30)', color: '#9d174d' }}>
              💕 情侣匹配测试
            </Link>
            <Link href={`/profile/${type.code}`}
              className="text-center font-semibold py-3 rounded-xl text-sm transition-all duration-200 active:scale-95 hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(139,92,246,0.20)', color: '#5b21b6' }}>
              查看完整详情 →
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl p-8 text-center text-gray-400 text-sm"
          style={{ background: 'rgba(255,255,255,0.50)', border: '1px solid rgba(255,255,255,0.80)' }}>
          详细解读即将更新
        </div>
      )}
    </div>
  )
}

/* ── Main page ── */
export default function ProfileSelectorPage() {
  const [selected, setSelected] = useState<SbtiType | null>(null)
  const [showAll, setShowAll] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  function pickType(type: SbtiType) {
    setSelected(type)
    setTimeout(() => {
      profileRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #fdf2f8 50%, #eef2ff 100%)' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8 sm:gap-10">

        {/* Header */}
        <div className="flex items-start gap-4">
          <Link href="/" className="mt-1 text-sm text-violet-400 hover:text-violet-600 transition-colors flex-shrink-0">← 返回</Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-950">MBTI 对照查询</h1>
            <p className="text-violet-400 text-sm mt-1">选择你的 SBTI 类型，查看对应 MBTI 与完整人格解读</p>
          </div>
        </div>

        {/* ── Single-select mode (default) ── */}
        {!showAll && (
          <div className="flex flex-col gap-5">
            {/* Big selector card */}
            <div className="rounded-2xl p-5 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.90)', boxShadow: '0 8px 32px rgba(139,92,246,0.10)' }}>
              <p className="text-sm font-semibold text-gray-500 mb-3">选择你的类型</p>

              {/* Category + type two-step selector */}
              <div className="flex flex-col gap-4">
                {CATS.map(cat => {
                  const types = sbtiTypes.filter(t => t.category === cat.name)
                  const selectedInCat = types.find(t => t.code === selected?.code)
                  return (
                    <details key={cat.name} className="group" open={!!selectedInCat}>
                      <summary className="flex items-center gap-2 cursor-pointer select-none list-none py-2.5 px-3 rounded-xl transition-colors hover:bg-white/60"
                        style={{ borderBottom: `1px solid rgba(0,0,0,0.05)` }}>
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="font-semibold text-sm" style={{ color: cat.color }}>{cat.name}</span>
                        <span className="text-xs text-gray-400 ml-1">{types.length} 种</span>
                        {selectedInCat && (
                          <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                            {selectedInCat.label}
                          </span>
                        )}
                        <span className="ml-auto text-gray-300 text-xs group-open:rotate-180 transition-transform duration-200">▼</span>
                      </summary>

                      <div className="pt-2 pb-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {types.map(type => {
                          const isSelected = selected?.code === type.code
                          return (
                            <button key={type.code} onClick={() => pickType(type)}
                              className="min-h-[72px] sm:min-h-[80px] rounded-xl p-3 text-left transition-all duration-200 active:scale-95 hover:scale-[1.02]"
                              style={{
                                background: isSelected ? cat.bg : 'rgba(255,255,255,0.60)',
                                backdropFilter: 'blur(12px)',
                                border: `1px solid ${isSelected ? cat.border : 'rgba(0,0,0,0.07)'}`,
                                boxShadow: isSelected ? `0 8px 24px ${cat.glow}` : '0 2px 8px rgba(0,0,0,0.04)',
                              }}>
                              <div className="text-xs font-bold font-mono" style={{ color: isSelected ? cat.color : '#9ca3af' }}>
                                {type.code}
                              </div>
                              <div className="text-sm font-semibold text-gray-800 mt-0.5">{type.label}</div>
                              <div className="text-xs text-gray-400 mt-0.5 leading-snug hidden sm:block">{type.tagline}</div>
                            </button>
                          )
                        })}
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>

            {/* "Show all" toggle button */}
            <button onClick={() => setShowAll(true)}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-95"
              style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.20)', color: '#7c3aed' }}>
              查看所有类型对照 →
            </button>
          </div>
        )}

        {/* ── All types grid (expanded mode) ── */}
        {showAll && (
          <div className="flex flex-col gap-8 section-animate-in">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowAll(false)}
                className="text-sm font-semibold transition-colors hover:scale-[1.02] px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(139,92,246,0.10)', color: '#7c3aed', border: '1px solid rgba(139,92,246,0.20)' }}>
                ← 收起
              </button>
              <p className="text-sm text-gray-400">全部 28 种类型 — 点击选择</p>
              {selected && (
                <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: getCat(selected.category).bg, color: getCat(selected.category).color, border: `1px solid ${getCat(selected.category).border}` }}>
                  已选：{selected.label}
                </span>
              )}
            </div>

            {CATS.map(cat => {
              const types = sbtiTypes.filter(t => t.category === cat.name)
              return (
                <section key={cat.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg select-none">{cat.emoji}</span>
                    <h2 className="text-sm font-bold" style={{ color: cat.color }}>{cat.name}</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                    {types.map((type, i) => {
                      const isSel = selected?.code === type.code
                      return (
                        <button key={type.code} onClick={() => pickType(type)}
                          className="type-card-animate min-h-[80px] sm:min-h-[92px] rounded-2xl p-3.5 text-left transition-all duration-250 active:scale-95 hover:scale-[1.03]"
                          style={{
                            animationDelay: `${i * 40}ms`,
                            background: isSel ? cat.bg : 'rgba(255,255,255,0.65)',
                            backdropFilter: 'blur(14px)',
                            border: `1px solid ${isSel ? cat.border : 'rgba(0,0,0,0.07)'}`,
                            boxShadow: isSel ? `0 10px 30px ${cat.glow}` : '0 2px 10px rgba(0,0,0,0.04)',
                          }}>
                          <div className="text-xs font-bold font-mono" style={{ color: isSel ? cat.color : '#9ca3af' }}>
                            {type.code}
                          </div>
                          <div className="text-sm font-semibold text-gray-800 mt-0.5">{type.label}</div>
                          <div className="text-xs text-gray-400 mt-1 leading-snug hidden sm:block">{type.tagline}</div>
                        </button>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* ── Profile detail ── */}
        {selected && (
          <div ref={profileRef} key={selected.code} className="scroll-mt-6">
            <ProfileDetail type={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </main>
  )
}
