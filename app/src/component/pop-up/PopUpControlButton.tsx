'use client'

import { useRouter } from 'next/navigation'
import { popUpAPI } from '../../api/pop-up'
import { useEffect, useState } from 'react'
import { userAPI } from '../../api/user'
import { HTTPError } from '../../util/customError'
import useToast from '../common/toast/useToast'

interface PopUpControlButtonProps {
  id: string
  isAvailable: boolean
  authorId: string
}

export default function PopUpControlButton({
  id,
  isAvailable,
  authorId,
}: PopUpControlButtonProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(isAvailable)
  const [hasAuthority, setHasAuthority] = useState(false)

  const onClickToggle = async () => {
    try {
      await popUpAPI.putPopUpIsAvailableById(id, !isChecked)
      setIsChecked(!isChecked)
    } catch (error) {
      if (error instanceof HTTPError) {
        toast(error.message, 'error')
        return
      }
    }
  }

  const onRemove = async () => {
    try {
      await popUpAPI.deletePopUpById(id)
      router.push('/')
    } catch (error) {
      if (error instanceof HTTPError) {
        toast(error.message, 'error')
        return
      }
    }
  }

  const checkAuthority = async () => {
    try {
      const { data } = await userAPI.getUserInfo()
      if (data.id === authorId) return setHasAuthority(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuthority()
  }, [])

  return (
    <>
      {hasAuthority && (
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
