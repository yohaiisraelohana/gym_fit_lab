import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";



export async function isAuth () : Promise<User | TError> {
    const supabase = createClientComponentClient();
    const {data , error} = await supabase.auth.getUser();
    if (error) 
        Promise.reject({error:error,message:error.message});
    return Promise.resolve(data.user!);
}


export function isTrainer () {
    
}