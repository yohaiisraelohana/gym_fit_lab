import UploadToSupabaseStorage from "@/components/tests/UploadToSupabaseStorage"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


export default async function page() {
    const supabase = createServerComponentClient({cookies});
    const { data:{user}} = await supabase.auth.getUser();

    if(!user)
        return <></>;

  return (
    <UploadToSupabaseStorage user_id={user.id} />
  )
}
