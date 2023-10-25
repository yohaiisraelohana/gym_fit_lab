import React, { useEffect, useState } from 'react'
import PaiChart from '../reusefull/PaiChart'

export default function MealChart({meal}:{meal:TMealFood[] | null}) {
  const [ mealTotal , setMealTotal ] = useState<TMealTotal | null>(null);

  const calcMealTotal = () => {
    if (!meal) return;
    setMealTotal({
      crabs:meal.reduce((acc,crr)=>acc + (crr.carbohydrates / 100 * crr.amount) ,0),
      energy:meal.reduce((acc,crr)=>acc + (crr.food_energy / 100 * crr.amount) ,0),
      fat:meal.reduce((acc,crr)=>acc + (crr.total_fat / 100 * crr.amount) ,0),
      protein:meal.reduce((acc,crr)=>acc + (crr.protein / 100 * crr.amount) ,0),
    })
  } 

  useEffect(()=>{
    calcMealTotal(); 
  },[meal]);
  return (
    <div className='h-fit w-fit relative flex items-center justify-center'>
      { mealTotal 
        ? 
          <PaiChart classNameStyle='h-[30vh] w-[30vh] rounded-full bg-green-600' data={[
            {color:"#ef4444" ,val:mealTotal.fat , name:"שומן"},
            {color:"#4ade80" ,val:mealTotal.protein , name:"חלבון"},
            {color:"#38bdf8" ,val:mealTotal.crabs , name:"פחמימה"}
          ]} />
        :
        <PaiChart classNameStyle='h-[30vh] w-[30vh] rounded-full bg-green-600' data={[
          {color:"#ef4444" ,val:1 , name:"שומן"},
          {color:"#4ade80" ,val:1 , name:"חלבון"},
          {color:"#38bdf8" ,val:1 , name:"פחמימה"}
        ]} />
      }
      <div className='text-lg text absolute bg-background h-[130px] w-[130px] mt-[-30px] rounded-full flex flex-col justify-center items-center'>
        <p className=''>קלוריות</p>
        <p className=''>{mealTotal ? mealTotal.energy : 0}</p>
      </div>
    </div>
  )
}
