export type ScoreLevel = {
  min: number
  max: number
  stars: number
  title: string
  comment: string
}

export const scoreLevels: ScoreLevel[] = [
  {
    min: 88, max: 90, stars: 5,
    title: '天作之合',
    comment: '极度契合，两人互相成就，这种组合真的是命中注定。在一起的每一刻都像是宇宙的安排。',
  },
  {
    min: 80, max: 87, stars: 4,
    title: '高度匹配',
    comment: '默契十足，相处融洽，是那种一起能把日子过得很好的组合。偶尔的小摩擦只会让你们更了解彼此。',
  },
  {
    min: 70, max: 79, stars: 3,
    title: '互补型搭档',
    comment: '有摩擦但能互补，需要多一点包容，但差异正是你们的魔力所在。两个不同的灵魂相遇，才有故事可讲。',
  },
  {
    min: 60, max: 69, stars: 2,
    title: '需要磨合',
    comment: '差异明显，需要更多沟通和耐心。但努力经营也能走得很远——毕竟，真正的关系都是磨出来的。',
  },
  {
    min: 40, max: 59, stars: 1,
    title: '挑战型',
    comment: '相处需要很大耐心，两人能量差距较大。但正因如此，彼此都能突破舒适圈，获得意想不到的成长。',
  },
]

export function getScoreLevel(score: number): ScoreLevel {
  const level = scoreLevels.find(l => score >= l.min && score <= l.max)
  if (!level) {
    // Score should always be 40-90 from the matrix. Return lowest tier as safe fallback.
    console.warn(`getScoreLevel: score ${score} is outside expected range 40-90`)
    return scoreLevels[scoreLevels.length - 1]
  }
  return level
}
