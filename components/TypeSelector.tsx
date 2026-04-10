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
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest text-white/35">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-3 py-2.5 text-sm font-medium appearance-none cursor-pointer transition-all focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: value ? 'white' : 'rgba(255,255,255,0.35)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '32px',
        }}
      >
        <option value="" disabled style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.4)' }}>
          {placeholder}
        </option>
        {GROUPS.map((group) => (
          <optgroup key={group.name} label={group.name} style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.6)' }}>
            {group.codes.map((code) => {
              const t = sbtiTypes.find((x) => x.code.toLowerCase() === code.toLowerCase())
              if (!t) return null
              return (
                <option key={t.code} value={t.code} style={{ background: '#1a1a2e', color: 'white' }}>
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
