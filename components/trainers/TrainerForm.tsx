"use client"
import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { specializes_at_options } from "./specializes_at_options";
import UploadImageButton from "../reusefull/UploadImageButton";
import { EmailIcon, FacebookMessengerIcon, TelegramIcon, WhatsappIcon } from "react-share";

export default function TrainerForm(
    {handleSubmit, trainer , handleSpecializesInputs , handleImageInput , handleBioInput ,handleTraining_sinceInput , contact_options ,setContactOptions}:
    {
        handleSubmit: () => void;
        trainer:TTrainer;
        contact_options:TTrainerContactDetails;
        setContactOptions:Dispatch<SetStateAction<TTrainerContactDetails>>;
        handleSpecializesInputs : (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
        handleImageInput : (e:React.ChangeEvent<HTMLInputElement>) => void;
        handleBioInput : (e:React.ChangeEvent <HTMLTextAreaElement>) => void ;
        handleTraining_sinceInput : (e:React.ChangeEvent<HTMLInputElement>) => void ;
    }) {

      const [current_contact_input , setCurrentContactInput ] = useState<string>(""); 

      const contact_buttons = [{ 
        contact_name:"whatsapp" , 
        icon:<WhatsappIcon size={current_contact_input == "whatsapp" ? 25 : 20} borderRadius={15}/> 
      },
      {
        contact_name:"facebook" , 
        icon:<FacebookMessengerIcon size={current_contact_input == "facebook" ? 25 : 20} borderRadius={15}/> 
      },
      {
        contact_name:"telegram",
        icon:<TelegramIcon size={current_contact_input == "telegram" ? 25 : 20} borderRadius={15}/>
      },
      {
        contact_name:"email",
        icon:<EmailIcon size={current_contact_input == "email" ? 25 : 20} borderRadius={15}/>
      }
    ];


  return (
    <form 
        className="w-[80vw] md:w-[70vw] lg:w-[60vw] flex flex-col justify-start items-center pb-4" >
        <div className="w-full">
          <p className="text w-full text-end text-lg">התמחות</p>
            <div className=" w-full grid grid-cols-3 border border-white rounded-sm p-2  gap-y-1 ">
                {specializes_at_options
                    .map((text)=>(
                        trainer.specializes_at?.includes(text) ?
                        <input 
                            defaultValue={text}
                            key={text}
                            name={text}
                            className="text-center outline-none bg-transparent text-primary cursor-pointer caret-transparent"
                            type='text' 
                            placeholder={text} 
                            onChange={(e)=>e.target.value = e.target.placeholder}
                            onClick={(e)=>handleSpecializesInputs(e)} />
                        :
                        <input 
                            key={text}
                            name={text}
                            className="text-center outline-none bg-transparent text-primary cursor-pointer caret-transparent"
                            type='text' 
                            placeholder={text} 
                            onChange={(e)=>e.target.value = e.target.placeholder}
                            onClick={(e)=>handleSpecializesInputs(e)} />
                    ))
                }
            </div>
        </div>

        <div className="w-full mt-1">
          <p className="text w-full text-end text-lg" >אודות המאמן</p>
          < textarea
            defaultValue={trainer.bio || ""}
            onChange={handleBioInput}
            placeholder=" ספר על עצמך בקצרה לא יותר מ100 תווים"
            className="w-full bg-transparent outline-[var(--primary)] text border border-white rounded-sm text-end py-1 px-2" 
            name="bio"/>
        </div>
        <div className="w-full mt-1 py-2">
          <p className="text w-full text-end text-lg" >יצירת קשר</p>
          <div className="w-full flex gap-[2%]">
                <input
                  disabled={current_contact_input == ""} 
                  className="w-[68%] border border-white bg-transparent text-center text-white" 
                  type="text" 
                  onChange={(e)=>setContactOptions(prev => ({...prev,[current_contact_input]:e.target.value}))}
                  value={contact_options[current_contact_input as keyof TTrainerContactDetails] || ""}
                  placeholder={current_contact_input == "email"
                    ? "הכנס אימייל ליצירת קשר"
                    : current_contact_input == "facebook"
                    ? "הכנס שם משתמש בפייסבוק"
                    : "הכנס מספר פלאפון ליצירת קשר"}
                  name="" 
                  id="" />
                <div className="flex w-[30%] justify-around">
                  {contact_buttons.map(({contact_name , icon},ind)=> (
                    <button
                      type="button"
                      key={ind}
                      style={contact_options[contact_name as keyof TTrainerContactDetails] ? {} : {opacity:0.5}}
                      onClick={()=>setCurrentContactInput(prev=> (prev == contact_name ? "" : contact_name))}
                      >{icon}
                    </button>
                  ))}

                </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-[4vw] w-full">

        
        <div className="w-full max-sm:col-span-2">
          <p className="text w-full text-end text-lg">שנות נסיון</p>
          <input 
              name="training_since"
              onFocus={(e)=>{
                e.target.type = 'date';
                e.target.className = "outline-[var(--primary)]  p-2 text-center rounded-sm border border-white w-full";
              }}
              className="outline-[var(--primary)] bg-transparent  p-2 text-center rounded-sm border border-white w-full"
              placeholder="בחר תאריך שבו התחלת לאמן"
              type="text" 
              onChange={handleTraining_sinceInput} />
        </div>

        <div className="w-full max-w-[80vw] max-sm:mt-1 max-sm:col-span-2 sm:max-w-[38vw] md:max-w-[33vw] lg:max-w-[28vw]">
          <p className="text w-full text-end text-lg mb-2">תמונה להשראה</p>
          <UploadImageButton 
            handleImageInput={handleImageInput}
            text="בחר תמונה" />
        </div>

        </div>

        <button 
            onClick={handleSubmit}
            type="button"
            className="text-lg rounded-md p-1 bg-primary w-full mt-6"
            >שמור
        </button>
    </form>
  )
}



/**
 *    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          
          // Access form data here and send a POST request to the server component
          const formData = new FormData(e.currentTarget);
          
          const arr = specializes_at_options.map((option) => formData.get(option));
          console.log(arr);
          
          const selectedOptions = formData.getAll('selectedOptions[]').join(' , ');
          const serverAction = formData.get('serverAction');
          console.log({selectedOptions,serverAction});
          
          
    }
 */