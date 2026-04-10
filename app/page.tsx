'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TypeSelector from '@/components/TypeSelector'

export default function Home() {
  const [selectedType, setSelectedType] = useState('')
  const router = useRouter()

  function handleTypeQuery() {
    if (selectedType) {
      router.push(`/profile/${selectedType}`)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-xl w-full flex flex-col items-center gap-8">
        {/* Hero */}
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-gray-900">SBTI 人格查询</h1>
          <p className="text-lg text-gray-500">
            27种人格类型 × MBTI对照 × 情侣匹配度测试
          </p>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
            SBTI 是一套基于真实社交观察的人格分类系统，覆盖控制、理性、情感、社交、状态五大维度，帮你看清自己也看懂他人。
          </p>
        </div>

        {/* Type Query Section */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">查询我的SBTI类型</h2>
          <TypeSelector
            value={selectedType}
            onChange={setSelectedType}
            label="选择你的类型"
            placeholder="请选择类型"
          />
          <button
            onClick={handleTypeQuery}
            disabled={!selectedType}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            查看详情
          </button>
        </div>

        {/* Compatibility Link */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-800">情侣匹配度测试</h2>
          <p className="text-sm text-gray-500">输入两个SBTI类型，立刻查看匹配分数和分析。</p>
          <Link
            href="/compatibility"
            className="w-full text-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            情侣匹配度测试 →
          </Link>
        </div>
      </div>
    </main>
  )
}
