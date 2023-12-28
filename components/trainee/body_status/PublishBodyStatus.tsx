import BodyStatusRoadMap from "./BodyStatusRoadMap";

export default function PublishBodyStatus(
    { body_status_list , setChangeData , change_data , trainers_list }:{
        body_status_list : TBodyStatus[] | null;
        change_data : TChange ;
        setChangeData : (c : TChange) => void ;
        trainers_list : TTrainer [] ;
    }) {
        
    
    const handleChange = (bs:TBodyStatus) => {
        if(!change_data.before_id || change_data.after_id){
            setChangeData({
                trainee_id:change_data.trainee_id,
                before_id:bs.id
            })
        } else {
            if(bs.created_at! < (body_status_list ? body_status_list.find((bsd) => bsd?.id == change_data?.before_id)?.created_at! : "")) 
                return alert("תאריך אחרי השינוי לא יכול להיות קטן מהלפני השינוי" );
            if(bs.id == change_data.before_id )
                return setChangeData({ trainee_id:change_data.trainee_id});
            setChangeData({
                trainee_id:change_data.trainee_id,
                before_id:change_data.before_id,
                after_id:bs.id
            })
        }
    }
    
  return (
    <div className="h-[100vw] sm:h-[85vw] md:h-[55vw] lg:h-[43vw] overflow-y-auto w-full bg-white">{
        body_status_list 
        ? change_data.trainer_id 
            ? <div className=" text-background flex flex-col justify-center items-center py-10 gap-2 ">
                <h1 dir="rtl" className="text-xl text-center px-6 ">
                    {" האם ברצונך להוסיף את פרטי המאמן לשינוי ?"}
                </h1>
                <p className="text-center text-sm px-2">{"פעולה זאת תעזור למאמן שלך להגיע לעוד מתאמנים בחר מאמנים שברצונך שיופיעו בשינוי שלך"}</p>
                <div
                    className="h-[200px] w-[80%] border-2 border-primary rounded-sm mt-2 flex flex-col items-center justify-start">
                    {trainers_list.length > 0 
                        ?trainers_list.map((trainer)=>(
                            <p 
                                onClick={()=>
                                    setChangeData({...change_data 
                                        , trainer_id:(
                                            change_data.trainer_id?.includes(trainer.id!)
                                            ? change_data.trainer_id.filter((id) => id != trainer.id)
                                            : [...change_data.trainer_id! , trainer.id!]
                                        )
                                    })}
                                className={
                                change_data.trainer_id?.includes(trainer.id!)
                                ?   "text-lg text-black bg-green/30 border-b"
                                :   "text-lg text-black border-b"
                            }>{trainer.profile?.name}</p>
                        ))
                        : <p className="text-center">לא נמצאו מאמנים בהיסטוריית המאמנים שלך</p> }
                </div>  
            </div>
            : <BodyStatusRoadMap 
                body_status_list={body_status_list}
                change_data={change_data}
                handleClick={(bs:TBodyStatus) =>{ 
                    if(!bs.img_url)
                        return alert("לא ניתן לבחור סטטוסי גוף ללא תמונה");
                    handleChange(bs)
                }} />
        :
        <p className="text-background">
            {"נדרשים לפחות 2 סטטוסי גוף כדי לפרסם שינוי"}
        </p>
    }</div>
  )
}
