'use client'
import React , {useState , useEffect} from 'react'
import ProfileImageInput from './ProfileImageInput';
import Link from 'next/link';

export default function ProfileForm(
  {user , hundleSubmit , error}:
  { user:TUser | null ; hundleSubmit : (e:TUser , img:File | null) => void ; error:null | TError}
  ){
    const [ gender , setGender ] = useState<string>("זכר");
    const [ name , setName ] = useState<string | null>(null);
    const [ is_trainer , setIsTrainer ] = useState<boolean>(false);
    const [ is_trainee , setIsTrainee ] = useState<boolean>(false);
    const [ profile_img , setProfile_img ] = useState<string | null>(null);
    const [ new_profile_img , setNewProfileImage ] = useState<File | null>(null);
    useEffect(()=>{
        if(user){
          setGender(prev => user.gender || prev);
          setIsTrainee(prev => user.is_trainee == undefined ? prev : user.is_trainee);
          setIsTrainer(prev => user.is_trainer == undefined ? prev : user.is_trainer);
          setName(prev => user.name || prev);
          setProfile_img(user.profile_img || null);
        }
        console.log(user);
        
    },[user]);

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        hundleSubmit({gender,name,is_trainee,is_trainer,profile_img},new_profile_img);
    }
  return (
    <form 
    onSubmit={onSubmit}
    className="flex flex-col justify-center w-[70vw] items-center gap-6 mt-6 ">
    <ProfileImageInput currentProfileImage={profile_img} setNewProfileImage={(img:File | null)=>setNewProfileImage(img)} />
    <div className="flex justify-around w-full">
      <div 
        onClick={()=>setGender("זכר")}
        className="flex items-end gap-2">
        <img 
            style={gender == "זכר" ? {border:"var(--primary) 1px solid"} : {}}
            className="h-10 w-10 rounded-full"
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1696176580/9A484DF4-3F00-450E-A67F-42347A12AD26_1_201_a_sa6dyu.jpg" 
            alt="male img" />
        <p className="text">זכר</p>
      </div>
      <div 
        onClick={()=>setGender("נקבה")}
        className="flex items-end gap-2">
        <img 
            style={gender == "נקבה" ? {border:"var(--primary) 1px solid"} : {}}
            className="h-10 w-10 rounded-full"
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1696173336/86D20B4B-F732-415E-8427-92A32C389FCF_1_201_a_dnhvvh.jpg" 
            alt="male img" />
        <p className="text">נקבה</p>
      </div>
    </div>

    <input 
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
        value={name || ""}
        className="w-full outline-[var(--primary)] rounded-md border text text-end p-1 bg-transparent mb-2"
        placeholder="שם מלא" />
    
    <button
        style={is_trainer ? {border:"var(--primary) 1px solid"} : {}}
        className="w-full border  rounded-sm p-2 text-end"
        onClick={()=>setIsTrainer(!is_trainer)}
        type='button'
      >
        <h2 className="text-lg ">{"מאמן"}</h2>
        <p className="text-neutral-300">{"סמן אופציה זאת אם בכוונתך לאמן"}</p>
    </button>
    <button
        type='button'
        style={is_trainee ? {border:"var(--primary) 1px solid"} : {}}
        onClick={()=>setIsTrainee(!is_trainee)}
        className="w-full border  rounded-sm p-2 text-end" 
      >
        <h2 className="text-lg">{"מתאמן"}</h2>
        <p className="text-neutral-300">{"סמן אופציה זאת אם בכוונתך להתאמן"}</p>
    </button>
    {error 
      && <div className="w-full border text-center py-2 border-red-500">{error.message}</div> }
    <div className="flex justify-between w-full mt-3">
        <button 
            type='submit'
            className="border p-1 px-3 text border-primary"
            >{"המשך"}
        </button>
        <Link
            href={"/account"}
            className="border p-1 px-3" 
            >{"דלג"}
        </Link>
    </div>

  </form>
  )
}
