import supabase from "@/services/supabaseCreateClient"
import ChangeCard from "./ChangeCard";

export default async function ChangesPreviewBanner() {
    const {data , error} = await supabase
        .from("change")
        .select("*,profile(name , profile_img)")
        .limit(5);

    console.log({data,error});
    
    
  return (
    <div className='min-h-screen h-fit flex flex-col justify-center items-center gap-4 lg:gap-6 pb-8 border-b-2 border-primary w-full bg-gradient-to-b from-background to-neutral-300 from-30%'>
        <div className="w-full flex flex-col justify-center items-center">         
            <img 
                height="auto"
                width="auto"
                className="w-[80vw] sm:w-[60vw] md:w-[37vw] lg:w-[29vw] xl:w-[24vw]"
                alt="change img banner"
                src="https://res.cloudinary.com/dftounwvk/image/upload/v1701101332/artwork_10_dd5t1y.png"  />

            <h1 className="title w-3/4 text-center">תחרות שינויים כל חודש <br/> השתתפו כדי לזכות בפרסים</h1>
        </div>
        <div className="grid grid-flow-col grid-rows-1 w-[90vw] gap-4 overflow-x-auto overflow-y-hidden h-fit">
            {data && 
                data.map((change , i) => (
                    <div key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
                ))}
                        {data && 
                data.map((change , i) => (
                    <div key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
                ))}
        </div>

    </div>
  )
}
