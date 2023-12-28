import ServerRouter from "@/components/reusefull/ServerRouter";
import ServerClient from "@/supabase/ServerClient";
import Link from "next/link";

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
    <div className="">
      <Link 
          href={"/account/trainer/edit"}
          className="title"
          >עריכה
      </Link>
    </div>

  )
}
