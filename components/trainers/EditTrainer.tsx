"use client";
import React, { MouseEvent } from 'react'
import { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import { userStore } from "@/stores/userStore";
import TrainerForm from './TrainerForm';
import { validateImageFile } from '@/services/validations/validateInputs';
import { TRAINER_DEFAULT_IMG } from '@/constants/defaultValues';

export default function EditTrainer({trainer }:{trainer:TTrainer | null }) {
    const {user} = userStore();
    const [ training_since , setTraining_since ] = useState<string | null>(null);
    const [ trainer_img , setTrainer_img ] = useState<string | null>(null); 
    const [ bio , setBio ] = useState<string | null>(null);
    const [ specializes_at , setSpecializes_at ] = useState<string[]>([]);
    const [ error , setError ] = useState<TError | null>(null);

    useEffect(()=>{
        if(trainer){
            setBio(trainer.bio || "");
            setSpecializes_at(trainer.specializes_at || []);
            setTrainer_img(trainer.trainer_img || null);
            setTraining_since(trainer.training_since || null);
        }
    },[trainer]);
    

    const handleSpecializesInputs = (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        if(e.currentTarget.value == e.currentTarget.placeholder){
            setSpecializes_at([...specializes_at.filter((setSpecializ)=> setSpecializ != e.currentTarget.placeholder)]);            
            e.currentTarget.value = "";
        } else {
            setSpecializes_at([...specializes_at,e.currentTarget.placeholder]);
            e.currentTarget.value = e.currentTarget.placeholder;
        }
    }

    const handleImageInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        const validImage : TValidation = validateImageFile(file);
    
        if (!validImage.valid) 
          //TODO: put the error in the input
          return setError({error:null,message:validImage.message});
        
        const imageUrl = URL.createObjectURL(file!);
        setTrainer_img(imageUrl);
    }

    const handleBioInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        if(e.target.value.length < 100){
            setBio(e.target.value);
            setError(null);
        } else setError({error:"textArea chars limit" , message:"חרגת ממספר התווים המצויין (100 תווים)"}) 
    }

    const handleTraining_sinceInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const currentDate = new Date();
        const inputDate = new Date(e.target.value);
        if(inputDate > currentDate){
            setError({error:"wrong date",message:"תאריך תחילתך בתור מאמן לא יכול להיות גדול מהיום"});
        } else {
            setTraining_since(e.target.value);
        }
    }
    
    
    
  return (
    <div className='flex flex-col w-screen items-center gap-6'>
        <h1 className="title">! מלא את כרטיס המאמן שלך</h1>
        <TrainerCard 
            trainer={{
                id:user?.id,
                training_since,
                trainer_img: trainer_img || TRAINER_DEFAULT_IMG,
                trainees_count : 0 ,
                bio,
                specializes_at,
                profile:trainer?.profile || {name:"שם המאמן"}
            }} />
        {error && <p className='w-[80vw] md:w-[70vw] lg:w-[60vw] border text-center py-2 border-red-500 text'>{error.message}</p> }
        <TrainerForm  
            trainer={{
                id:user?.id,
                training_since,
                trainer_img: trainer?.trainer_img || null,
                trainees_count : 0 ,
                bio,
                specializes_at,
            }}
            handleSpecializesInputs={handleSpecializesInputs}
            handleImageInput={handleImageInput}
            handleBioInput={handleBioInput}
            handleTraining_sinceInput={handleTraining_sinceInput}
            />
    </div>
  )
}
