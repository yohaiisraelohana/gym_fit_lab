import {  SUPABASE_PUBLIC_STORAGE } from "@/constants/url";
import { SupabaseClient } from "@supabase/supabase-js";
import { getImageName } from "../functions/getImageName";
import { handleImageExtension } from "../functions/handleImageExtension";


// DELETE IMAGE IN ID FOLDER FROM STORAGE 
export const removeImageFromIdFolder = async (
    image_url:string , 
    user_id:string , 
    bucket_name:string ,  
    supabase:SupabaseClient) : Promise<TError | string> => {

    const { data , error} = await supabase.storage
            .from(bucket_name)
            .remove([`${user_id}/${getImageName(image_url)}`]);

    console.log("removeImageFromIdFolder",{data , error});
    

    return error ?
        {error,message:"שגיאה במחיקת התמונה"}
        : "התמונה נמחקה בהצלחה" ;
}





// UPLOAD IMAGE TO ID FOLDER IN STORAGE
export const uploadUniqueImgToIdFolder = async (
    user_id:string , 
    bucket_name:string , 
    image : File , 
    supabase:SupabaseClient,
    old_image?:string) 
    : Promise<TError |  string> => {

    if(!image)
        return {message:"קובץ לא הועלה" , error:null}; 

    let image_to_upload = await handleImageExtension(image);

    const {data , error} = await supabase.storage
        .from(bucket_name)
        .upload(`${user_id}/${image_to_upload.name}`,image);

    console.log({data , error});

    if(old_image){
        const {data:d , error:e} = await supabase.storage
            .from(bucket_name)
            .remove([`${user_id}/${getImageName(old_image)}`]);
        console.log({d,e});
    }
    return error 
        ? {error , message:"שגיאה בהעלאת התמונה לשרת"} 
        : `${SUPABASE_PUBLIC_STORAGE}${bucket_name}/${data.path}`;
}   


// UPLOAD TO ID FOLDER IN PRIVATE BUCKET OF THE STORAGE
export const uploadToPrivateBucket = async ( 
    user_id : string , 
    bucket_name:string , 
    image : File , 
    supabase:SupabaseClient,
    old_image?:string | null) 
    : Promise<TError |  string> => {

    if(!image) // in case of not provided image
        return {message:"קובץ לא הועלה" , error:null};
    
    let image_to_upload = await handleImageExtension(image);

    const {data , error} = await supabase.storage
        .from(bucket_name)
        .upload(`${user_id}/${image_to_upload.name}`,image);

    console.log("uploadToPrivateBucket",{data,error});
    if(old_image) 
        await removeImageFromIdFolder(old_image,user_id,bucket_name,supabase);

    return error 
        ? {error , message:"שגיאה בהעלאת התמונה לשרת"} 
        : `${SUPABASE_PUBLIC_STORAGE}${bucket_name}/${data.path}`;
    

};