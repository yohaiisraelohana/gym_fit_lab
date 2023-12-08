"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function saveItem(item_id:number , type:string , profile_id:string , revalidate? : string ) : Promise<TError | null>{
    const supabase = createServerActionClient({cookies});
    console.log({type});

    const { error } = await supabase
        .from(type)
        .insert({profile_id,item_id})
    
    console.log({error});
    
    if(!error)
        revalidatePath(revalidate || "/saved");
    if(error)
        return {error,message:"שגיאה לא צפויה בשמירת הפריט"};

    

    return null ;
    
}

export async function unSaveItem(item_id:number , type:string ,  profile_id:string , revalidate? : string ): Promise<TError | null>{
    const supabase = createServerActionClient({cookies});

    const {error} = await supabase
        .from(type)
        .delete()
        .match({
            item_id,
            profile_id
        });
        
    if(error)
        return {error,message:"שגיאה לא צפויה בביטול שמירת הפריט"};
    
    if(!error)
        revalidatePath(revalidate || "/saved");


    return null;
}