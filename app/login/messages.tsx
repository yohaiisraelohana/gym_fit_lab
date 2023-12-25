'use client'

import { useSearchParams } from 'next/navigation'

export default function Messages(
  {error ,message}:{
    error?:string | null;
    message?:string | null;
  }
  ) {
  const searchParams = useSearchParams()
  const errorParams = searchParams.get('error')
  const messageParams = searchParams.get('message')
  return (
    <>
      {(errorParams || error) && (
        <p className="mt-4 p-4 bg-neutral-900 border border-red-600 text-neutral-300 text-center">
          {errorParams || error}
        </p>
      )}
      {(messageParams|| message) && (
        <p className="mt-4 p-4 bg-neutral-900 border border-primary text-neutral-300 text-center">
          {messageParams || message}
        </p>
      )}
    </>
  )
}
