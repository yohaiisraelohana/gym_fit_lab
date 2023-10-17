import supabase from '@/services/supabaseCreateClient';
import Image from 'next/image';
import FrontManBodyButtons from './FrontManBodyButtons';
import BackManBodyButtons from './BackManBodyButtons';

export default async function ExercisesPrewievBanner() {
    const {data , error} = await supabase
        .from("exercises")
        .select();
    
    if(error)
        return <></>;
  return (
    <div className='text mt-2 flex flex-col items-center gap-2'>
        <p className='text-xl '>{"מאות תרגילים מחולקים לפי שרירים וציוד מצא את התרגיל המתאים בשבילך"}</p>
        <img 
            className='h-[100px] w-[100px] bg-white rounded-md border border-white'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px]  rounded-md border border-white'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px]  rounded-md bg-gradient-to-b from-slate-300'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px]  rounded-md bg-gradient-to-b from-green-400'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px]  rounded-md bg-gradient-to-b from-green-600 to-white'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px]  rounded-md bg-gradient-to-b from-green-600 to-neutral-200'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px] rounded-md border  border-primary'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697486100/image_ifpfg9.svg" 
            alt="icon" />
        <img 
            className='h-[100px] w-[100px] rounded-md'
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1697485396/backMuscle_oibw8i.jpg" 
            alt="icon" />
        <div className="grid grid-cols-2 gap-4">
            {data.map((exercise)=>(
                <div 
                    key={exercise.id}
                    className="text-center flex flex-col w-[170px]">
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
        <div className="flex max-md:flex-col justify-center items-center w-screen md:bg-gradient-to-t md:from-neutral-200 ">
            <FrontManBodyButtons/>
            <BackManBodyButtons/>
        </div>

    </div>
  )
}
