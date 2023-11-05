import React, { FormEvent, MouseEvent } from "react";
import { specializes_at_options } from "./specializes_at_options";

export default function TrainerForm({trainer , handleSpecializesInputs , handleImageInput , handleBioInput ,handleTraining_sinceInput}:
    {
        trainer:TTrainer;
        handleSpecializesInputs : (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
        handleImageInput : (e:React.ChangeEvent<HTMLInputElement>) => void;
        handleBioInput : (e:React.ChangeEvent <HTMLTextAreaElement>) => void ;
        handleTraining_sinceInput : (e:React.ChangeEvent<HTMLInputElement>) => void ;
    }) {


  return (
    <form 
        action={"/api/account/trainer"}
        method="post"
        className="w-[80vw] md:w-[70vw] lg:w-[60vw] flex flex-col justify-start items-center " >
        <input type="text" name="id" className="hidden" readOnly defaultValue={trainer.id} />
        <input type="text" name="trainer_current_img" className="hidden" readOnly defaultValue={trainer.trainer_img || ""} />
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
            placeholder="ספר על עצמך בקצרה"
            className="w-full bg-transparent outline-[var(--primary)] text border border-white rounded-sm text-end py-1 px-2" 
            name="bio"/>
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
          <div className=" relative inline-block w-full ">
            <input 
              name="trainer_img"
              onChange={handleImageInput}
              accept="image/*"
              type="file" 
              id="fileInput" 
              style={{display:'none'}} />
            <label htmlFor="fileInput" className="px-[40vw] sm:px-[19vw] md:px-[16.5vw] lg:px-[14vw] z-10 max-w-[80vw] border border-white  p-[10px] rounded-sm cursor-pointer font-bold hover:bg-white/40"></label>
            <p className="text absolute inset-[50%]  translate-x-[-41%] w-[100px] top-0 -z-10 ">בחר תמונה</p>
          </div>
        </div>

        </div>

        <button 
            className="text-lg rounded-md p-1 bg-primary w-full mt-6"
            type="submit"
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