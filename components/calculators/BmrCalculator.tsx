'use client'
import React, { useEffect, useState } from 'react'
import { activity_options } from './activityOptions';
import Select from '../reusefull/Select';

type TBmrDetails = {
    gender_provided?:string;
    height_provided?:number;
    weight_provided?:number;
    age_provided?:number;
    activity_provided?:number;
}

export default function BmrCalculator(
    {bmr_details , bmr_style}:{
        bmr_details?:TBmrDetails;
        bmr_style?:{height:string , width:string};
    }) {

    const [ bmr , setBmr ] = useState<number>(0);
    const [gender , setGender ] = useState<string>("זכר");
    const [ height , setHeight ] = useState<number>(0);    
    const [ weight , setWeight ] = useState<number>(0);
    const [ age , setAge ] = useState<number>(0);    
    const [ selected , setSelected ] = useState<number>(0);
    const [ exist_details , setExistDetails ] = useState<boolean>(false);


    const handleCalcBmr = (bmrD?:TBmrDetails) => {
        let bmrProperties : TBmrDetails = {};
        if(bmrD){
            bmrProperties = bmrD;
        } else {
            bmrProperties = {
                weight_provided : weight,
                height_provided : height,
                age_provided : age,
                activity_provided : selected,
                gender_provided : gender
            }
        }
        if(bmrProperties.gender_provided == "זכר"){
            setBmr(Math.round((66 + (13.7 * bmrProperties.weight_provided!) + (5 * bmrProperties.height_provided!) - (6.8 * bmrProperties.age_provided!) ) * activity_options[bmrProperties.activity_provided!].val));
        } else {
            setBmr(Math.round((655 + (9.6 * bmrProperties.weight_provided!) + (1.8 * bmrProperties.height_provided!) - (4.7 * bmrProperties.age_provided!)) * activity_options[bmrProperties.activity_provided!].val));
        }
    }

    useEffect(()=>{
        if(bmr_details?.activity_provided 
        && bmr_details.age_provided 
        && bmr_details.gender_provided 
        && bmr_details.height_provided
        && bmr_details.weight_provided){
            setExistDetails(true);
            handleCalcBmr(bmr_details)
        }
    },[bmr_details])

  return (
    <div style={{...bmr_style}} className={' shadow-lg bg-white h-full p-[20px] rounded-md w-[300px] z-10 sm:w-[240px] md:w-[340px] lg:w-[440px] flex flex-col justify-between max-md:gap-6 text-background'}>
        <div className=" flex justify-between text-3xl">
            <h1 className='text-black'>BMR</h1>
            <p className=' text-primary'>{bmr}</p>
        </div>
    { !exist_details &&
        <div className="flex justify-around w-full">
          <div 
            onClick={()=>setGender("זכר")}
            className="flex items-end gap-2">
            <img 
                style={gender == "זכר" ? {border:" var(--primary) 3px solid "} : {}}
                className="h-10 w-10 rounded-full"
                src="https://res.cloudinary.com/dftounwvk/image/upload/v1696176580/9A484DF4-3F00-450E-A67F-42347A12AD26_1_201_a_sa6dyu.jpg" 
                alt="male img" />
            <p className="">זכר</p>
          </div>
          <div 
            onClick={()=>setGender("נקבה")}
            className="flex items-end gap-2">
            <img 
                style={gender == "נקבה" ? {border:"var(--primary) 3px solid"} : {}}
                className="h-10 w-10 rounded-full"
                src="https://res.cloudinary.com/dftounwvk/image/upload/v1696173336/86D20B4B-F732-415E-8427-92A32C389FCF_1_201_a_dnhvvh.jpg" 
                alt="male img" />
            <p className="">נקבה</p>
          </div>
        </div>
    }
    {  ! exist_details &&
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
    }
    {!exist_details 
    && <Select 
        select_options={activity_options.map((option , ind) => { return {name:option.name , value:ind} } )} 
        selected_index={selected}
        handleSelect={(e:React.ChangeEvent<HTMLSelectElement>)=>setSelected(Number(e.target.value))} />
    }
    
    {   !exist_details &&
        <button 
            onClick={() => handleCalcBmr()} 
            className=' bg-primary   text-background p-1 rounded-sm w-full '>חשב</button>
    }
    </div>
  )
}
