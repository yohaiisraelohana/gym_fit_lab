
export default function BeforeAndAfterChange(
    {change_show , before_change , is_exist_change , after_change}:{
        change_show:string;
        before_change:TBodyStatus | null;
        is_exist_change:boolean; 
        after_change:TBodyStatus | null;
    }) {
  return (
    <>
        {/* on mobile */}
            {   
            change_show == "לפני"  
            && before_change 
            && <img className='md:hidden h-[94%]  w-full bg-black/30 text text-center' src={before_change.img_url!} alt="before change" /> 
        }
        {
            change_show == "אחרי"
            &&
            (is_exist_change 
                ? (after_change
                    ? <img className='md:hidden h-[94%]  w-full bg-black/30 text text-center' src={after_change.img_url!} alt="תמונת אחרי השינוי" /> 
                    : <div className="md:hidden h-[94%]  w-full bg-white text-background text-center pt-[40%] px-6">{"לא קיימים נתונים לאחרי השינוי , הזן מינימום שני סטטוסי גוף בתאריכים שונים"}</div>)
                : after_change && <img className='md:hidden h-[93%]  w-full bg-black/30 text text-center' src={after_change.img_url!} alt="תמונת אחרי השינוי" /> )
        }


        {/* on desktop */}
        {(change_show == "לפני" || change_show == "אחרי" )    
        &&
        (<div className="w-full flex max-md:hidden h-[94%]">
        {   
            before_change  
            && <img 
                className=" h-full w-1/2 bg-black/30 text text-center" 
                src={before_change.img_url!} 
                alt="before change" /> 
        }
        {
            (is_exist_change 
                ? (after_change
                    ? <img 
                        className=" h-full w-1/2 bg-black/30 text text-center" 
                        src={after_change.img_url!} 
                        alt="תמונת אחרי השינוי" /> 
                    : <div className=" 
                        h-full w-1/2 bg-white text-background text-center pt-[40%] px-6 ">{"לא קיימים נתונים לאחרי השינוי , הזן מינימום שני סטטוסי גוף בתאריכים שונים"}</div>)
                : after_change && 
                    <img 
                        className=" h-full w-1/2 bg-black/30 text text-center" 
                        src={after_change.img_url!} 
                        alt="תמונת אחרי השינוי" /> )
        }
        </div>)
        }
    </>
  )
}
