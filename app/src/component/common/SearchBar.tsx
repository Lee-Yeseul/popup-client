'use client'

import { FormEvent, useRef } from 'react'
import SearchIcon from '@/public/assets/icons/search.svg'

interface SearchBarProps {
  setKeyword: (keyword: string) => void
  placeholder?: string
}
export default function SearchBar({ setKeyword, placeholder }: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInputRef.current) return
    setKeyword(searchInputRef.current.value)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mx-4 flex h-11 items-center justify-between rounded-full border-2 border-solid border-primary-500 bg-white/40 pl-6 pr-3 hover:shadow-sm">
        <input
          ref={searchInputRef}
          className="h-full w-11/12 bg-white/40 hover:border-none focus:outline-none"
          placeholder={placeholder ?? '검색어를 입력하세요.'}
        />
        <button type="submit">
          <SearchIcon
            width="40"
            height="40"
            fill="#0d0579"
            className="rounded-full p-1"
          />
        </button>
      </div>
    </form>
  )
}
