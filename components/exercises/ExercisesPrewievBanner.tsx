import supabase from '@/services/supabaseCreateClient';
import Image from 'next/image';

export default async function ExercisesPrewievBanner() {
    const {data , error} = await supabase
        .from("exercises")
        .select();
    
    if(error)
        return <></>;
  return (
    <div className='text mt-2 grid grid-cols-4 gap-4'>
        {data.map((exercise)=>(
            <div 
                key={exercise.id}
                className="text-center flex flex-col w-[200px]">
                <Image 
                    height={200}
                    width={200}
                    className=' bg-white rounded-sm'
                    src={exercise.gif_url}
                    alt='exercise gif'
                    />
                <p className='w-full'>{exercise.name}</p>
            </div>
        ))}
    </div>
  )
}
