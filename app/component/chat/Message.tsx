import Avatar from '../common/Avatar'

export default function Message() {
  return (
    <div className="w-fit max-w-96">
      <div className="flex gap-2">
        <div>
          <Avatar
            src="https://i.imgur.com/7kmLp3v.jpeg"
            alt="profile"
            width="w-12"
            height="h-12"
          />
        </div>
        <div>
          <div className="rounded-3xl rounded-tl-none bg-green-100 p-5 text-base/6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et dolorum
            amet voluptas, quo necessitatibus quasi. Asperiores repellat eius
            quaerat aspernatur consequatur blanditiis sint voluptatem soluta
            deserunt autem dolorum, similique neque!
          </div>
          <div className="mt-1 text-sm text-gray-400">11:30 AM</div>
        </div>
      </div>
    </div>
  )
}
