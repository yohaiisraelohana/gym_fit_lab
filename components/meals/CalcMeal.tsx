'use client'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import MealChart from './mealChart';
import FoodList from './FoodList';
import AmountForm from './AmountForm';
import MobileMealTable from './MobileMealTable';
import DesktopMealTable from './DesktopMealTable';

export default function CalcMeal() {
    const api = "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=30&q=";
    const [ currentFood , setCurrentFood ] = useState<TApiFood | null>(null);
    const [ meal , setMeal ] = useState<TMealFood[] | null>(null);
    const [ searchFoodList , setSearchFoodList ] = useState<TApiFood[] | null>(null);
    const qRef = useRef<HTMLInputElement | null>(null);

    const getFoods = async () => {
        const q : string = qRef.current?.value || "";
        if(q.length == 0)
            return setSearchFoodList(null);
        
        try {
            const {data} = await axios(api + q);
            setSearchFoodList(data.result.records);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteFood = (ind:number) => {
        setMeal(prev => prev ? prev.filter((food:TMealFood,i)=>i != ind ) : null);
    }

    const editFood = (ind:number , food:TMealFood) => {
        deleteFood(ind);
        setCurrentFood({
            carbohydrates:food.carbohydrates,
            protein:food.protein,
            food_energy:food.food_energy,
            total_fat:food.total_fat,
            shmmitzrach:food.shmmitzrach
        });
    }



  return (
    <div className='h-screen w-screen flex flex-wrap lg:items-end lg:justify-center lg:pb-[1vw]  bg-gradient-to-b from-20% from-background to-neutral-300'>
        <h1 className='title max-lg:hidden w-full text-center mt-[50px] lg:mt-[75px]'>חישוב ערך תזונתי לארוחה</h1>
        <div className="flex flex-col justify-center gap-5  items-center lg:justify-start lg:pb-[1vw] w-full h-full lg:w-[35%] lg:h-[85%]">
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
            <ul className="h-[40vh] w-[85%] bg-white/40  backdrop-blur-sm rounded-md ">
                {   
                    searchFoodList && 
                    <FoodList 
                        searchFoodList={searchFoodList} 
                        handleSelectFood={(food:TApiFood)=>{
                            setSearchFoodList(null);
                            setCurrentFood(food);
                        }} />
                }
                {
                    currentFood &&
                    <AmountForm currentFood={currentFood} addFood={(amount:number)=>{
                            if(!amount || amount <= 0) return;
                            if(meal) {
                                setMeal([{...currentFood , amount},...meal]);
                            } else {
                                setMeal([{...currentFood , amount}]);
                            }
                            setCurrentFood(null);
                            if(qRef != null && qRef.current){
                                qRef.current.value = "";
                            };
                        }} />
                }              
                { 
                    !searchFoodList && 
                    !currentFood &&
                    meal && 
                    <MobileMealTable 
                        handleEdit={(ind:number , food:TMealFood)=>editFood(ind,food)}
                        handleDelete={(ind:number)=>deleteFood(ind)} meal={meal} />
                }
            </ul>
        </div>
        <DesktopMealTable 
            handleEdit={(ind:number , food:TMealFood)=>editFood(ind,food)}
            handleDelete={(ind:number)=>deleteFood(ind)} meal={meal} />
    </div>
  )
}


/*
?EDIT
on click 
set the currentFood to the to the selected one
after that delete the selected and upload the new
*/