import ChangeCard from "@/components/changes/ChangeCard";
import ServerClient from "@/supabase/ServerClient";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = ServerClient();
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
