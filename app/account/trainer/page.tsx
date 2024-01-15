import ServerRouter from "@/components/common/ServerRouter";
import TrainerCardPreview from "@/components/trainers/trainer_account/TrainerCardPreview";
import TrainerTraineesMenagment from "@/components/trainers/trainer_account/TrainerTraineesMenagment";
import ServerClient from "@/supabase/ServerClient";

export default async function page() {
    const supabase = ServerClient();
    const {data , error} = await supabase.auth.getUser();


    if(error){
      return <ServerRouter redirectPath="/login?error=התחבר כדי לצפות באזור המאמן שלך" />;
    }
    const {data:trainerData , error:trainerErr} = await supabase
      .from("trainer")
      .select("*,profile(*)")
      .match({id:data.user?.id});


    if(trainerErr || trainerData.length <= 0){
      return <ServerRouter redirectPath="/account/trainer/edit" />;
    }

    const trainer :TTrainer = trainerData[0];

  return (
      <div className="h-full w-screen flex flex-col justify-center items-center">
      
        {/* TRAINER CARD CONTAINER */}
        <TrainerCardPreview trainer={trainer} />
        
        {/* TRAINER TRAINEES MENAGMENT */}
        <TrainerTraineesMenagment trainer_id={trainer.id!} />
      </div>
  )
}


