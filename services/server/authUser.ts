import { User, createClient } from "@supabase/supabase-js";
import dot from 'dotenv';
dot.config();


export async function isAuthServer() : Promise<User|null>{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const {data:{user}} = await supabase.auth.getUser();
    return user ? user : null;
};