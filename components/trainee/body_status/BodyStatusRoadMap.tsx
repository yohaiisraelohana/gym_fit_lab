import React from 'react'

export default function BodyStatusRoadMap(
        {change_data , body_status_list , handleClick}:{
            change_data? : TChange;
            body_status_list:TBodyStatus[];
            handleClick : (bs:TBodyStatus) => void;
        }) {
  return (
    <div dir="rtl" className="grid grid-cols-3 bg-white gap-[4vw] p-[4vw] ">
                {/* body_status road */}
                {body_status_list.map((bs)=>(
                    <div
                        onClick={()=>handleClick(bs)}
                        className={"flex flex-col justify-center items-center relative"}
                        >
                            {bs.img_url
                            ? <img 
                                src={bs.img_url} 
                                alt="bs image" className={
                                    (change_data?.before_id == bs.id || change_data?.after_id == bs.id )
                                        ? "h-[25vw] w-full border-2 border-primary"
                                        :"h-[25vw] w-full border-2 border-background"
                                } /> 
                            : <div className="h-[25vw] w-full bg-white border-2 border-background"></div> }
                            {bs.id == change_data?.before_id 
                                && <p className=" absolute bg-white/30 backdrop-blur-sm px-1 z-10 rounded-sm h-fit w-fit text inset-[50%] translate-x-[50%] translate-y-[-70%]">לפני</p> }
                            {bs.id == change_data?.after_id
                                && <p className="absolute bg-white/30 backdrop-blur-sm px-1 z-10 rounded-sm h-fit w-fit text inset-[50%] translate-x-[50%] translate-y-[-70%]">אחרי</p>}
                        <p className="text-background text-sm">{bs.created_at}</p>
                    </div>
                ))}
            </div>
  )
}
