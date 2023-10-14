import { CLOUDINARY_DELETE } from '@/constants/url';
import axios from 'axios'

export async function deleteSingleImageFromCloudinary(public_id:string) : Promise<string|TError> {
    try {
        const res = await axios.delete(CLOUDINARY_DELETE,{
          headers:{
            'Content-Type': 'application/json'
          },
          data:{public_id}
        });
        if(!res.data)
            return {error:res , message:"מחיקת התמונה נכשלה"};
        return "התמונה נמחקה בהצלחה";
      } catch (error) {
        return {error , message:"מחיקת התמונה נכשלה"};
      }
}