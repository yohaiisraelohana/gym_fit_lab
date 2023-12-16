import {  SUPABASE_PUBLIC_STORAGE } from "@/constants/url";
import { SupabaseClient } from "@supabase/supabase-js";
import { convertImageExt } from "../functions/convertImageExt";
import { getImageName } from "../functions/getImageName";

//TODO : use this for avatar and for every were you need unique img
export const uploadUniqueImgToIdFolder = async (user_id:string , bucket_name:string , image : File , supabase:SupabaseClient,old_image?:string) : Promise<TError |  string> => {
    if(!image)
        return {message:"קובץ לא הועלה" , error:null}; 
    let image_to_upload = image;
    let file_extension = image_to_upload.name.split('.').pop();
    if(file_extension !== "jpeg"){
        image_to_upload = await convertImageExt(image_to_upload , "jpeg");
    }
    const {data , error} = await supabase.storage
        .from(bucket_name)
        .upload(`${user_id}/${image_to_upload.name}.jpeg`,image);
    console.log({data , error});

    if(old_image){
        const {data:d , error:e} = await supabase.storage
            .from(bucket_name)
            .remove([`${user_id}/${getImageName(old_image)}`]);
        console.log({d,e});
    }
    return error ? {error , message:"שגיאה בהעלאת התמונה לשרת"} : SUPABASE_PUBLIC_STORAGE + `${bucket_name}/` + data.path;
}   

export const uploadBodyStatusImage = () => {

};