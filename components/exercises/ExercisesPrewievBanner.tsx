import supabase from '@/services/supabaseCreateClient';
import Image from 'next/image';
import ExerciseCard from './ExerciseCard';


export default async function ExercisesPrewievBanner() {
    const sRes = await supabase
        .from("exercises")
        .select()
        .limit(12);
    
    const data : TExercise [] | null = sRes.data;
    if(!data || sRes.error)
        return <></>;
  return (
    <div className='text py-2 pb-5 flex max-md:flex-col items-center gap-2 max-w-[100vw] lg:px-6 xl:pr-10 bg-gradient-to-bl from-background to-neutral-300 from-40% border-b-2 border-primary '>

        <div className="flex flex-col items-center justify-center md:mt-[-100px] ">
            <Image 
                height={300}
                width={200}
                className='lg:w-[500px] md:w-[300px] xl:w-[400px]'
                src={"https://res.cloudinary.com/dftounwvk/image/upload/v1697562609/artwork_7_u575pq.png"}
                alt='banner'
            />
            <p className='title w-80 lg:w-[30vw] xl:w-[40vw]  text-center'>{"תרגילים מחולקים לשרירים"}<br/>{"בנה את התוכנית למטרה שלך"}</p>
        </div>

        <div className=" max-[500px]:grid grid-cols-2 gap-[6vw] hidden w-full px-4">
            {data.map((exercise , ind)=> (
                ind < 4 && <ExerciseCard exercise={exercise} key={ind} />
            ))}
        </div>

        <div className="max-[500px]:hidden grid grid-cols-3 gap-4 md:hidden w-full px-10">
            {data.map((exercise , ind)=> (
                ind < 6 && <ExerciseCard exercise={exercise} key={ind} />
            ))}
        </div>

        
        <div className=" md:grid grid-cols-3 gap-4 hidden lg:hidden w-full pr-4 py-10 ">
            {data.map((exercise , ind)=> (
                ind < 9 && <ExerciseCard exercise={exercise} key={ind} />
            ))}
        </div>

        <div className=" lg:grid grid-cols-4 gap-4 hidden  py-10 ">
            {data.map((exercise )=> (
                <ExerciseCard exercise={exercise} key={exercise.id} />
            ))}
        </div>

    </div>
  )
}
