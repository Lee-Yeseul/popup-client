'use client'

import { FormEvent, useRef } from 'react'
import SearchIcon from '@/public/assets/icons/search.svg'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(useSearchParams())
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInputRef.current) return
    params.set('search', searchInputRef.current.value)
    router.push(`${pathname}?${params.toString()}`)
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex h-11 items-center justify-between rounded-full border-1 border-solid border-secondary-500 bg-white pl-6 pr-3 hover:shadow-sm">
        <input
          ref={searchInputRef}
          className="h-full w-11/12 hover:border-none focus:outline-none"
          placeholder="검색어를 입력하세요."
        />
        <button type="submit">
          <SearchIcon
            width="32"
            height="32"
            fill="#0d0579"
            className="rounded-full p-1"
          />
        </button>
      </div>
    </form>
  )
}
