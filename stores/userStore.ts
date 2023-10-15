
import { createClient } from "@supabase/supabase-js";
import { create } from "zustand"

require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
console.log({supabaseApiKey,supabaseUrl});

const supabase = createClient(supabaseUrl,supabaseApiKey );

export const userStore = create<TUserStore>()((set) => ({
    error : null,
    user:null,
    fetchUser: async (id?:string) : Promise<any[]|TError> => {
        try {                
            if(!id){
                set({error:{error:null,message:"עדכון משתמש למשתמשים מחוברים בלבד"}})
                return {error:null , message:"עדכון משתמש למשתמשים מחוברים בלבד"};
            }
            const {data,error} = await supabase
                .from("profile")
                .select()
                .match({id:id});
            if(error) {
                set({error:{ message:`${error.message} ,code:${error.code}` , error }});
                return { message:`${error.message} ,code:${error.code}` , error };
            };

            set({user:data[0],error:null});
            return data;
        } catch (error) {
            console.log(error);
            set({error:{ message:"שגיאה לא צפויה בקבלת המשתמש" , error }});
            return { message:"שגיאה לא צפויה בקבלת המשתמש"  , error };
        }
    },
    updateUser: async ( updatedUser : TUser ) : Promise<TError|string> => {
        const currentUser = userStore.getState().user;
        if(!currentUser){
            set({error:{error:null,message:"עדכון משתמש למשתמשים מחוברים בלבד"}})
            return {error:null , message:"עדכון משתמש למשתמשים מחוברים בלבד"};
        }


        if(!currentUser.is_trainer && updatedUser.is_trainer ){
            const {error} = await supabase
                .from("trainer")
                .insert([{id:currentUser.id}]);

            if(error)
                updatedUser.is_trainer = false;

        }

        
        if(!currentUser.is_trainee && updatedUser.is_trainee ){
            const {error} =  await supabase
                .from("trainee")
                .insert([{id:currentUser.id}]);
            if(error)
                updatedUser.is_trainee = false;
            
        }


        const {data , error} = await supabase
            .from('profile')
            .update(updatedUser)
            .match({id:currentUser.id})
            .select();
            
        if(error){
            set({error:{error:error,message:"נכשל בעדכון המשתמש"}});
            return {error:error,message:"נכשל בעדכון המשתמש"};
        }
        if(data)
            set({user:data[0]});
        
        return "המשתמש עודכן בהצלחה";
            
    }  
}))
