"use client"
import EditIcon from "@/assets/icons/EditIcon";
import TrainerCard from "@/components/trainers/TrainerCard";
import { useRouter } from "next/navigation";

export default function TrainerCardPreview(
    {trainer}:{trainer:TTrainer}
) {
    const  router  = useRouter();
  return (
    <section className="relative ">
        <EditIcon 
            onClick={()=>router.push("/account/trainer/edit")}  
            classNameStyle=" absolute w-8 h-8 p-1 text-primary bg-white/50 rounded-br-md rounded-tl-sm cursor-pointer" />
        <TrainerCard trainer={trainer} />
    </section>
  )
}
