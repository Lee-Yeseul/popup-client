'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import MenuIcon from '@/public/assets/icons/menu.svg'
// import AccountIcon from '@/public/assets/icons/account.svg'

import SignInDialog from '../auth/SignInDialog'
import Dropdown from '../common/dropDown'

export default function HeaderMenu() {
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)

  const router = useRouter()

  const onClickSignIn = () => {
    setIsSignInDialogOpen(true)
  }

  const onClickSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Button>
          <MenuIcon width="30" height="30" fill="#6b7280" />
          {/* <AccountIcon width="32" height="32" fill="#9ca3af" /> */}
        </Dropdown.Button>
        <div className="relative">
          <Dropdown.List className="right-0 z-[100] mt-1.5 divide-y-1 divide-solid divide-gray-300 rounded-md bg-white">
            <Dropdown.Item
              className="h-10 w-56 rounded-t-md text-sm hover:cursor-pointer hover:bg-gray-50"
              handleClick={() => onClickSignIn()}
            >
              로그인
            </Dropdown.Item>
            <Dropdown.Item
              className="h-10 w-56 rounded-b-md text-sm hover:cursor-pointer hover:bg-gray-50"
              handleClick={() => onClickSignUp()}
            >
              회원가입
            </Dropdown.Item>
          </Dropdown.List>
        </div>
      </Dropdown>

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
