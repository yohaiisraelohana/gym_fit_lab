import React from 'react'

export default function CircumferenceForm({handleChange}:{handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void}) {
  return (
    <div className="grid grid-cols-2 w-full gap-x-[6vw] gap-2">
        {[
            { placeholder :"צוואר",name:"neck"},
            { placeholder :"כתפיים",name:"shoulders"},
            { placeholder :"חזה",name:"chest"},
            { placeholder :"מותניים",name:"waist"},
            { placeholder :"יד ימין",name:"right_arm"},
            { placeholder :"יד שמאל",name:"left_arm"},
            { placeholder :"רגל ימין",name:"right_leg"},
            { placeholder :"רגל שמאל",name:"left_leg"}
        ].map((inputOption)=>(
                    <input 
                        key={inputOption.name}
                        className='border border-background text-center'
                        placeholder={inputOption.placeholder}
                        name={inputOption.name}
                        type="number"
                        step="0.01"
                        onChange={handleChange} />
        ))}
    </div>
  )
}
