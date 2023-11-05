import ServerRouter from "@/components/reusefull/ServerRouter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

//! handle errors
export default async function page() {
    const supabase = createServerComponentClient({cookies});
    const {data , error} = await supabase.auth.getUser();
    console.log({data , error});


    if(error){
      return <ServerRouter redirectPath="/login" />;
    }
    const {data:trainerData , error:trainerErr} = await supabase
      .from("trainer")
      .select()
      .match({id:data.user?.id});

    console.log({trainerData , trainerErr});
    
    if(trainerErr || trainerData.length <= 0){
      return <ServerRouter redirectPath="/account/trainer/edit" />;
    }

    const trainer :TTrainer = trainerData[0];
    console.log("trainer = ",trainer);
    
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
