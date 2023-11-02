"use client";
import React, { MouseEvent } from 'react'
import { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import { userStore } from "@/stores/userStore";
import TrainerFrom from './TrainerFrom';

export default function EditTrainer({trainer}:{trainer:TTrainer | null}) {
    const {user} = userStore();
    const [ training_since , setTraining_since ] = useState<string | null>(null);
    const [ trainer_img , setTrainer_img ] = useState<string | null>(null); 
    const [ bio , setBio ] = useState<string>("");
    const [ specializes_at , setSpecializes_at ] = useState<string[]>([]);

    useEffect(()=>{
        if(trainer){
            setBio(trainer.bio || "");
            setSpecializes_at(trainer.specializes_at || []);
            setTrainer_img(trainer.trainer_img || null);
            setTraining_since(trainer.training_since || null);
        }
    },[trainer]);

    const updateSpecializesDetails = (e:MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        if(e.currentTarget.value == e.currentTarget.placeholder){
            setSpecializes_at([...specializes_at.filter((setSpecializ)=> setSpecializ != e.currentTarget.placeholder)]);            
            e.currentTarget.value = "";
        } else {
            setSpecializes_at([...specializes_at,e.currentTarget.placeholder]);
            e.currentTarget.value = e.currentTarget.placeholder;
        }
    }

    
  return (
    <div className='flex flex-col w-screen items-center gap-10'>
        <h1 className="title">! מלא את כרטיס המאמן שלך</h1>
        <TrainerCard 
            trainer={{
                id:user?.id,
                training_since,
                trainer_img: trainer_img || "https://res.cloudinary.com/dftounwvk/image/upload/v1695709580/3D_Animation_Style_muscular_man_training_shoulder_muscles_0_p460uc.jpg",
                trainees_count : 0 ,
                bio,
                specializes_at,
            }} />
        <TrainerFrom  
            trainer={{
                id:user?.id,
                training_since,
                trainer_img: trainer_img || "https://res.cloudinary.com/dftounwvk/image/upload/v1695709580/3D_Animation_Style_muscular_man_training_shoulder_muscles_0_p460uc.jpg",
                trainees_count : 0 ,
                bio,
                specializes_at,
            }}
            specializes_at_options={["חיטוב הגוף","תזונה נכונה","פיתוח גוף","פאוורליפטינג","מנטורינג","קרוספיט"]}
            updateSpecializesDetails={updateSpecializesDetails}
            />
    </div>
  )
}
