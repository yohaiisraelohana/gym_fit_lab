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
//TODO : use this for avatar and for every were you need unique img
export const uploadImgToIdFolder = async () => {

}

export const uploadBodyStatusImage = () => {

};