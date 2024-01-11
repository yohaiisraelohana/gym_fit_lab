"use client"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingDumbbells from "../../common/LoadingDumbbells";
import BodyStatusHeader from "./BodyStatusHeader";
import { useRouter } from "next/navigation";
import BodyStatusView from "./BodyStatusView";
import BodyStatusButton from "./BodyStatusButton";

export default function BodyStatus({body_status , profile }:{ body_status : TBodyStatus[] | null; profile : TUser ;}) {
    const supabase = createClientComponentClient();
    const is_body_status : boolean = body_status != null && body_status.length > 0;
    const is_valid_change : boolean = is_body_status && body_status!.length >= 2 ;
    const first_body_status = is_body_status ? body_status![0] : null;
    const [last_body_status , setLastBodyStatus] = useState<TBodyStatus | null>((is_body_status && is_valid_change) ? body_status![body_status!.length -1] : null);
    const current_date = new Date().toISOString().substring(0,10);

    const [shown_details , setShownDetails] = useState<string>("השינוי הנוכחי");
    const [loading , setLoading ] = useState<boolean>(false);
    const [edit_body_status , setEditBodyStatus] = useState<TBodyStatus | null>(null);
    const [change_data , setChangeData ] = useState<TChange>({ trainee_id:profile.id  });
    const [body_status_trainers , setBodyStatusTrainers ] = useState<TTrainer[] >([]);


    const saveBodyStatus = async (body_status_data : TBodyStatus ,  circumferenceForm : TBodycircumference | null ) => {
        setLoading(true);

        const { data } = await supabase
            .from("body_status")
            .upsert({
                img_url:body_status_data.img_url ,  target:body_status_data.target,     activity:body_status_data.activity , 
                age:body_status_data.age,           height:body_status_data.height ,    weight:body_status_data.weight, 
                created_at:current_date ,           profile_id:profile.id,
            },{onConflict:"created_at"})
            .select();
        
        if(data)
            setLastBodyStatus(data[0]);

        if(!circumferenceForm || !data){
            setLoading(false);
            setShownDetails("השינוי הנוכחי");
            return;
        }
       
        await supabase
            .from("circumferences")
            .upsert({
                ...circumferenceForm,
                id:data[0].id
            },{
                onConflict:"id"
            })
            .select();
        
        
        setShownDetails("השינוי הנוכחי");
        setLoading(false);

        const router = useRouter();
        router.push("/account/trainee");
    }    

    const findTrainers = async () => {
        setLoading(true);

        setChangeData({
            ...change_data ,
            trainer_id:[],
        });

        const {data:t_t_data , error:t_t_err} = await supabase
            .from("trainerTrainee")
            .select(`trainer_id`)
            .match({trainee_id:profile.id});
        
        if(!t_t_data || t_t_err || t_t_data.length == 0 )
            return setLoading(false);
        
        const {data:trainers_data , error:trainer_error} =  await supabase
            .from("trainer")
            .select("*,profile(name)")
            .in("id",t_t_data);
        
        if(!trainers_data || trainer_error)
            return setLoading(false) ;

        setBodyStatusTrainers(trainers_data); 
        setLoading(false) ;
    }

    const publishChange = async () => {
        setLoading(true);
        await supabase
            .from("change")
            .upsert(change_data,{onConflict:"trainee_id"});

        setChangeData({ trainee_id:profile.id  });
        setShownDetails("השינוי הנוכחי");
        setLoading(false);
        
    };

  return (
    <section className="flex flex-col   gap-2 w-[77vw] md:w-[85vw] lg:w-[50vw] lg:order-2 rounded-md relative  ">
        {loading && <LoadingDumbbells  />}

        <BodyStatusHeader shown_details={shown_details} setShownDetails={setShownDetails} />

        <BodyStatusView 
            saveBodyStatus={saveBodyStatus}
            handleEditBs={(bs:TBodyStatus)=>{
                setEditBodyStatus(bs);
                setShownDetails("עריכת סטטוס גוף")
            }}
            setChangeData={setChangeData}

            edit_body_status={edit_body_status}
            body_status={body_status}
            body_status_trainers={body_status_trainers}
            change_data={change_data}
            first_body_status={first_body_status}
            last_body_status={last_body_status}
            profile={profile}
            shown_details={shown_details}
            is_body_status={is_body_status}
        />
        
        <BodyStatusButton 
            publishChange={publishChange}
            setShownDetails={setShownDetails}
            findTrainers={findTrainers}
            
            change_data={change_data}
            is_body_status={is_body_status}
            is_valid_change={is_valid_change}
            loading={loading}
        />
    </section>
  )
}
