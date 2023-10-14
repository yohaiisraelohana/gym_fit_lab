
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
    fetchUser: async (userId?:string) : Promise<any[]|TError> => {
        try {
            const session = await supabase.auth.getSession()
            console.log(session);
            
            if(!session.data){
                set({error:{error:null,message:"עדכון משתמש למשתמשים מחוברים בלבד"}})
                return {error:session.error , message:"עדכון משתמש למשתמשים מחוברים בלבד"};
            }
                
            let auth;
            let id;
            if(!userId){
                auth = await supabase.auth.getUser();
                console.log(auth);
                if(!auth.data.user){
                    set({error:{error:null,message:"עדכון משתמש למשתמשים מחוברים בלבד"}})
                    return {error:auth.error , message:"עדכון משתמש למשתמשים מחוברים בלבד"};
                }
                id = auth.data.user.id;
            } else {
                id = userId;
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
    updateUser: async ( updatedUser : TUser) : Promise<TError|string> => {
        const currentUser = userStore.getState().user;
        if(!currentUser){
            set({error:{error:null,message:"עדכון משתמש למשתמשים מחוברים בלבד"}})
            return {error:null , message:"עדכון משתמש למשתמשים מחוברים בלבד"};
        }

        const auth = await supabase.auth.getUser();
        if(!auth.data.user){
            set({error:{error:null,message:"עדכון משתמש למשתמשים מחוברים בלבד"}})
            return {error:auth.error , message:"עדכון משתמש למשתמשים מחוברים בלבד"};
        }

        if(!currentUser.is_trainer && updatedUser.is_trainer )
            await supabase.from("trainer").insert([{}]);
        
        if(!currentUser.is_trainee && updatedUser.is_trainee)
            await supabase.from("trainee").insert([{}]);

        const {data , error} = await supabase
            .from('profile')
            .update(updatedUser)
            .match({id:auth.data.user.id});
        console.log(error);
            
        if(!data){
            set({error:{error:error,message:"נכשל בעדכון המשתמש"}});
            return {error:error,message:"נכשל בעדכון המשתמש"};
        }
        return "המשתמש עודכן בהצלחה";
            
    }  
}))
/*
        const res = await fetch(EDIT_PROFILE,{
          method:"PUT",
          headers:{
              'Content-Type' : "application/json"
          },
          body:JSON.stringify(updatedUser)
        });
        const data = await res.json();
        console.log({data}); 

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body : TUser = await request.json();
    const {data:{user}} = await supabase.auth.getUser();
    

    const { data , error } = await supabase
      .from("profile")
      .select()
      .match({id:user?.id});
    
    console.log({data,body});
    
    if(error){
      console.log({error});
      
      //TODO: Error message
      return ;
    }
    const profile : TUser = data[0];

    if (! profile.is_trainer && body.is_trainer) {
      await supabase.from("trainer").insert([{}]);
    }
    if (! profile.is_trainee && body.is_trainee) {
      await supabase.from("trainer").insert([{}]);
    }
    
    
    await supabase
       .from("profile")
       .update(body)
       .match({id:user?.id});
    
    
    return NextResponse.json({message:"הפרטים נשמרו בהצלחה"}); 
  } catch (error) {
    console.log(error);
    return NextResponse.json({error:error , message:"עדכון המשתמש נכשל"});
  }
*/
