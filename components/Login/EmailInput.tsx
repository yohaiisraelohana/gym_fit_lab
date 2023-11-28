"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function EmailInput() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";
  return (
    <input
          className="rounded-md px-4 py-2 bg-inherit border mb-2 text-end"
          name="email"
          defaultValue={email}
          placeholder="you@example.com"
          required
        />
  )
}
