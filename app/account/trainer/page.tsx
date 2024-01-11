import ServerRouter from "@/components/common/ServerRouter";
import ServerClient from "@/supabase/ServerClient";

export default async function page() {
    const supabase = ServerClient();
    const {data , error} = await supabase.auth.getUser();


    if(error){
      return <ServerRouter redirectPath="/login?error=התחבר כדי לצפות באזור המאמן שלך" />;
    }
    const {data:trainerData , error:trainerErr} = await supabase
      .from("trainer")
      .select()
      .match({id:data.user?.id});

    
    if(trainerErr || trainerData.length <= 0){
      return <ServerRouter redirectPath="/account/trainer/edit" />;
    }

    const trainer :TTrainer = trainerData[0];
    
  return (
      <div className="h-full w-screen flex ">
        <h1 className="m-auto title">עמוד זה בבניה ויהיה מוכן בקרוב</h1>
      </div>
  )
}


