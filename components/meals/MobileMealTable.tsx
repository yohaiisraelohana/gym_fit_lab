'use client'
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon'
import EditSquarIcon from '@/assets/icons/EditSquarIcon'
import TrashIcon from '@/assets/icons/TrashIcon'
import axios from 'axios'
import React, { useState } from 'react'
import FoodDetails from './FoodDetails'

export default function MobileMealTable(
        {meal , handleDelete ,handleEdit }:
        {meal:TMealFood[],handleDelete:(ind:number)=>void,handleEdit:(ind:number,food:TMealFood)=>void}) {

        const [ foodDetails , setFoodDetails ] = useState<TApiFoodAllDetails | null >(null);
        const api = "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=1&q="
        const getFoodDetails =async (food:TMealFood) => {
            try {
                const { data } = await axios(api + food.shmmitzrach);
                setFoodDetails({...data.result.records[0],amount:food.amount});
            } catch (error) {   
                console.error(error);
            }
        }

  return (
        <div className="flex flex-col justify-start items-center h-full w-full lg:hidden overflow-y-auto">
            { foodDetails ? 
                <FoodDetails 
                    handleGoBack={()=>setFoodDetails(null)}
                    food={foodDetails} />
                :
                meal
                    .map((food,ind)=>(
                        <div key={ind} className="flex flex-col p-2 border-b border-background w-full bg-white rounded-md">
                            <div className="flex justify-between w-full items-start">
                                <div className="flex mt-1">
                                    <button
                                        onClick={()=>handleDelete(ind)}
                                        ><TrashIcon classNameStyle={" h-6 w-6 text-red-600"} />
                                    </button>
                                    <button
                                        onClick={()=>handleEdit(ind,food)}
                                        ><EditSquarIcon classNameStyle={" h-6 w-6 text-yellow-500"}/>
                                    </button>
                                    <button
                                        onClick={()=>getFoodDetails(food)}
                                        ><DocumentTextIcon classNameStyle={" h-6 w-6 text-blue-600"}/>
                                    </button>
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
  )
}
