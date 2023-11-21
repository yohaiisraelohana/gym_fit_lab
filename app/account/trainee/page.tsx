import BmiCalculator from "@/components/calculators/BmiCalculator";
import BmrCalculator from "@/components/calculators/BmrCalculator";
import ServerRouter from "@/components/reusefull/ServerRouter";
import BodyCalculators from "@/components/trainee/body_status/BodyCalculators";
import BodyStatus from "@/components/trainee/body_status/BodyStatus";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page() {
    const supabase = createServerComponentClient({cookies});
    const {data , error} = await supabase.auth.getUser();

    if(error){
      return <ServerRouter redirectPath="/login?error=התחבר כדי לצפות באזור מתאמן שלך" />;
    }
    const {data:traineeData , error:traineeErr} = await supabase
      .from("profile")
      .select()
      .match({id:data.user?.id});

    
    if(traineeErr || traineeData.length <= 0){
      return <ServerRouter redirectPath="/account/trainee/edit" />;
    }

    const trainee :TTrainee = traineeData[0];

    const {data:body_status_data} = await supabase
        .from("body_status")
        .select()
        .match({
            profile_id:data.user.id,
        })
        .order("created_at",{ascending:true});


    
  return (
    <div className="flex flex-col w-screen justify-center items-center gap-8">
        <section className="text-white text-center">
            <h1 className="title">{trainee.name}</h1>
            <p className="text-xl">{"!"} {"בוא נשיג את המטרות שלך"}</p>
        </section>
        <BodyStatus body_status={body_status_data} profile={trainee} />
        <BodyCalculators 
            gender={trainee.gender!}
            body_status_details={body_status_data ? body_status_data[body_status_data.length -1] : null} />
        <section className="bg-white w-[77vw] h-[30vw] flex justify-center items-center">
                <p className="text-black">ערכי תזונה יומיים</p>
        </section>
        <section className="bg-white w-[77vw] h-[30vw] flex justify-center items-center">
                <p className="text-black">גרפים</p>
        </section>
        <section className="bg-white w-[77vw] h-[30vw] flex justify-center items-center">
                <p className="text-black">תוכנית אימון</p>
        </section>
    </div>

  )
}