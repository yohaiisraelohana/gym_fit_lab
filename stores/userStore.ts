import { createClient } from "@supabase/supabase-js";
import { create } from "zustand"

require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const sepabase = createClient(supabaseUrl,supabaseApiKey );

export const userStore = create<TUserStore>()((set) => ({
    error : null,
    user:null,
    fetchUser: async (auth:any) => {
        try {
            const {data,error} = await sepabase
                .from("profile")
                .select()
                .match({id:auth.id});
            if(error) {
                set({error:{ message:`${error.message} ,code:${error.code}` , error }});
                return;
            };

            set({user:data[0],error:null});
        } catch (error) {
            console.log(error);
            set({error:{ message:"שגיאה לא צפויה בקבלת המשתמש" , error }});
        }
    },
}))
