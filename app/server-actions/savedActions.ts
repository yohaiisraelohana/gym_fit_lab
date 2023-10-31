"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function saveItem(id:number , type:string , user_id:string , revalidate? : string ) : Promise<TError | null>{
    const supabase = createServerActionClient({cookies});

    const { data , error } = await supabase
        .from('saved')
        .insert({type,profile_id:user_id,item_id:id})
        .select();
    
    if(revalidate)
        revalidatePath(revalidate);
    if(error)
        return {error,message:"פעולה למשתמשים מחוברים בלבד"};
    return null ;
    
}