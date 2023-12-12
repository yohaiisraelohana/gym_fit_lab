import { AVATAR_IMG_PATH } from "@/constants/url";
import { SupabaseClient } from "@supabase/supabase-js";

export const uploadAvatarImage = async (user_id:string , image : File , supabase:SupabaseClient ) : Promise<TError |  string> => {
    if(!image)
        return {message:"קובץ לא הועלה" , error:null};
    const file_extension = image.name.split('.').pop();
    const {data , error} = await supabase.storage
        .from("avatars")
        .upload(`${user_id}/${user_id}.${file_extension}`,image,{
            upsert:true
        });

    return error ? {error , message:"שגיאה בהעלאת התמונה לשרת"} : AVATAR_IMG_PATH + data.path;
    
}

export const uploadBodyStatusImage = () => {

};