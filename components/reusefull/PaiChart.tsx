'use client'
import React, { useEffect, useState } from 'react'



export default function PaiChart( { data , classNameStyle } : {data:TPieData[] | null ; classNameStyle : string}) {
    const [pieChart , setPieChart ] = useState<string | null>(null);
    
    const getPie = () => {
        if(!data) return;
        let pie : string = "";
        let sum : number = 0;
        let i = 0;
        let sumVals : number = data.reduce((acc , crr)=>acc + crr.val,0);

        for( i = 0 ; i < data.length - 1 ; i++){
            console.log(sum , " - " , Math.round((data[i].val / sumVals)*100) + sum , " - " , (3.6 * Math.round((data[i].val / sumVals)*100) + sum ) );

            pie += `${data[i].color} ${3.6 * sum}deg ${3.6 * (Math.round((data[i].val / sumVals)*100) + sum)}deg , `;
            sum += Math.round((data[i].val / sumVals)*100);
        }
        pie += `${data[i].color} ${3.6 * sum}deg ${3.6 * (Math.round((data[i].val / sumVals)*100) + sum)}deg `;
        console.log(pie)
        setPieChart(pie);
    }



    useEffect(()=>{
        getPie();
    },[data]);
    

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
        {pieChart &&
            <div 
                className={classNameStyle}
                style={{transition:'all 1s ease-in-out',background:`repeating-conic-gradient(
                from 0deg,
                ${pieChart} )`}}>
            </div>
        }
        { 
        data &&
            <div className="flex gap-4">
               {data.map((d,ind)=>(
                   <div key={ind} className='text flex gap-1 items-center'>
                       <div style={{backgroundColor:d.color}} className='h-3 w-3 rounded-full'></div>
                       <p>{d.val == 1 ? 0 : d.val.toFixed()}</p>
                       <p>{d.name}</p>
                   </div>
               ))}
            </div> 
        }
  </div>
  )
}

