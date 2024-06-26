'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { usePopUpStore } from '@/app/src/store/popUpStore'
import useDetectElement from '@/app/src/hook/useDetectElement'
import { popUpAPI } from '@/app/src/api/pop-up'
import { HTTPError } from '../../util/customError'

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
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    } else {
      setSelectedCategory([...selectedCategory, value])
      params.append('category', value)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  const getPopUpList = async () => {
    try {
      const inProgress = params.get('inProgress') === 'false' ? false : true
      const { data } = await popUpAPI.getPopUpList({
        category: selectedCategory,
        search: params.get('search') ?? '',
        isAvailable: true,
        inProgress,
      })

      setPopUpList(data)
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    getPopUpList()
  }, [params.toString()])

  return (
    <div className="mx-6 my-3">
      <div className="relative flex h-16 w-full items-center gap-3">
        <div
          className={`${
            leftScrollBtnVisibleState ? 'visible animate-fade-in' : 'hidden'
          }  absolute left-0 z-30`}
        >
          <button
            className="flex h-8 w-8 items-center rounded-full border-1 border-solid border-gray-300 bg-white p-3 shadow-gray-500 hover:shadow-md"
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
                className={`rounded-lg border-1 border-solid border-gray-300 p-3 ${selectedCategory.includes(value) ? 'bg-primary-500 text-white' : 'bg-white text-black'}`}
                onClick={() => onClickTarget(value)}
              >
                {label}
              </button>
            </div>
          ))}
        </div>
        <div>
          <button
            className={`flex h-8 w-8 items-center rounded-full border-1 border-solid border-gray-300 bg-white p-3 shadow-gray-500 hover:shadow-md ${
              rightScrollBtnVisibleState
                ? 'visible animate-fade-in'
                : 'invisible'
            }`}
            onClick={() => handleClickScrollBtn(100)}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
