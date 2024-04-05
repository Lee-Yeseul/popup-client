'use client'

import Script from 'next/script'
import SignInDialog from '@/app/component/auth/SignInDialog'
import { useState } from 'react'

export default function AuthPage() {
  const [isOpenSignInDialog, setIsOpenSignInDialog] = useState(false)
  return (
    <>
      <Script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e657289067a8de5b5e1241001a93795f"
      ></Script>
      <div>auth for kakao</div>

      <button
        onClick={() => {
          setIsOpenSignInDialog(true)
        }}
      >
        오픈
      </button>
      {isOpenSignInDialog && (
        <SignInDialog
          setIsDialogOpen={(isDialogOpen) =>
            setIsOpenSignInDialog(isDialogOpen)
          }
        />
      )}
    </>
  )
}
