'use client'
import React, { useState } from 'react'

export default function BmrCalculator() {
    const [ bmr , setBmr ] = useState<number>(0);
    const [gender , setGender ] = useState<string>("זכר");
    const [ height , setHeight ] = useState<number>(0);    
    const [ weight , setWeight ] = useState<number>(0);
    const [ age , setAge ] = useState<number>(0);    
    const [ selected , setSelected ] = useState<number>(0);
    const activity = [
        {name:"רמת פעילות",val:1},
        {name:"נמוכה", val:1.2},
        {name:"בינונית", val:1.5},
        {name:"גבוהה" , val:1.9}
    ];

    const handleCalcBmr = () => {
        if(gender == "זכר"){
            setBmr(Math.round((66 + (13.7 * weight) + (5 * height) - (6.8 * age) ) * activity[selected].val));
        } else {
            setBmr(Math.round((655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activity[selected].val));
        }
    }

  return (
    <div className=' bg-white h-full p-[20px] rounded-md w-[300px] z-10 sm:w-[240px] md:w-[340px] lg:w-[440px] flex flex-col justify-between max-md:gap-6 text-background'>
        <div className=" flex justify-between text-3xl">
            <h1 className='text-black'>BMR</h1>
            <p className=' text-primary'>{bmr}</p>
        </div>

        <div className="flex justify-around w-full">
          <div 
            onClick={()=>setGender("זכר")}
            className="flex items-end gap-2">
            <img 
                style={gender == "זכר" ? {border:"var(--primary) 2px solid"} : {}}
                className="h-10 w-10 rounded-full"
                src="https://res.cloudinary.com/dftounwvk/image/upload/v1696176580/9A484DF4-3F00-450E-A67F-42347A12AD26_1_201_a_sa6dyu.jpg" 
                alt="male img" />
            <p className="">זכר</p>
          </div>
          <div 
            onClick={()=>setGender("נקבה")}
            className="flex items-end gap-2">
            <img 
                style={gender == "נקבה" ? {border:"var(--primary) 2px solid"} : {}}
                className="h-10 w-10 rounded-full"
                src="https://res.cloudinary.com/dftounwvk/image/upload/v1696173336/86D20B4B-F732-415E-8427-92A32C389FCF_1_201_a_dnhvvh.jpg" 
                alt="male img" />
            <p className="">נקבה</p>
          </div>
        </div>
        <form className=" grid grid-cols-3 gap-2">
            <input 
                type="number"
                required
                onChange={(e)=>setHeight(Number(e.target.value))}
                className=' border-2 border-background text-end rounded-sm p-1'
                placeholder='גובה' />
            <input 
                required
                type="number"
                onChange={(e)=>setAge(Number(e.target.value))}
                className=' border-2 border-background text-end rounded-sm p-1'
                placeholder='גיל' />
            <input 
                type="number"
                required
                onChange={(e)=>setWeight(Number(e.target.value))}
                className=' border-2 border-background text-end rounded-sm p-1'
                placeholder='משקל' />
        </form>
        
        <select 
            onChange={(e)=>setSelected(Number(e.target.value))}
            className="text-end border border-background  md:hidden rounded-sm  block w-full p-1 ">
            {activity.map((val,ind)=>(
                ind == selected
                ? <option key={ind} value={ind} defaultValue={ind}>{val.name}</option>
                : <option key={ind} value={ind} >{val.name}</option>
            ))}
        </select>
        <select 
            onChange={(e)=>setSelected(Number(e.target.value))}
            multiple  
            className=" max-md:hidden border border-background  text-end rounded-sm focus:ring-[var(--primary)] focus:border-primary block w-full p-1 ">
            {activity.map((val,ind)=>(
                ind == selected
                ? <option key={ind} value={ind} defaultValue={ind}>{val.name}</option>
                : <option key={ind} value={ind} >{val.name}</option>
            ))}
        </select>
        <button 
            onClick={handleCalcBmr} 
            className=' bg-primary   text-background p-1 rounded-sm w-full '>חשב</button>

    </div>
  )
}
