'use client'

import { sbtiTypes } from '@/data/sbti-types'

interface TypeSelectorProps {
  value: string
  onChange: (code: string) => void
  label?: string
  placeholder?: string
}

const GROUPS: { name: string; codes: string[] }[] = [
  { name: '控制', codes: ['BOSS', 'CTRL', 'GOGO', 'EXECUTOR', 'OH-NO'] },
  { name: '理性', codes: ['Dior-s', 'FAKE', 'OJBK', 'ANALYST', 'DETACHED'] },
  { name: '情感', codes: ['LOVE-R', 'ATM-er', 'MUM', 'THAN-K', 'SEXY'] },
  { name: '社交', codes: ['JOKE-R', 'MALO', 'WOC!', 'PERFORMER'] },
  { name: '状态', codes: ['ALARMIST', 'WHATEVER', 'CYNIC', 'MASKER', 'LOST'] },
  { name: '补充', codes: ['HUSTLER', 'PLAYER', 'DREAMER', 'FIXER'] },
]

export default function TypeSelector({
  value,
  onChange,
  label,
  placeholder = '请选择类型',
}: TypeSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {GROUPS.map((group) => (
          <optgroup key={group.name} label={group.name}>
            {group.codes.map((code) => {
              const t = sbtiTypes.find(
                (x) => x.code.toLowerCase() === code.toLowerCase()
              )
              if (!t) return null
              return (
                <option key={t.code} value={t.code}>
                  {t.code} — {t.label}
                </option>
              )
            })}
          </optgroup>
        ))}
      </select>
    </div>
  )
}
