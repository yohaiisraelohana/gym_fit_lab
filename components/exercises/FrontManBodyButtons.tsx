import React from 'react'

export default function FrontManBodyButtons(
  {selected_body_part , handleBodyPartClick}:{
    selected_body_part:string;
    handleBodyPartClick:(body_part:string)=>void;
  }
  ) {
    const front_body_parts = [
      {className:"ml-9 mt-[37%] lg:ml-12 lg:mt-[38%]",name:"כתפיים"},
      {className:"ml-9 mt-[1%]  lg:ml-12 lg:mt-[3%]",name:"חזה"},
      {className:"ml-9 mt-[1%]  lg:ml-12 lg:mt-[1%]",name:"יד קדמית"},
      {className:"ml-9 mt-[1%]  lg:ml-12 lg:mt-[3%]",name:"בטן"},
      {className:"ml-9 mt-[2%]  lg:ml-12 lg:mt-[2%]",name:"אמות"},
      {className:"ml-9 mt-[10%]  lg:ml-12 lg:mt-[13%]",name:"מקרבי ירך"},
      {className:"ml-9 mt-[3%]  lg:ml-12 lg:mt-[4%]",name:"ארבע ראשי"}
    ]
  return ( 
    <div className="h-[85vh] sm:h-[90vh] flex items-center justify-center max-md:w-screen max-md:bg-gradient-to-t max-md:from-neutral-200 max-md:to-[80%]  lg:ml-[-30px]">
    <div 
        className={
            `flex flex-col items-start text max-w-[100vw] w-[400px] h-[600px]  
            lg:w-[500px] lg:h-[750px]  
            bg-cover bg-left bg-[url("https://res.cloudinary.com/dftounwvk/image/upload/v1697546222/Default_Muscular_man_posing_left_side_look_standing_bit_far_0_798c065a-65af-4228-8c57-14e99498e248_0_a7t0ro.png")]`
        }>
        {front_body_parts.map(body_part => (
          <button
            key={body_part.name}
            className={body_part.className}
            style={selected_body_part == body_part.name ? { textShadow:"white 1px 0 10px"} : {}}
            onClick={()=>handleBodyPartClick(body_part.name)}
            >{body_part.name}
          </button>
        ))}
        {/* <button style={selected_body_part == "כתפיים" ? {color:"black" , textShadow:"white 1px 0 10px"} : {}} className='ml-9 mt-[37%] lg:ml-12  lg:mt-[38%]'>כתפיים</button>
        <button style={selected_body_part == "חזה" ? {border:"var(--primary) solid 1px"} : {}} className='ml-9 mt-[1%]  lg:ml-12 lg:mt-[3%]'>חזה</button>
        <button style={selected_body_part == "" ? {border:"var(--primary) solid 1px"} : {}} className='ml-9 mt-[1%]  lg:ml-12 lg:mt-[1%]'>יד קדמית</button>
        <button style={selected_body_part == "" ? {border:"var(--primary) solid 1px"} : {}} className='ml-9 mt-[1%]  lg:ml-12 lg:mt-[3%]'>בטן</button>
        <button style={selected_body_part == "" ? {border:"var(--primary) solid 1px"} : {}} className='ml-9 mt-[2%]  lg:ml-12 lg:mt-[2%]'>אמות</button>
        <button style={selected_body_part == "" ? {border:"var(--primary) solid 1px"} : {}} className='ml-9 mt-[10%] lg:ml-12 lg:mt-[13%]'>מקרבי ירך</button>
        <button style={selected_body_part == "" ? {border:"var(--primary) solid 1px"} : {}} className='ml-9 mt-[3%]  lg:ml-12 lg:mt-[4%]'>ארבע ראשי</button> */}
    </div>
    </div>

  )
}
//https://res.cloudinary.com/dftounwvk/image/upload/v1697536691/Default_Muscular_man_posing_left_side_look_standing_bit_far_0_798c065a-65af-4228-8c57-14e99498e248_0_pispvh.png
//https://res.cloudinary.com/dftounwvk/image/upload/v1697534565/fullBody2_vgjrb0.jpg