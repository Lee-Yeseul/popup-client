'use client'

import { useRouter } from 'next/navigation'
import { useUserStore } from '@/app/src/store/userStore'
import { popUpAPI } from '../../api/pop-up'
import { useState } from 'react'

interface PopUpControlButtonProps {
  id: string
  isAvailable: boolean
}

export default function PopUpControlButton({
  id,
  isAvailable,
}: PopUpControlButtonProps) {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(isAvailable)
  const { isLogin } = useUserStore()

  const onClickToggle = async () => {
    try {
      await popUpAPI.putPopUpIsAvailableById(id, !isChecked)
      setIsChecked(!isChecked)
    } catch (err) {
      console.log(err)
    }
  }

  const onRemove = async () => {
    try {
      await popUpAPI.deletePopUpById(id)
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isLogin && (
        <div className="flex w-full justify-end gap-2 px-2">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              checked={isChecked}
              onChange={onClickToggle}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>

            <span className="ms-3 font-semibold text-gray-900 dark:text-gray-300">
              {isChecked ? '공개됨' : '비공개됨'}
            </span>
          </label>
          <button
            className="rounded-md bg-primary-500 p-2.5 text-white"
            onClick={() => router.push(`update/${id}`)}
          >
            편집하기
          </button>
          <button
            className="rounded-md bg-red-500 p-2.5 text-white"
            onClick={onRemove}
          >
            삭제하기
          </button>
        </div>
      )}
    </>
  )
}
