"use client"
import React, { useState } from 'react'
import Select from '../reusefull/Select'
import { target_options } from './target_options';
import { activity_options } from '../calculators/activityOptions';
import UploadImageButton from '../reusefull/UploadImageButton';
import { uploadSingleImgToCloudinary } from '@/services/cloudinary/uploadImage';
import { validateImageFile } from '@/services/validations/validateInputs';


export default function BodyStatusFrom(
        {saveBodyStatus}:{
            saveBodyStatus:(body_status_data : TBodyStatus ,  circumferenceForm : TBodycircumference | null)=>void
        }) {
    const [selected_target , setSelectedTarget] = useState<number>(0);
    const [selected_activity , setSelectedActivity] = useState<number>(0);
    const [body_status_img , setBodyStatusImage ] = useState<File | null>(null);
    const [body_status_details , setBodyStatusDetails ] = useState<TBodyStatus>(
        { activity:0 , target:target_options[0].name }
    );
    const [form_error , setFormError] = useState<string | null>(null);
    const [is_circumference_form , setIsCircumferenceFrom ] = useState<boolean>(false);
    const [circumference_details , setCircumferenceDetails] = useState<TBodycircumference | null>(null);
    const [preview_img , setPreviewImg] = useState<string | null>(null);

    const handleSaveBodyStatus = async (e:React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        let img_url = null ;
        if(body_status_img){
            const {valid , message} = validateImageFile(body_status_img);
            if(!valid){
                setFormError(message);
                return;
            }
            
            const upload_res = await uploadSingleImgToCloudinary(body_status_img);

            if("secure_url" in upload_res){
                img_url = upload_res.secure_url
            } else if ("message" in upload_res) {
                setFormError(upload_res.message);
                return;
            }
        }
        saveBodyStatus({...body_status_details,img_url},circumference_details);

    }
    
  return (
    <form
        onSubmit={handleSaveBodyStatus}
        className='min-h-[100vw] overflow-y-auto rounded-sm w-full gap-4 py-4 flex flex-col  justify-evenly items-center shadow-md bg-white px-[4vw]' >
        <h1 className='text-xl'>הוסף סטטוס גוף עדכני</h1>
        {preview_img && <img src={preview_img} className='w-full h-[100vw]' alt="previw img" /> }
        {form_error && <h2 className='border border-red-600 text-red-600 text-lg'>{form_error}</h2>}
        <div className="grid grid-cols-3 w-full gap-x-4">
            {[
                {placeholder : "גובה" , name : "height"},
                {placeholder :"גיל" , name : "age"},
                {placeholder : "משקל" , name : "weight"}
            ].map((option)=>(
                    <input 
                        key={option.name} 
                        type="number" 
                        className='w-full border border-background text-center'
                        placeholder={option.placeholder}
                        onChange={(e)=>setBodyStatusDetails(prev => ({...prev , [e.target.name] : e.target.value}))}
                        name={option.name} />
                ))}
        </div>
        <Select 
            select_options={target_options} 
            selected_index={selected_target} 
            handleSelect={(e)=>{
                setSelectedTarget(Number(e.target.value));
                setBodyStatusDetails(prev => ( {...prev , target:target_options[Number(e.target.value)].name } ));
            }}/>
        <Select
            select_options={activity_options
                .map((option , ind ) => {
                    return {name : option.name , value : ind}
                })
            }
            selected_index={selected_activity}
            handleSelect={(e)=>{
                setSelectedActivity(Number(e.target.value));
                setBodyStatusDetails(prev => ( {...prev , activity:Number(e.target.value) } ));
            }}/>

        <UploadImageButton 
            classStyleLable= "px-[49.5%] sm:px-[19vw] md:px-[16.5vw] lg:px-[14vw] z-10 max-w-[80vw] border border-background p-1 rounded-sm cursor-pointer font-bold hover:bg-white/40"
            classStyleText="text-black  absolute inset-[50%]  translate-x-[-30%] w-[100px] top-0 z-10 "
            handleImageInput={(e)=>{
                const file = e.target.files ? e.target.files[0] : null ;
                setBodyStatusImage(file);
                const imageUrl = URL.createObjectURL(file!);
                setPreviewImg(imageUrl);
            }}
            text="בחר תמונה"/>
        {! is_circumference_form && <button 
            onClick={()=>setIsCircumferenceFrom(true)}
            className='text-background border border-background w-full'
            type="button"
            >הוסף היקפים 
        </button>}
        { is_circumference_form &&
            <div className="grid grid-cols-2 w-full gap-x-[6vw] gap-2">
                {[
                    { placeholder :"צוואר",name:"neck"},
                    { placeholder :"כתפיים",name:"shoulders"},
                    { placeholder :"חזה",name:"chest"},
                    { placeholder :"מותניים",name:"waist"},
                    { placeholder :"יד ימין",name:"right_arm"},
                    { placeholder :"יד שמאל",name:"left_arm"},
                    { placeholder :"רגל ימין",name:"right_leg"},
                    { placeholder :"רגל שמאל",name:"left_leg"}
                ].map((inputOption)=>(
                    <input 
                        key={inputOption.name}
                        className='border border-background text-center'
                        placeholder={inputOption.placeholder}
                        name={inputOption.name}
                        type="number"
                        onChange={(e)=>setCircumferenceDetails(prev => prev ? {...prev , [e.target.name]:e.target.value} : {[e.target.name]:e.target.value})} />
                ))}
            </div>
        }
        <button
            className='p-1 shadow-md w-full bg-primary'>
            שמור
        </button>
    </form>
  )
}
