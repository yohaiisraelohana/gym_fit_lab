import React, { Dispatch, SetStateAction } from 'react'
import BodyStatusForm from './BodyStatusForm';
import PublishBodyStatus from './PublishBodyStatus';
import BodyStatusTable from './BodyStatusTable';
import CurrentBodyStatus from './CurrentBodyStatus';

export default function BodyStatusView(
    {   saveBodyStatus , setChangeData , handleEditBs ,  shown_details , change_data , 
        first_body_status ,last_body_status , is_body_status , profile , body_status , edit_body_status , body_status_trainers
    }:{
        shown_details:string;
        saveBodyStatus: (body_status_data : TBodyStatus ,  circumferenceForm : TBodycircumference | null ) => void;
        first_body_status:TBodyStatus | null;
        last_body_status:TBodyStatus | null;
        is_body_status:boolean;
        profile:TUser;
        body_status:TBodyStatus[] | null;
        setChangeData :Dispatch<SetStateAction<TChange>>;
        change_data:TChange;
        edit_body_status:TBodyStatus | null;
        body_status_trainers:TTrainer[];
        handleEditBs : (bs:TBodyStatus)=>void;
    }) { 
        
  return (
    <div className="h-fit  w-full flex flex-col gap-2">
        { shown_details == "הוספת סטטוס גוף"
            && <BodyStatusForm 
                saveBodyStatus={saveBodyStatus} 
                last_body_status={last_body_status}/>}

        { shown_details == "השינוי הנוכחי" 
            && <CurrentBodyStatus 
                is_body_status={is_body_status} 
                profile={profile}
                first_body_status={first_body_status}
                last_body_status={last_body_status} /> }
        
        { shown_details == "רשימת סטטוסי גוף" 
            && <BodyStatusTable 
                handleEdit={handleEditBs}
                body_status_list={body_status} />}

        { shown_details == "עריכת סטטוס גוף"
            && edit_body_status
            && <BodyStatusForm 
                saveBodyStatus={saveBodyStatus}
                last_body_status={edit_body_status}/>}


        { shown_details == "פרסם שינוי" 
            && (<PublishBodyStatus 
                trainers_list={body_status_trainers}
                change_data={change_data}
                setChangeData={setChangeData}
                body_status_list={body_status} />)}
    </div>
  )
}
/*
(bs:TBodyStatus)=>{
                    setEditBodyStatus(bs);
                    setShownDetails("עריכת סטטוס גוף")
                }
*/