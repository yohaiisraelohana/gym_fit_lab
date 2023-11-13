'use client'
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon'
import EditSquarIcon from '@/assets/icons/EditSquarIcon'
import TrashIcon from '@/assets/icons/TrashIcon'
import axios from 'axios'
import React, { useState } from 'react'
import FoodDetails from './FoodDetails'

export default function DesktopMealTable(
        {meal , handleDelete , handleEdit}:
        {meal:TMealFood[] | null , handleDelete:(ind:number)=>void , handleEdit:(ind:number,food:TMealFood)=>void}) {

        const [ foodDetails , setFoodDetails ] = useState<TApiFoodAllDetails | null >(null);
        const api = "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=1&q="
        const getFoodDetails =async (food:TMealFood) => {
            try {
                const { data } = await axios(api + food.shmmitzrach);
                console.log(data);
                setFoodDetails({...data.result.records[0],amount:food.amount});
            } catch (error) {   
                console.error(error);
            }
        }


  return (
    <div className="max-lg:hidden flex flex-col justify-start items-center overflow-y-auto w-[60%] h-[75vh] mb-[1%] bg-white/40 backdrop-blur-sm rounded-sm  ">
        {
            foodDetails ?
            <FoodDetails food={foodDetails} handleGoBack={()=>setFoodDetails(null)} />
            :
            
            <div className="flex flex-col w-full bg-white ">
                <div className="grid grid-cols-9 w-full text-end font-bold text-lg border-b border-background p-2 ">
                    <p className='border-2 text-center'>עריכה</p>
                    <p className='border-2 text-center'>שומן</p>
                    <p className='border-2 text-center'>חלבון</p>
                    <p className='border-2 text-center'>פחמימה</p>
                    <p className='border-2 text-center'>קלוריות</p>
                    <p className='border-2 text-center'>כמות</p>
                    <p className='border-2 col-span-3'>שם</p>
                </div>
            {
                meal && meal
                    .map((food,ind)=>(
                        <div 
                            key={ind}
                            className="grid grid-cols-9 w-full text-end border-b border-background p-2  h-[70px]">
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={()=>handleDelete(ind)}
                                    ><TrashIcon classNameStyle={" h-5 w-5 text-red-600"} />
                                </button>
                                <button
                                    onClick={()=>handleEdit(ind,food)}
                                    ><EditSquarIcon classNameStyle={" h-5 w-5 text-yellow-500"}/>
                                </button>
                                <button
                                    onClick={()=>getFoodDetails(food)}
                                    ><DocumentTextIcon classNameStyle={" h-5 w-5 text-blue-600"}/>
                                </button>
                                
                            </div>
                            <p className='border-2 justify-center flex items-center'>{(food.total_fat / 100 * food.amount ).toFixed(1)}</p>
                            <p className='border-2 justify-center flex items-center'>{(food.protein / 100 * food.amount ).toFixed(1)}</p>
                            <p className='border-2 justify-center flex items-center'>{(food.carbohydrates / 100 * food.amount ).toFixed(1)}</p>
                            <p className='border-2 justify-center flex items-center'>{(food.food_energy / 100 * food.amount ).toFixed(1)}</p>
                            <p className='border-2 justify-center flex items-center'>{food.amount}</p>
                            <p className='border-2 col-span-3 flex justify-end items-center'>{food.shmmitzrach}</p>
                        </div>
                    ))
            }
            </div>
        }
    </div>
  )
}
