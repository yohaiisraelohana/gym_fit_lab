import supabase from "@/services/supabaseCreateClient"
import TrainerCard from "./TrainerCard";

export default async function TrainersPreviewBanner() { 
  const {data , error} = await supabase
    .from("trainer")
    .select('*,profile(name)')
    .limit(10);
  
  return (
    <div className="w-screen flex bg-gradient-to-b from-background to-neutral-300 from-20%  flex-col border-b-2 border-primary">
        <img 
          src="https://res.cloudinary.com/dftounwvk/image/upload/v1695554493/artwork_3_gftskp.png" 
          alt="trainer image "
          className=" m-auto h-[400px]" />
        <p className="title m-auto "> ! מאות מאמנים מנוסים </p>
        <p className="title text-xl m-auto "> מצא את המאמן המתאים בשבילך </p>

        <div className=" m-auto w-[90vw] overflow-x-auto">
          <div className="w-fit overflow-x-scroll flex mt-5 mb-8 gap-5">
            {data && data.map((triner,ind)=>(
              <TrainerCard trainer={triner} key={ind} />
            ))}
          </div>
        </div>
    </div>
  )
}
