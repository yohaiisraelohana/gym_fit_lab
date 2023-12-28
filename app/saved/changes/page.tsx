import ChangeCard from "@/components/changes/ChangeCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = createServerComponentClient({cookies});
    const { data: { user } } = await supabase.auth.getUser();
    if(!user)
        redirect("/");
    const {data } = await supabase.rpc("get_saved_changes",{profile_id:user.id});
        
    //get_saved_changes
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:px-4 gap-4">
        {data && data.map((change:TChange) => (<ChangeCard change={change} />))}
    </div>
  )
}
