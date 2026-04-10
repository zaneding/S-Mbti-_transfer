import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSbtiType, sbtiTypes } from '@/data/sbti-types'
import ProfileCard, { type ProfileInfo } from '@/components/ProfileCard'
import sbtiInfo from '@/data/sbtiInfo.json'

interface PageProps {
  params: Promise<{ type: string }>
}

export function generateStaticParams() {
  return sbtiTypes.map((t) => ({ type: t.code }))
}

export default async function ProfilePage({ params }: PageProps) {
  const { type: typeParam } = await params
  const sbtiType = getSbtiType(typeParam)

  if (!sbtiType) {
    notFound()
  }

  const info = (sbtiInfo as unknown as Record<string, ProfileInfo | undefined>)[sbtiType.code]

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center gap-6">
      <div className="w-full max-w-lg">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← 返回首页
          </Link>
          <Link
            href={`/compatibility?a=${sbtiType.code}`}
            className="text-sm bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            去做情侣匹配测试 →
          </Link>
        </div>

        <ProfileCard type={sbtiType} info={info} />
      </div>
    </main>
  )
}
