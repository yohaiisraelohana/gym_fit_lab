import React from 'react'

export default function BackManBodyButtons(
  {selected_body_part , handleBodyPartClick}:{
    selected_body_part:string;
    handleBodyPartClick:(body_part:string)=>void;
  }
) {
  const back_body_parts = [
    {name:"טרפזים",className:"mr-1 mt-[21%] lg:mt-[22%]"},
    {name:"רחב גבי",className:"mr-1 mt-[3%]  lg:mt-[4%]"},
    {name:"יד אחורית",className:"mr-1 mt-[2%]  lg:mt-[3%]"},
    {name:"כנפיים",className:"mr-1 mt-[2%]  lg:mt-[3%]"},
    {name:"גב תחתון",className:"mr-1 mt-[1%]  lg:mt-[2%]"},
    {name:"ישבן",className:"mr-1 mt-[6%] lg:mt-[7%]"},
    {name:"מרחיקי ירך",className:"mr-1 mt-[8%]  lg:mt-[9%]"},
    {name:"האמסטרינג",className:"mr-1 mt-[1%]  lg:mt-[2%]"},
    {name:"תאומים",className:"mr-1 mt-[14%] lg:mt-[15%]"}
  ]
  return (
    <div className="max-md:bg-gradient-to-t max-md:from-neutral-200 flex justify-center items-center w-screen md:w-[400px] lg:w-[400px] lg:ml-[-30px] h-[90vh]">
    <div 
        className={`
            flex flex-col items-end mt-10 text w-[320px] h-[530px] 
            lg:w-[400px] lg:h-[640px]
            bg-cover bg-right bg-[url("https://res.cloudinary.com/dftounwvk/image/upload/v1697699785/Default_Muscular_man_posing_back_look_standing_bit_far_0_17a12161-3ace-4da6-afb3-50f407c2cd38_0_1_qx7jv1.png")]`}>
        {
          back_body_parts.map(body_part => (
            <button
              key={body_part.name}
              className={body_part.className}
              style={selected_body_part == body_part.name ? { textShadow:"white 1px 0 10px"} : {}}
              onClick={()=>handleBodyPartClick(body_part.name)}
              >{body_part.name}
            </button>
          ))}
        {/* <button className='mr-1 mt-[21%] lg:mt-[22%]'>טרפזים</button>
        <button className='mr-1 mt-[3%]  lg:mt-[4%]'>רחב גבי</button>
        <button className='mr-1 mt-[2%]  lg:mt-[3%]'>יד אחורית</button>
        <button className='mr-1 mt-[2%]  lg:mt-[3%]'>כנפיים</button>
        <button className='mr-1 mt-[1%]  lg:mt-[2%]'>גב תחתון</button>
        <button className='mr-1 mt-[6%] lg:mt-[7%]'>ישבן</button>
        <button className='mr-1 mt-[8%]  lg:mt-[9%]'>מרחיקי ירך</button>
        <button className='mr-1 mt-[1%]  lg:mt-[2%]'>האמסטרינג</button>
        <button className='mr-1 mt-[14%] lg:mt-[15%]'>תאומים</button> */}
    </div>
    </div>

  )
}
