"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function saveItem(item_id:number , type:string , profile_id:string , revalidate? : string ) : Promise<TError | null>{
    const supabase = createServerActionClient({cookies});

    const { error } = await supabase
        .from('saved')
        .insert({type,profile_id,item_id})
    
    if(revalidate && !error)
        revalidatePath(revalidate);
    if(error)
        return {error,message:"שגיאה לא צפויה בשמירת הפריט"};
    return null ;
    
}

export async function unSaveItem(item_id:number , type:string ,  profile_id:string , revalidate? : string ) {
    const supabase = createServerActionClient({cookies});

    const {error} = await supabase
        .from("saved")
        .delete()
        .match({
            item_id,
            profile_id,
            type
        });

    if(error)
        return {error,message:"שגיאה לא צפויה בביטול שמירת הפריט"};

    if(revalidate && !error)
        revalidatePath(revalidate);
    return null;
}