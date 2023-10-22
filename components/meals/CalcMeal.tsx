'use client'
import axios from 'axios';
import React, { useEffect } from 'react'

export default function CalcMeal() {
    
    const api = "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=30&q=";

    const getFoods = async (q:string) => {
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
            
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <input 
            placeholder='חפש שם של מוצר או ברקוד'
            type="text"
            onChange={(e)=>getFoods(e.target.value)}/>
        <input 
            placeholder='כמות'
            type="text" />
    </div>
  )
}
