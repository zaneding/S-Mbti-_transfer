export type SbtiType = {
  code: string
  label: string
  mbti: string
  category: string
  tagline: string
}

export const sbtiTypes: SbtiType[] = [
  { code: 'BOSS',      label: '掌控者',  mbti: 'ENTJ',        category: '控制', tagline: '天生领导' },
  { code: 'CTRL',      label: '拿捏者',  mbti: 'ENTJ/ESTJ',   category: '控制', tagline: '控场大师' },
  { code: 'GOGO',      label: '冲锋者',  mbti: 'ESTP/ENTJ',   category: '控制', tagline: '先干再说' },
  { code: 'EXECUTOR',  label: '干活机器', mbti: 'ISTJ/ESTJ',   category: '控制', tagline: '稳定输出' },
  { code: 'OH-NO',     label: '风控员',  mbti: 'INTJ/ISTJ',   category: '控制', tagline: '提前预警' },
  { code: 'Dior-s',    label: '看透者',  mbti: 'INTP/INTJ',   category: '理性', tagline: '洞察本质' },
  { code: 'FAKE',      label: '伪装者',  mbti: 'ENTP/ENFP',   category: '理性', tagline: '多面人格' },
  { code: 'OJBK',      label: '无所谓者', mbti: 'INTP/ISTP',   category: '理性', tagline: '佛系人生' },
  { code: 'ANALYST',   label: '思考怪',  mbti: 'INTP',        category: '理性', tagline: '逻辑机器' },
  { code: 'DETACHED',  label: '抽离者',  mbti: 'ISTP',        category: '理性', tagline: '情绪关闭' },
  { code: 'LOVE-R',    label: '恋爱脑',  mbti: 'ENFP/INFP',   category: '情感', tagline: '爱情优先' },
  { code: 'ATM-er',    label: '送钱者',  mbti: 'ISFJ/ESFJ',   category: '情感', tagline: '过度付出' },
  { code: 'MUM',       label: '老妈子',  mbti: 'ISFJ/ENFJ',   category: '情感', tagline: '照顾所有人' },
  { code: 'THAN-K',    label: '好人卡',  mbti: 'ENFJ/ESFJ',   category: '情感', tagline: '永远体贴' },
  { code: 'SEXY',      label: '氛围王',  mbti: 'ESFP/ENFP',   category: '情感', tagline: '魅力中心' },
  { code: 'JOKE-R',    label: '搞笑型',  mbti: 'ENTP/ESFP',   category: '社交', tagline: '气氛担当' },
  { code: 'MALO',      label: '搞事者',  mbti: 'ENFP/ESTP',   category: '社交', tagline: '制造混乱' },
  { code: 'WOC!',      label: '戏精',    mbti: 'ESFP/ENFP',   category: '社交', tagline: '情绪夸张' },
  { code: 'PERFORMER', label: '表演型',  mbti: 'ESFP',        category: '社交', tagline: '爱被关注' },
  { code: 'ALARMIST',  label: '焦虑怪',  mbti: 'INTJ/INFJ',   category: '状态', tagline: '高敏预警' },
  { code: 'WHATEVER',  label: '躺平人',  mbti: 'INTP/ISFP',   category: '状态', tagline: '什么都行' },
  { code: 'CYNIC',     label: '悲观人',  mbti: 'INTP',        category: '状态', tagline: '不信世界' },
  { code: 'MASKER',    label: '社会人',  mbti: 'ENTP',        category: '状态', tagline: '看人下菜' },
  { code: 'LOST',      label: '迷茫者',  mbti: 'INFP',        category: '状态', tagline: '找不到方向' },
  { code: 'HUSTLER',   label: '卷王',    mbti: 'ENTJ/ESTJ',   category: '补充', tagline: '拼命往上' },
  { code: 'PLAYER',    label: '玩咖',    mbti: 'ESTP',        category: '补充', tagline: '享乐主义' },
  { code: 'DREAMER',   label: '做梦人',  mbti: 'INFP',        category: '补充', tagline: '理想主义' },
  { code: 'FIXER',     label: '修补者',  mbti: 'ISFJ',        category: '补充', tagline: '收拾残局' },
]

export function getSbtiType(code: string): SbtiType | undefined {
  return sbtiTypes.find(t => t.code.toLowerCase() === code.toLowerCase())
}
