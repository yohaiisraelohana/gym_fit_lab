import { FormEvent, MouseEvent } from "react";

export default function TrainerFrom({trainer , specializes_at_options , updateSpecializesDetails }:
    {
        trainer:TTrainer;
        specializes_at_options:string[];
        updateSpecializesDetails : (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
    }) {

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          
          // Access form data here and send a POST request to the server component
          const formData = new FormData(e.currentTarget);
          
          const arr = specializes_at_options.map((option) => formData.get(option));
          console.log(arr);
          
          const selectedOptions = formData.getAll('selectedOptions[]').join(' , ');
          const serverAction = formData.get('serverAction');
          console.log({selectedOptions,serverAction});
          
          
    }
  return (
    <form 
        className="w-[80vw] flex flex-col justify-start items-center" 
        onSubmit={handleSubmit}>
            <p className="text w-full text-end">התמחות</p>
            <div className=" w-full grid grid-cols-3 border border-white rounded-sm p-2  gap-y-1 ">
                {specializes_at_options
                    .map((text)=>(
                        <input 
                            key={text}
                            name={text}
                            className="text-center outline-none bg-transparent text-primary cursor-pointer caret-transparent"
                            type='text' 
                            placeholder={text} 
                            onChange={(e)=>e.target.value = e.target.placeholder}
                            onClick={(e)=>updateSpecializesDetails(e)} />
                    ))
                }
            </div>
            <textarea className=" bg-transparent border border-white rounded-sm" name="bio"></textarea>
          <button 
            className="title"
            type="submit">Submit</button>
    </form>
  )
}
