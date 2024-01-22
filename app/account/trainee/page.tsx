import ServerRouter from "@/components/common/ServerRouter";
import BodyCalculators from "@/components/trainee/body_status/BodyCalculators";
import BodyStatus from "@/components/trainee/body_status/BodyStatus";
import ServerClient from "@/supabase/ServerClient";

export default async function page() {
    const supabase = ServerClient();
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
    <div className="
      w-screen flex justify-center items-center
      max-lg:flex-col  max-lg:gap-8
      lg:flex-wrap  lg:gap-x-[3vw] lg:mt-[4vw]
      xl:gap-x-[2vw] xl:mt-[0.5vw] 
      2xl:mt-[1vw]"
      >


        <BodyStatus body_status={body_status_data} profile={trainee} />
        <div className="w-[77vw] lg:w-[20vw] flex flex-col justify-center items-center gap-8 ">
          <section className=" flex flex-col justify-center items-center w-full h-[20vw] ">
                <h3 className="text text-xl w-full text-end px-2 py-1 border-b-2 border-white"> תזונה יומית</h3>
                <div className="text-black h-full  w-full rounded-md">
                </div>
          </section>
          <section className="  flex flex-col justify-center items-center w-full h-[20vw] ">
                <h3 className="text text-xl w-full text-end px-2 py-1 border-b-2 border-white"> תוכניות אימון</h3>
                <div className="text-black h-full  w-full rounded-md">
                </div>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 max-lg:gap-x-4 lg:order-3 lg:grid-cols-1 lg:w-[20vw]">
          <BodyCalculators 
              title={<h3 className="text text-xl w-full text-end px-2 py-1 border-b-2 border-white">מחשבוני גוף</h3>}
              gender={trainee.gender!}
              body_status_details={body_status_data ? body_status_data[body_status_data.length -1] : null} />
          <section className=" 
            w-[77vw] flex flex-col justify-center items-center
            md:w-full
            lg:h-[20vw]
            xl:h-[22vw] ">
                <h3 className="text text-xl w-full text-end px-2 py-1 border-b-2 border-white"> גרפים</h3>
                <div className="text-black h-full  w-full rounded-md">
                </div>
          </section>
        </div>
    </div>

  )
}