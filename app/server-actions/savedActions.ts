"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function saveItem(item_id:number , type:string , profile_id:string , revalidate? : string ) : Promise<TError | null>{
    const supabase = createServerActionClient({cookies});
    console.log({type});
    
    switch (type) {
        case "exercise":
            console.log("in case");
            
            const { error } = await supabase
                .from('savedExercises')
                .insert({profile_id,item_id})

            console.log({error});
            
            if(!error)
                revalidatePath(revalidate || "/saved/exercises");
            if(error)
                return {error,message:"שגיאה לא צפויה בשמירת הפריט"};
            break;
    }

    return null ;
    
}

export async function unSaveItem(item_id:number , type:string ,  profile_id:string , revalidate? : string ) {
    const supabase = createServerActionClient({cookies});



    switch (type) {
        case "exercise":
            const {error} = await supabase
                .from("savedExercises")
                .delete()
                .match({
                    item_id,
                    profile_id
                });
    
            if(error)
                return {error,message:"שגיאה לא צפויה בביטול שמירת הפריט"};
    
            if(!error)
                revalidatePath(revalidate || "/saved/exercises");
            break;
    }

    return null;
}