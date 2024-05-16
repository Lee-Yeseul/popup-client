'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import useDetectElement from '@/app/hook/useDetectElement'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { popUpAPI } from '@/app/api/pop-up'
import { usePopUpStore } from '@/app/store/popUpStore'

interface SearchFilterProps {
  filterList: { label: string; value: string }[]
}

export default function SearchFilter({ filterList }: SearchFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(useSearchParams())

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    params.getAll('category'),
  )
  const { setPopUpList } = usePopUpStore()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [leftScrollBtnVisibleState, setLeftScrollBtnVisible] = useState(false)
  const [rightScrollBtnVisibleState, setRightScrollBtnVisible] = useState(true)

  const [setLeftScrollTarget] = useDetectElement({
    threshold: 1,
    onIntersect: useCallback(([{ isIntersecting }]) => {
      if (isIntersecting) setLeftScrollBtnVisible(false)
      else setLeftScrollBtnVisible(true)
    }, []),
  })

  const [setRightScrollTarget] = useDetectElement({
    threshold: 0.5,
    onIntersect: useCallback(([{ isIntersecting }]) => {
      if (isIntersecting) setRightScrollBtnVisible(false)
      else setRightScrollBtnVisible(true)
    }, []),
  })

  const handleClickScrollBtn = (size: number) => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    scrollContainer.scrollLeft += size
  }

  const onClickTarget = (value: string) => {
    if (selectedCategory.includes(value)) {
      setSelectedCategory(
        selectedCategory.filter((category) => category !== value),
      )
      params.delete('category', value)
      router.push(`${pathname}?${params.toString()}`)
    } else {
      setSelectedCategory([...selectedCategory, value])
      params.append('category', value)
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const getPopUpList = async () => {
    try {
      const { data } = await popUpAPI.getPopUpList({
        category: selectedCategory,
        search: params.get('search') ?? '',
      })
      setPopUpList(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPopUpList()
  }, [params.toString()])

  return (
    <div className="relative flex h-16 w-full items-center gap-3">
      <div
        className={`${
          leftScrollBtnVisibleState ? 'visible animate-fade-in' : 'hidden'
        }  absolute left-0 z-30 bg-white`}
      >
        <button
          className="shadow-grey-500 h-8 w-8 rounded-full border-1 border-solid border-gray-300 p-2 hover:shadow-md"
          onClick={() => handleClickScrollBtn(-100)}
        >
          {'<'}
        </button>
      </div>
      <div
        className="flex basis-11/12 flex-nowrap gap-3 overflow-x-scroll scroll-smooth scrollbar-hide"
        ref={scrollRef}
      >
        {filterList.map(({ value, label }, index) => (
          <div
            key={value}
            className="shrink-0"
            ref={
              index === 0
                ? setLeftScrollTarget
                : index === filterList.length - 1
                  ? setRightScrollTarget
                  : null
            }
          >
            <button
              className={`hover:bold rounded-lg border-1 border-solid border-gray-300 p-3 text-gray-500 hover:border-gray-800 hover:text-gray-800 ${selectedCategory.includes(value) ? 'bg-pink-200' : ''}`}
              onClick={() => onClickTarget(value)}
            >
              {label}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          className={`shadow-grey-500 h-8 w-8 rounded-full border-1 border-solid border-gray-300 p-2 hover:shadow-md ${
            rightScrollBtnVisibleState ? 'visible animate-fade-in' : 'invisible'
          }`}
          onClick={() => handleClickScrollBtn(100)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}
