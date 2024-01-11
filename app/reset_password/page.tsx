"use client"
import React, { useState } from 'react'
import Messages from '../login/messages'
import { validatePassword } from '@/services/validations/validateInputs';
import LockIcon from '@/assets/icons/LockIcon';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import LoadingDumbbells from '@/components/common/LoadingDumbbells';

export default function page() {
  const [formError , setFormError ] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const [confirm_password , setConfirmPassword] = useState<string>("");
  const [ isLoading ,  setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    setIsLoading(true);
    // validate the password
    const {valid , message} = validatePassword(password);
    if(!valid){
      setIsLoading(false);
      return setFormError(message);
    }

    // update the password
    const supabase = createClientComponentClient();
    const { error} = await supabase
      .auth
      .updateUser({
        password
      });
    
    if(error){
      setIsLoading(false); 
      return setFormError(error.message);
    }

    setIsLoading(false);
    router.push("/login");
  }

  return (
    <div className="flex flex-col w-full px-8  h-[80vh] justify-center relative">
      {isLoading && <LoadingDumbbells />}
      <form 
        className="flex flex-col w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] text text-end justify-center gap-2 ">
          <>
        <label className="text-lg" htmlFor="password">
          סיסמה
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border  text-end"
          type="password"
          name="password"
          pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$'
          placeholder="••••••••"
          title='הסיסמא חייבת להכיל לפחות 8 תווים ולכלול בתוכה אותיות באנגלית בלבד אות אחת גדולה ומספר אחד לפחות'
          required
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button >
          <LockIcon classNameStyle='h-5 w-5 text mt-[-40px] mb-[30px] ml-2' />
        </button>
        <label className="text-lg" htmlFor="password">
          אימות סיסמה
        </label>
        <input
            style={password == confirm_password ? {} : {borderColor:"red"}}
            className="rounded-md px-4 py-2 bg-inherit border mb-6 text-end outline-none"
            type="password"
            name="confirm_password"
            pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$'
            placeholder="••••••••"
            title='הסיסמא חייבת להכיל לפחות 8 תווים ולכלול בתוכה אותיות באנגלית בלבד אות אחת גדולה ומספר אחד לפחות'
            required
            onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <button >
          <LockIcon classNameStyle='h-5 w-5 text mt-[-64px] mb-[30px] ml-2' />
        </button>
    </>
      <button 
        type="button"
        onClick={()=>handleResetPassword()}
        className="bg-primary rounded px-4 py-2 text-black mb-2">
        אישור
      </button>
      <Messages error={formError}  />
      </form>
    </div>
  )
}
