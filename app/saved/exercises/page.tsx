import supabase from "@/services/supabaseCreateClient"

export default async function page() {
    const {data , error} = await supabase
        .from("saved")
        .select()
        .match({type:"exercise"});
    console.log("data - ",data);
    if(error)
        return ( <p>Error</p> )
  return (
    <div>{}</div>
  )
}
