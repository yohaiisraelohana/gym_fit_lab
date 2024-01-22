"use client"
import ArrowUpDownIcon from "@/assets/icons/ArrowUpDownIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import { useState } from "react";


export default function TrainerTraineesPrograms(
    {first_trainees_list}:{
        first_trainees_list:TTrainerTraineeProgram[];
    }){
    const [trainees_list,setTraineesList] = useState<TTrainerTraineeProgram[]>(first_trainees_list);
    return (
        <div className="w-full px-[10vw] text">
            <div className="flex w-full justify-between border-b-2 border-white">
                <div className="flex justify-center items-center gap-2 px-1 ">
                    {trainees_list.length}
                    <FilterIcon classNameStyle="h-5 w-5 cursor-pointer" />
                    <ArrowUpDownIcon classNameStyle="h-5 w-5 cursor-pointer" />
                </div>
                <h1 className="title">רשימת מתאמנים</h1>
            </div>
        </div>
    )
}