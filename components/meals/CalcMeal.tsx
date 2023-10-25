'use client'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import MealChart from './MealChart';
import CheckIcon from '@/assets/icons/CheckIcon';
import TrashIcon from '@/assets/icons/TrashIcon';
import EditSquarIcon from '@/assets/icons/EditSquarIcon';
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon';

//! amount mast be more than 0

export default function CalcMeal() {

    const api = "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=30&q=";
    const [ currentFood , setCurrentFood ] = useState<TApiFood | null>(null);
    const [ meal , setMeal ] = useState<TMealFood[] | null>(null);
    const [ searchFoodList , setSearchFoodList ] = useState<TApiFood[] | null>(null);
    const [ amount , setAmount ] = useState<number | null>(null);
    const qRef = useRef<HTMLInputElement | null>(null);

    const getFoods = async () => {
        const q : string = qRef.current?.value || "";
        if(q.length == 0)
            return setSearchFoodList(null);
        
        try {
            /* {
                carbohydrates , 
                total_fat , 
                protein , 
                shmmitzrach , 
                food_energy
            } */
            const {data} = await axios(api + q);
            console.log(data);
            setSearchFoodList(data.result.records);
        } catch (error) {
            console.error(error);
        }
    }



  return (
    <div className='h-screen w-screen flex flex-wrap lg:items-end lg:justify-center  bg-gradient-to-b from-20% from-background to-neutral-300'>
        <h1 className='title max-lg:hidden w-full text-center mt-[50px]'>חישוב ערך תזונתי לארוחה</h1>
        <div className="flex flex-col justify-center gap-5 items-center lg:justify-start  w-full h-full lg:w-[35%] lg:h-[85%]">
            <h1 className='title lg:hidden'>חישוב ערך תזונתי לארוחה</h1>
            <MealChart meal={meal} />
            <input 
                ref={qRef}
                disabled={currentFood != null}
                className='text-end text p-1 px-2 w-[85%] border-2 border-white bg-transparent rounded-sm outline-1 outline-[var(--primary)]'
                placeholder='חפש שם של מוצר'
                type="text"
                onChange={()=>getFoods()}/>


            {/* foodsList / mealTable / amount input */}
            <ul className="h-[40vh] overflow-y-auto w-[85%] bg-white/40 backdrop-blur-sm rounded-md ">
                {/* foodList */}
                {
                    searchFoodList && searchFoodList
                        .map((food,ind)=>
                        (
                            <li 
                                onClick={()=>{
                                    setSearchFoodList(null);
                                    setCurrentFood(food)
                                }}
                                key={ind}
                                className="text-background text-end p-1 px-3 border-b border-background bg-white cursor-pointer "
                                >{food.shmmitzrach}
                            </li>
                        ))
                }
                {/* amount input */}
                {currentFood &&
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
                                    onClick={()=>{
                                        if(!amount) return;
                                        if(meal) {
                                            setMeal([{...currentFood , amount},...meal]);
                                        } else {
                                            setMeal([{...currentFood , amount}]);
                                        }
                                        setCurrentFood(null);
                                        if(qRef != null && qRef.current){
                                            qRef.current.value = "";
                                        };
                                    }}
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
                }
                {/* mealTable */}
                { !searchFoodList && !currentFood &&
                    <div className="flex flex-col justify-start items-center h-full w-full lg:hidden">
                        {
                            meal && meal
                                .map((food,ind)=>(
                                    <div key={ind} className="flex flex-col p-2 border-b border-background w-full bg-white rounded-md">
                                        <div className="flex justify-between w-full items-start">
                                            <div className="flex mt-1">
                                                <TrashIcon classNameStyle={" h-6 w-6 text-red-600"} />
                                                <EditSquarIcon classNameStyle={" h-6 w-6 text-yellow-500"}/>
                                                <DocumentTextIcon classNameStyle={" h-6 w-6 text-blue-600"}/>
                                            </div>
                                            <h2 className='w-[70%] text-end font-bold text-lg'>{food.shmmitzrach}</h2>
                                        </div>
                                        <div className="grid grid-cols-5 text-end ">
                                            <p>שומן</p>
                                            <p>חלבון</p>
                                            <p>פחמימה</p>
                                            <p>קלוריות</p>
                                            <p>כמות</p>
                                            <p className='font-bold'>{(food.total_fat / 100 * food.amount ).toFixed(1)}</p>
                                            <p className='font-bold'>{(food.protein / 100 * food.amount ).toFixed(1)}</p>
                                            <p className='font-bold'>{(food.carbohydrates / 100 * food.amount ).toFixed(1)}</p>
                                            <p className='font-bold'>{(food.food_energy / 100 * food.amount ).toFixed(1)}</p>
                                            <p className='font-bold'>{food.amount}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                }
            </ul>

        </div>
        <div className="max-lg:hidden flex flex-col justify-start items-center overflow-y-auto w-[60%] h-[80%] mb-[1%] bg-white/40 backdrop-blur-sm rounded-sm  ">
            <div className="flex flex-col w-full bg-white ">
                <div className="grid grid-cols-8 w-full text-end font-bold text-lg border-b border-background p-2 ">
                    <p className='border-2 text-center'>עריכה</p>
                    <p className='border-2 text-center'>שומן</p>
                    <p className='border-2 text-center'>חלבון</p>
                    <p className='border-2 text-center'>פחמימה</p>
                    <p className='border-2 text-center'>קלוריות</p>
                    <p className='border-2 col-span-3'>שם</p>
                </div>
                {
                    meal && meal
                        .map((food,ind)=>(
                            <div 
                                key={ind}
                                className="grid grid-cols-8 w-full text-end border-b border-background p-2  h-[70px]">
                                <div className="flex justify-center items-center">
                                    <TrashIcon classNameStyle={" h-5 w-5 text-red-600"} />
                                    <EditSquarIcon classNameStyle={" h-5 w-5 text-yellow-500"}/>
                                    <DocumentTextIcon classNameStyle={" h-5 w-5 text-blue-600"}/>
                                </div>
                                <p className='border-2 justify-center flex items-center'>{food.total_fat}</p>
                                <p className='border-2 justify-center flex items-center'>{food.protein}</p>
                                <p className='border-2 justify-center flex items-center'>{food.carbohydrates}</p>
                                <p className='border-2 justify-center flex items-center'>{food.food_energy}</p>
                                <p className='border-2 col-span-3 flex justify-end items-center'>{food.shmmitzrach}</p>
                            </div>
                        ))
                }
            </div>
        </div>

    </div>
  )
}
