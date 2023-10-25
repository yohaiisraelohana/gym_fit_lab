import React from 'react'
import BmiCalculator from './BmiCalculator'
import BmrCalculator from './BmrCalculator'

export default function Calculators() {
  return (
    <div className='border-b-2 border-primary h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-background to-neutral-300'>
        <h1 className='title mb-4'>מחשבונים שימושיים</h1>
        <div className="h-fit flex max-sm:flex-col gap-10">
            <BmiCalculator/>
            <BmrCalculator/>
        </div>
    </div>
  )
}
