import TraineesChange from "@/components/trainers/trainer_details_page/TraineesChange";
import TrainerDetails from "@/components/trainers/trainer_details_page/TrainerDetails";
import TrainerReviews from "@/components/trainers/trainer_details_page/TrainerReviews";

export default async function Page(
    {params}:{
        params:{
            trainer_id:string;
        }
    }
) {
    const {trainer_id} = params;
    
  return (
    <div className="flex flex-col items-center w-screen pt-2 pb-6 h-screen overflow-y-auto gap-20 ">
        
        <TrainerDetails trainer_id={trainer_id} />
        <TraineesChange trainer_id={trainer_id} />
        <TrainerReviews trainer_id={trainer_id} />
    </div>
  )
}
