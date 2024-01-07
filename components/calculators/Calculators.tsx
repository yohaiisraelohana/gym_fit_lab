import React from 'react'
import BmiCalculator from './BmiCalculator'
import BmrCalculator from './BmrCalculator'

export default function Calculators() {
  return (
    <div className='border-b-2 border-primary h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-20% from-background to-neutral-300'>
        <h1 className='title mb-4 md:mb-6 lg:mb-8'>מחשבונים שימושיים</h1>
        <div className="h-fit flex max-sm:flex-col gap-10 md:gap-[4vw] lg:gap-[6vw]">
            <BmiCalculator/>
            <BmrCalculator/>
        </div>
    </div>
  )
}
