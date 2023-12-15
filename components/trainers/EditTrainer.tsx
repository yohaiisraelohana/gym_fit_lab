"use client";
import React, { MouseEvent } from 'react'
import { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import { userStore } from "@/stores/userStore";
import TrainerForm from './TrainerForm';
import { validateImageFile } from '@/services/validations/validateInputs';
import { TRAINER_DEFAULT_IMG } from '@/constants/defaultValues';
import { useRouter } from 'next/navigation';
import { createContactDetailsArray, findContactDetails } from '@/services/functions/findContactDetails';
import {  uploadUniqueImgToIdFolder } from '@/services/upload/uploadImage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isError } from '@/services/functions/isError';
import LoadingDumbbells from '../reusefull/LoadingDumbbells';

export default function EditTrainer({trainer }:{trainer:TTrainer | null }) {
    const {user} = userStore();
    const router = useRouter();
    const [ error , setError ] = useState<TError | null>(null);
    const [ isLoading , setIsLoading ] = useState<boolean>(false);
    const [new_img , setNewImg] = useState<File | null>(null); 
    const [ trainer_form , setTrainerForm ] = useState<TTrainer>({
        id:user?.id,
        bio:null,
        training_since:null,
        trainer_img:TRAINER_DEFAULT_IMG,
        specializes_at:[],
        contact_options:[]
    });
    const [contact_options , setContactOptions] = useState<TTrainerContactDetails>({
        whatsapp:null,
        facebook:null,
        telegram:null,
        email:null
    }) 

    useEffect(()=>{
        if(!user)
            return router.push("/login");
        if(trainer){
            setTrainerForm({...trainer});
            if(trainer.contact_options){
                setContactOptions(findContactDetails(trainer.contact_options));
            }
        }
    },[trainer]);

    const handleUpdateTrainer = async () => {
        setIsLoading(true);
        const supabase = createClientComponentClient();
        let trainer_data : TTrainer = {
            ...trainer_form,
            id:user?.id,
            contact_options : createContactDetailsArray(contact_options)
        };
        delete trainer_data.total_rate;
        delete trainer_data.total_raters;
        delete trainer_data.profile;
        delete trainer_data.trainees_count;
        if(new_img){
            const res = await uploadUniqueImgToIdFolder(user!.id!,"trainersImg",new_img,supabase); //uploadAvatarImage(user!.id!,new_img,supabase);
            console.log(res);
            
            if(isError(res)){
                console.log({res});
                setIsLoading(false)
                return setError(res); 
            };
            trainer_data.trainer_img = res ;
        }

        const { error , data } = await supabase
            .from("trainer")
            .upsert(trainer_data,{onConflict:"id"});
        console.log({data,error});
        
        if(error){
            console.log(error);
            setIsLoading(false);
            return setError({error:error , message:"נכשל בעדכון המאמן"});
        }
        setIsLoading(false);
        router.push("/account/trainer")
    }
     

    const handleSpecializesInputs = (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        if(e.currentTarget.value == e.currentTarget.placeholder){
            setTrainerForm(prev => ({
                ...prev,
                specializes_at:prev.specializes_at?.filter((s)=> s != e.currentTarget.placeholder)
            }));
            e.currentTarget.value = "";
        } else {
            setTrainerForm(prev => ({
                ...prev,
                specializes_at:[...prev.specializes_at! , e.currentTarget.placeholder ]
            }));
            e.currentTarget.value = e.currentTarget.placeholder;
        }
    }

    const handleImageInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        const validImage : TValidation = validateImageFile(file);
        
        if (!validImage.valid) 
          return setError({error:null,message:validImage.message});
        
        setNewImg(file);
        setTrainerForm(prev => ({
            ...prev,
            trainer_img:URL.createObjectURL(file!)
        }))
    }

    const handleBioInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        if(e.target.value.length < 100){
            setTrainerForm(prev => ({
                ...prev,
                bio:e.target.value
            }))
            setError(null);
        } else setError({error:"textArea chars limit" , message:"חרגת ממספר התווים המצויין (100 תווים)"}) 
    }

    const handleTraining_sinceInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const currentDate = new Date();
        const inputDate = new Date(e.target.value);
        if(inputDate > currentDate){
            setError({error:"wrong date",message:"תאריך תחילתך בתור מאמן לא יכול להיות גדול מהיום"});
        } else {
            setTrainerForm(prev => ({
                ...prev ,
                training_since:e.target.value
            }))
        }
    }
    
    
    
  return (
    <div className='flex flex-col w-screen items-center gap-6 relative'>
        <h1 className="title">! מלא את כרטיס המאמן שלך</h1>
        <TrainerCard 
            trainer={{
                ...trainer_form,
                profile:trainer?.profile || {name:"שם המאמן"}
            }} />
        {error && <p className='w-[80vw] md:w-[70vw] lg:w-[60vw] border text-center py-2 border-red-500 text'>{error.message}</p> }
        <TrainerForm  
            handleSubmit={handleUpdateTrainer}
            contact_options={contact_options}
            setContactOptions={setContactOptions}
            trainer={{...trainer}}
            handleSpecializesInputs={handleSpecializesInputs}
            handleImageInput={handleImageInput}
            handleBioInput={handleBioInput}
            handleTraining_sinceInput={handleTraining_sinceInput}
            />
        {isLoading && <LoadingDumbbells/>}
    </div>
  )
}
