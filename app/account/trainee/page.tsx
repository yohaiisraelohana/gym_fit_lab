import BmiCalculator from "@/components/calculators/BmiCalculator";
import BmrCalculator from "@/components/calculators/BmrCalculator";
import ServerRouter from "@/components/reusefull/ServerRouter";
import BodyStatus from "@/components/trainee/BodyStatus";
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
      .select("name , gender , id")
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
        });


    
  return (
    <div className="flex flex-col w-screen justify-center items-center gap-8">
        <section className="text-white text-center">
            <h1 className="title">{trainee.name}</h1>
            <p className="text-xl">{"!"} {"בוא נשיג את המטרות שלך"}</p>
        </section>
        <BodyStatus body_status={body_status_data} profile_id={data.user.id} />
        <section className="w-full flex flex-col justify-center items-center gap-1">
            <BmrCalculator 
                bmr_details={{
                    height_provided:170,
                    weight_provided:70,
                    age_provided:21,
                    gender_provided:"זכר",
                    activity_provided:1
                }} />
            <BmiCalculator height_provided={170} weight_provided={70} />
        </section>
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