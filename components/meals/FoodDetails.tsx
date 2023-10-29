import ArrowRigthIcon from '@/assets/icons/ArrowRigthIcon'
import React from 'react'

export default function FoodDetails({food , handleGoBack}:{food:any , handleGoBack:()=>void}) {
    
    const translateKey : any = {
        food_energy : "(ק״קל) קלוריות" ,
        carbohydrates : "(גרם) פחמימה ",
        total_fat : "(גרם) שומנים" ,
        protein : "(גרם) חלבון" ,

        total_dietary_fiber : "סיבים (גרם)", // g
        saturated_fat : "(גרם) שומן רווי" , // g
        total_sugars : "(גרם) סוכרים" , //g
        trans_fatty_acids : "(גרם) שומן טראנס" , // g 
        calcium : "(מ״ג) סידן" , //mg
        iron : "(מ״ג) ברזל" ,//mg
        magnesium : "(מ״ג) מגנזיום" ,  //mg
        phosphorus : "(מ״ג) זרחן" , //mg
        potassium : "(מ״ג) אשלגן" , //mg
        sodium : "(מ״ג) נתרן" , //mg
        zinc : "(מ״ג) אבץ" , //mg
        cholesterol : "(מ״ג) כולסטרול" , // mg
    }
  return (
    <div className='h-full w-full flex flex-col text-end p-2 md:px-4 bg-white rounded-md gap-1'>
        <button 
            className='ml-auto mt-1'
            onClick={()=>handleGoBack()}
            ><ArrowRigthIcon classNameStyle='text-background h-6 w-6' />
        </button>
        <p className='text-center text-lg lg:text-xl '>{food.shmmitzrach}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8 gap-x-4  lg:gap-10 lg:text-lg overflow-y-auto p-2  sm:px-8 md:px-2  ">
            {Object.keys(translateKey).map((key) => (
                <div 
                    key={key}
                    className="flex justify-between">
                    <p>{(food[key] / 100 * food.amount ).toFixed(1)}</p>
                    <p className='font-bold'>:{translateKey[key]}</p>
                </div>
            ))}
        </div>
        
    </div>
  )
}
