import { ReactNode } from "react";
import BmiCalculator from "../../calculators/BmiCalculator";
import BmrCalculator from "../../calculators/BmrCalculator";

export default function BodyCalculators(
    { body_status_details , gender ,title }:{
        body_status_details : TBodyStatus | null;
        gender : string ;
        title? : ReactNode;
    }) {
        
  return (
    <section className="w-full flex flex-col justify-center items-center gap-2">
        {title || <h1 className=" w-[75vw] md:w-[320px] lg:w-[20vw] text-right text text-xl">מחשבוני גוף</h1>}

        <div className="md:hidden ">
        {body_status_details 
            ?<BmrCalculator 
                bmr_style={{height:"75px",width:"78vw"}}
                bmr_details={{
                    height_provided:body_status_details.height,
                    weight_provided:body_status_details.weight,
                    age_provided:body_status_details.age,
                    gender_provided:gender,
                    activity_provided:body_status_details.activity
                }} />
            : <div className="h-[10vw] w-[76vw] bg-white rounded-md flex justify-center items-center px-[20px]">
                <p className="text-black text-center">{"BMR"} {"הזן סטטוס גוף לתצוגת"} </p>
            </div> }
        </div>
        <div className="md:hidden ">
        { body_status_details              
           ? <BmiCalculator  bmi_view_style={{height:"39vw",width:"calc(78vw - 40px)"}} height_provided={body_status_details.height} weight_provided={body_status_details.weight} />
           : <div className="h-[38vw] w-[76vw] bg-white rounded-md flex justify-center items-center px-[20px]">
                <p className="text-black text-center">{"BMI"} {"הזן סטטוס גוף לתצוגת"} </p>
            </div>}
        </div>





        <div className="max-md:hidden lg:hidden">
            {body_status_details 
                ?<BmrCalculator 
                    bmr_style={{width:"43vw",height:"75px"}}
                    bmr_details={{
                        height_provided:body_status_details.height,
                        weight_provided:body_status_details.weight,
                        age_provided:body_status_details.age,
                        gender_provided:gender,
                        activity_provided:body_status_details.activity
                    }} />
                : <div className="h-[10vw] w-[76vw] bg-white rounded-md flex justify-center items-center px-[20px]">
                    <p className="text-black text-center">{"BMR"} {"הזן סטטוס גוף לתצוגת"} </p>
                </div> }
        </div>

        <div className="max-md:hidden lg:hidden">
            { body_status_details              
               ? <BmiCalculator  
                    bmi_view_style={{height:"21vw",width:"calc(43vw - 40px)"}}
                    height_provided={body_status_details.height} weight_provided={body_status_details.weight} />
               : <div className="h-[38vw] w-[76vw] bg-white rounded-md flex justify-center items-center px-[20px]">
                    <p className="text-black text-center">{"BMI"} {"הזן סטטוס גוף לתצוגת"} </p>
                </div>}
        </div>






        <div className="max-lg:hidden ">
            {body_status_details 
                ?<BmrCalculator 
                    bmr_style={{width:"20vw",height:"75px"}}
                    bmr_details={{
                        height_provided:body_status_details.height,
                        weight_provided:body_status_details.weight,
                        age_provided:body_status_details.age,
                        gender_provided:gender,
                        activity_provided:body_status_details.activity
                    }} />
                : <div className="h-[10vw] w-[76vw] bg-white rounded-md flex justify-center items-center px-[20px]">
                    <p className="text-black text-center">{"BMR"} {"הזן סטטוס גוף לתצוגת"} </p>
                </div> }
        </div>

        <div className="max-lg:hidden ">
            { body_status_details              
               ? <BmiCalculator  
                    bmi_view_style={{height:"10vw",width:"calc(20vw - 40px)"}}
                    height_provided={body_status_details.height} weight_provided={body_status_details.weight} />
               : <div className="h-[38vw] w-[76vw] bg-white rounded-md flex justify-center items-center px-[20px]">
                    <p className="text-black text-center">{"BMI"} {"הזן סטטוס גוף לתצוגת"} </p>
                </div>}
        </div>

    </section>
  )
}
