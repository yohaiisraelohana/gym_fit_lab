import supabase from '@/services/supabaseCreateClient';
import Image from 'next/image';
import FrontManBodyButtons from './FrontManBodyButtons';
import BackManBodyButtons from './BackManBodyButtons';

export default async function ExercisesPrewievBanner() {
    const {data , error} = await supabase
        .from("exercises")
        .select()
        .limit(12);
    
    if(error)
        return <></>;
  return (
    <div className='text mt-2 flex max-md:flex-col items-center gap-2 max-w-[100vw] lg:px-6 xl:pr-10'>
        <div className="flex flex-col items-center justify-center md:mt-[-100px] ">
            <Image 
                height={300}
                width={200}
                className='lg:w-[500px] md:w-[300px]'
                src={"https://res.cloudinary.com/dftounwvk/image/upload/v1697562609/artwork_7_u575pq.png"}
                alt='banner'
            />
            <p className='title w-80 lg:w-[30vw] xl:w-[40vw]  text-center'>{"תרגילים מחולקים לשרירים"}<br/>{"בנה את התוכנית למטרה שלך"}</p>
        </div>
        <div className=" max-[500px]:grid grid-cols-2 gap-[6vw] hidden w-full px-4">
            {data.map((exercise , ind)=> (
                <div 
                    style={{display:(ind < 4 ? 'flex' : 'none')}}
                    key={exercise.id}
                    className="text-center text-black bg-white flex flex-col ">
                    <Image 
                        height={200}
                        width={200}
                        className=' bg-white '
                        src={exercise.gif_url}
                        alt='exercise gif'
                        />
                    <p className='w-full text-lg'>{exercise.name}</p>
                </div>
            ))}
        </div>
        <div className="max-[500px]:hidden grid grid-cols-3 gap-4 md:hidden w-full px-10">
            {data.map((exercise , ind)=> (
                <div 
                    style={{display:(ind < 6 ? 'flex' : 'none')}}
                    key={exercise.id}
                    className="text-center text-black bg-white flex flex-col ">
                    <Image 
                        height={200}
                        width={200}
                        className=' bg-white '
                        src={exercise.gif_url}
                        alt='exercise gif'
                        />
                    <p className='w-full text-lg'>{exercise.name}</p>
                </div>
            ))}
        </div>
        <div className=" md:grid grid-cols-3 gap-4 hidden lg:hidden w-full pr-4 py-10 ">
            {data.map((exercise , ind)=> (
                <div 
                    style={{display:(ind < 9 ? 'flex' : 'none')}}
                    key={exercise.id}
                    className="text-center text-black bg-white flex flex-col ">
                    <img 
                        // height={150}
                        // width={150}
                        className=' bg-white w-[90%]'
                        src={exercise.gif_url}
                        alt='exercise gif'
                        />
                    <p className='w-full text-lg px-2'>{exercise.name}</p>
                </div>
            ))}
        </div>
        <div className=" lg:grid grid-cols-4 gap-4 hidden  py-10 ">
            {data.map((exercise )=> (
                <div 
                    key={exercise.id}
                    className="text-center text-black bg-white flex flex-col ">
                    <img 
                        className=' bg-white w-[90%]'
                        src={exercise.gif_url}
                        alt='exercise gif'
                        />
                    <p className='w-full text-lg px-2'>{exercise.name}</p>
                </div>
            ))}
        </div>


    </div>
  )
}
/*
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
        <div className="flex max-md:flex-col justify-center items-center w-screen md:bg-gradient-to-t md:from-neutral-200 md:to-50%   ">
            <FrontManBodyButtons/>
            <BackManBodyButtons/>
        </div>
*/