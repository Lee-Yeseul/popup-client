'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import MenuIcon from '@/public/assets/icons/menu.svg'
import SignInDialog from '../auth/SignInDialog'
import Dropdown from '../common/dropDown'
import useUserAction from '@/app/hook/useUserAction'
import { useUserStore } from '@/app/store/userStore'
import Avatar from '../common/Avatar'

export default function HeaderMenu() {
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)
  const { logout } = useUserAction()
  const { profileImageURL, isLogin } = useUserStore()

  const router = useRouter()

  const onClickSignIn = () => {
    setIsSignInDialogOpen(true)
  }

  const onClickSignUp = () => {
    router.push('/sign-up')
  }

  const onClickSetting = () => {
    router.push('/mypage')
  }

  const onClickLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div>
      {isLogin ? (
        <Dropdown>
          <Dropdown.Button>
            <Avatar
              src={profileImageURL}
              alt="profile_avatar"
              width="w-12"
              height="h-12"
            />
          </Dropdown.Button>
          <div className="relative">
            <Dropdown.List className="right-0 z-[100] mt-1.5 divide-y-1 divide-solid divide-gray-300 rounded-md bg-white">
              <Dropdown.Item
                className="h-10 w-56 rounded-t-md text-sm hover:cursor-pointer hover:bg-gray-50"
                handleClick={() => onClickSetting()}
              >
                설정
              </Dropdown.Item>
              <Dropdown.Item
                className="h-10 w-56 rounded-b-md text-sm hover:cursor-pointer hover:bg-gray-50"
                handleClick={() => onClickLogout()}
              >
                로그아웃
              </Dropdown.Item>
            </Dropdown.List>
          </div>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropdown.Button>
            <MenuIcon width="30" height="30" fill="#6b7280" />
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
