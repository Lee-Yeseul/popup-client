'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import MenuIcon from '@/public/assets/icons/menu.svg'
// import AccountIcon from '@/public/assets/icons/account.svg'

import Dropdown from '../common/Dropdown'
import SignInDialog from '../auth/SignInDialog'

// outside click 함수에서 사용하는 ref 수정하기
export default function HeaderMenu() {
  const [isDropdownButtonClicked, setIsDropdownButtonClicked] = useState(false)
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)

  const router = useRouter()

  const onClickMenuButton = () => {
    setIsDropdownButtonClicked((prev) => !prev)
  }

  const onClickSignIn = () => {
    setIsSignInDialogOpen(true)
    setIsDropdownButtonClicked(false)
  }

  const onClickSignUp = () => {
    router.push('/signup')
  }

  const onClickOutsideToggle = () => {
    setIsDropdownButtonClicked(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => onClickMenuButton()}
        className="flex items-center justify-between gap-3 py-1.5 pl-2.5 pr-2"
      >
        <MenuIcon width="30" height="30" fill="#6b7280" />
        {/* <AccountIcon width="32" height="32" fill="#9ca3af" /> */}
      </button>
      {isDropdownButtonClicked && (
        <Dropdown
          onClickOutside={onClickOutsideToggle}
          className="right-0 z-[100] mt-1.5 divide-y-1 divide-solid divide-gray-300 rounded-md bg-white"
        >
          <Dropdown.Item
            className="h-10 w-56 rounded-t-md text-sm hover:cursor-pointer hover:bg-gray-50"
            onClick={() => onClickSignIn()}
          >
            로그인
          </Dropdown.Item>
          <Dropdown.Item
            className="h-10 w-56 rounded-b-md text-sm hover:cursor-pointer hover:bg-gray-50"
            onClick={() => onClickSignUp()}
          >
            회원가입
          </Dropdown.Item>
        </Dropdown>
      )}

      {isSignInDialogOpen && (
        <SignInDialog
          setIsDialogOpen={(isDialogOpen) =>
            setIsSignInDialogOpen(isDialogOpen)
          }
        />
      )}
    </div>
  )
}
