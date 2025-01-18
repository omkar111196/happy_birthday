'use client'

import { useState, useEffect } from 'react'
import BirthdayCelebration from '../components/BirthdayCelebration'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && <BirthdayCelebration />}
    </>
  )
}

