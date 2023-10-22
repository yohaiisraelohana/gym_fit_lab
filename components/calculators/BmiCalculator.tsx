'use client'
import React, { useState } from 'react'
import BmiView from './BmiView';

export default function BmiCalculator() {
    const [bmi , setBmi ] = useState<number>(0); 
    const [ weight , setWeight ] = useState<number | null>(null);
    const [ height , setHeight ] = useState<number | null>(null);


    const handleBmiCalc = () => {
        if(!weight || !height) return;
        const h = (height/100) * (height/100);
        setBmi(Math.round(weight/h));
    }
    
    
  return (
    <div className='flex flex-col bg-white p-[20px] gap-4 rounded-md text-background'>
        <div className="w-full flex justify-between text-3xl">
            <h1 className=''>BMI</h1>
            <p className=' text-primary '>{bmi}</p>
        </div>
        
        <BmiView bmi={bmi}/>
        
        <form className="md:mt-6 mt-2 w-[260px] z-10 sm:w-[200px] md:w-[300px] lg:w-[400px]">
            <input 
                type="number"             
                name='weight'
                placeholder='משקל'
                onChange={(e)=>setWeight(Number(e.target.value))} 
                className='border-2 border-background text-end w-[45%] inline mr-[5%] p-1 rounded-sm outline-none' />
            <input 
                type="number" 
                name='height'
                placeholder='גובה'
                onChange={(e)=>setHeight(Number(e.target.value))} 
                className='border-2 border-background text-end w-[45%] inline ml-[5%] p-1 rounded-sm outline-none' />
        </form>



        <button  
                onClick={handleBmiCalc}
                className=' bg-primary   text-background p-1 rounded-sm w-full '>חשב</button>
    </div>
  )
}

    /*
 />
    0 - 18.5
    18.5 - 25
    25 - 30+
 b - 0 - 18 = 18
 g - 18 - 25 = 7
 r - 25 - 45 = 20
    180 / 30 = 6
    180 / 45 = 4
    const bmiLevels = [
        {mr:37,mb:-21,r:-84},
        {mr:36,mb:-19,r:-78},
        {mr:33,mb:-17,r:-72},
        {mr:30,mb:-15,r:-66},
        {mr:27,mb:-13,r:-60},
        {mr:24,mb:-11,r:-54},
        {mr:21,mb:-10,r:-48},
        {mr:19,mb:-9,r:-42},
        {mr:17,mb:-8,r:-36},
        {mr:15,mb:-7,r:-30},
        {mr:12,mb:-6,r:-24},
        {mr:9,mb:-5,r:-18},
        {mr:6,mb:-4,r:-12},
        {mr:3,mb:-4,r:-6},
        {mr:0,mb:-4,r:0},
        {mr:-3,mb:-4,r:6},
        {mr:-6,mb:-4,r:12},
        {mr:-9,mb:-5,r:18},
        {mr:-12,mb:-6,r:24},
        {mr:-15,mb:-7,r:30},
        {mr:-18,mb:-8,r:36},
        {mr:-21,mb:-9,r:42},
        {mr:-24,mb:-10,r:48},
        {mr:-27,mb:-11,r:54},
        {mr:-30,mb:-13,r:60},
        {mr:-33,mb:-15,r:66},
        {mr:-36,mb:-17,r:72},
        {mr:-37,mb:-19,r:78},
        {mr:-37,mb:-21,r:84},
        {mr:-37,mb:-23,r:90},
    ];

    ? get bmi num and double in 6
    */
