import BmiCalculator from "../../calculators/BmiCalculator";
import BmrCalculator from "../../calculators/BmrCalculator";

export default function BodyCalculators(
    { body_status_details , gender }:{
        body_status_details:TBodyStatus | null;
        gender : string ;
    }) {
        
  return (
    <section className="w-full flex flex-col justify-center items-center gap-1">
        <h1 className=" w-[300px] text-right text text-xl">מחשבוני גוף</h1>
        {body_status_details 
            ?<BmrCalculator 
                bmr_details={{
                    height_provided:body_status_details.height,
                    weight_provided:body_status_details.weight,
                    age_provided:body_status_details.age,
                    gender_provided:gender,
                    activity_provided:body_status_details.activity
                }} />
            : <div className="h-[75px] w-[300px] bg-white rounded-md flex justify-center items-center px-[20px]">
                <p className="text-black text-center">{"BMR"} {"הזן סטטוס גוף לתצוגת"} </p>
            </div> }

        { body_status_details              
           ? <BmiCalculator height_provided={body_status_details.height} weight_provided={body_status_details.weight} />
           : <div className="h-[240px] w-[300px] bg-white rounded-md flex justify-center items-center px-[20px]">
                <p className="text-black text-center">{"BMI"} {"הזן סטטוס גוף לתצוגת"} </p>
            </div>}
    </section>
  )
}
