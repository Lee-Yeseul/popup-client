export default function DashboardFallback() {
  const array = Array.from({ length: 4 }, (_, i) => i)
  return (
    <div className="mx-6 my-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {array.map((v) => (
        <div
          key={v}
          className="aspect-square h-56 bg-neutral-100 xs:w-full"
        ></div>
      ))}
    </div>
  )
}
