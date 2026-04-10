'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'
import { sbtiTypes } from '@/data/sbti-types'
import { motion } from 'motion/react'
import clsx from 'clsx'

const CATEGORIES = ['全部', '控制', '理性', '情感', '社交', '状态', '补充']

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

export default function ProfilePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')

  const filtered = useMemo(() => {
    return sbtiTypes.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(query.toLowerCase()) ||
        item.label.includes(query) ||
        item.tagline.includes(query) ||
        item.mbti.toLowerCase().includes(query.toLowerCase())
      const matchesCat = activeCategory === '全部' || item.category === activeCategory
      return matchesSearch && matchesCat
    })
  }, [query, activeCategory])

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Sticky Header */}
      <div className="bg-white px-5 pt-10 pb-5 rounded-b-[2rem] shadow-sm mb-5 z-20 sticky top-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
          <Link href="/" className="text-rose-500 font-semibold tracking-wider text-xs hover:text-rose-600 transition-colors">
            ← 返回首页
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-black text-slate-900 mb-5 tracking-tight leading-snug"
        >
          测MBTI过时了？<br />
          来看你的{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
            SBTI
          </span>{' '}
          人设
        </motion.h1>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative flex items-center mb-4"
        >
          <Search className="w-4 h-4 absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="搜索类型、标签或 MBTI（如 'INTJ'）"
            className="w-full bg-slate-100 rounded-2xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all text-slate-700 text-sm font-medium placeholder:text-slate-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide -mx-5 px-5"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all',
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {filtered.map((item, i) => (
            <Link key={item.code} href={`/profile/${item.code}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-[1.5rem] p-4 sm:p-5 shadow-sm border border-slate-100 flex flex-col h-full relative overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Decoration blob */}
                <div className={clsx(
                  'absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-25 bg-gradient-to-br',
                  CAT_GRADIENT[item.category] ?? 'from-slate-300 to-slate-400'
                )} />

                <span className={clsx(
                  'text-xs font-bold mb-2 uppercase tracking-wider relative',
                  CAT_COLOR[item.category] ?? 'text-slate-400'
                )}>
                  {item.category}
                </span>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-0.5 relative">{item.label}</h3>
                <p className="text-xs text-slate-400 mb-auto relative">{item.tagline}</p>

                {/* MBTI chips */}
                <div className="flex gap-1 flex-wrap mt-3 pt-3 border-t border-slate-50 relative">
                  {item.mbti.split('/').slice(0, 2).map((m) => (
                    <span
                      key={m}
                      className={clsx(
                        'text-[10px] px-2 py-1 rounded-md font-bold bg-slate-100',
                        CAT_COLOR[item.category] ?? 'text-slate-500'
                      )}
                    >
                      {m.trim()}
                    </span>
                  ))}
                  {item.mbti.split('/').length > 2 && (
                    <span className="text-[10px] px-2 py-1 rounded-md font-bold bg-slate-100 text-slate-400">
                      +{item.mbti.split('/').length - 2}
                    </span>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">没有找到对应的人设~</p>
            <p className="text-sm mt-1">换个搜索词试试？</p>
          </div>
        )}
      </div>
    </div>
  )
}
