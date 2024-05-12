import Link from 'next/link'
import Card from '../common/Card'
import ImageBox from '../common/ImageBox'

interface DashboardProps {
  dataList: any[]
}

export default async function Dashboard({ dataList }: DashboardProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 ">
      {dataList.map(({ title, tags, id, dog }) => (
        <Link href={`/dog-posts/${id}`}>
          <Card key={id} className="hover:cursor-pointer">
            <div className={`relative h-48 w-full`}>
              <ImageBox imagePath={dog.imagePath} />
            </div>
            <Card.Description>
              <div className="font-bold">{title}</div>
              <div className="flex gap-2">
                {tags.map((tag: string) => (
                  <div
                    key={id + tag}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <span>#{tag}</span>
                  </div>
                ))}
              </div>
            </Card.Description>
          </Card>
        </Link>
      ))}
    </div>
  )
}
