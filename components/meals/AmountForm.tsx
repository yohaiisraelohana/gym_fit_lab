'use client'
import CheckIcon from '@/assets/icons/CheckIcon';
import React , {useState} from 'react'

export default function AmountForm({currentFood , addFood}:{currentFood:TApiFood , addFood : (amount:number) => void}) {
    const [ amount , setAmount ] = useState<number | null>(null);
  return (
        <div className="flex flex-col items-center justify-evenly px-2 h-full bg-white w-full ">
            <p className='text-background text-center text-xl'>{currentFood.shmmitzrach}</p>
            <div className="flex items-center justify-center bg-background rounded-md">
                <input 
                    onChange={(e)=>setAmount(Number(e.target.value))}
                    placeholder='גרם'
                    className=' border-none bg-transparent text outline-none text-center w-[100px]'
                    type="number"/>
                <button
                    disabled={!amount}
                    onClick={()=>amount && addFood(amount)}
                    ><CheckIcon classNameStyle='h-8 w-8 text-background bg-primary rounded-r-md '/>
                </button>
            </div>
            <div className="w-full flex flex-col">
                <p className='ml-auto'>קלוריות</p>
                <p className='ml-auto text-xl'>{amount && (currentFood.food_energy / 100 * amount).toFixed(1)}</p>
            </div>
            <div className="w-full flex flex-col">
                <p className='ml-auto'>פחמימות</p>
                <p className='ml-auto text-xl'>{amount && (currentFood.carbohydrates / 100 * amount).toFixed(1)}</p>
            </div>
            <div className="w-full flex flex-col">
                <p className='ml-auto'>חלבון</p>
                <p className='ml-auto text-xl'>{amount && (currentFood.protein / 100 * amount).toFixed(1)}</p>
            </div>
            <div className="w-full flex flex-col">
                <p className='ml-auto'>שומן</p>
                <p className='ml-auto text-xl'>{amount && (currentFood.total_fat / 100 * amount).toFixed(1)}</p>
            </div>
        </div>
  )
}
