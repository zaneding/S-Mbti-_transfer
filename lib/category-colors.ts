export type CategoryColors = {
  gradient: string
  gradientStyle: string
  text: string
  bg: string
  border: string
  badge: string
}

const CATEGORY_COLORS: Record<string, CategoryColors> = {
  '控制': {
    gradient: 'from-red-500 to-rose-700',
    gradientStyle: 'linear-gradient(135deg, #ef4444, #be123c)',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    badge: 'bg-red-500/20 text-red-300',
  },
  '理性': {
    gradient: 'from-indigo-400 to-violet-600',
    gradientStyle: 'linear-gradient(135deg, #818cf8, #7c3aed)',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    badge: 'bg-indigo-500/20 text-indigo-300',
  },
  '情感': {
    gradient: 'from-pink-400 to-rose-600',
    gradientStyle: 'linear-gradient(135deg, #f472b6, #e11d48)',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    badge: 'bg-pink-500/20 text-pink-300',
  },
  '社交': {
    gradient: 'from-orange-400 to-amber-600',
    gradientStyle: 'linear-gradient(135deg, #fb923c, #d97706)',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    badge: 'bg-orange-500/20 text-orange-300',
  },
  '状态': {
    gradient: 'from-purple-400 to-violet-700',
    gradientStyle: 'linear-gradient(135deg, #c084fc, #6d28d9)',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-300',
  },
  '补充': {
    gradient: 'from-teal-400 to-cyan-600',
    gradientStyle: 'linear-gradient(135deg, #2dd4bf, #0891b2)',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    badge: 'bg-teal-500/20 text-teal-300',
  },
}

export function getCategoryColors(category: string): CategoryColors {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS['补充']
}
