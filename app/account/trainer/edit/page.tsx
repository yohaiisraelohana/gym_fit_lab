import ServerRouter from "@/components/reusefull/ServerRouter";
import EditTrainer from "@/components/trainers/EditTrainer";
import ServerClient from "@/supabase/ServerClient";


export default async function page() {
    //TODO: try to fetch the teiner if exicst pass to the form
    const supabase = ServerClient();
    const {data:{user}} = await supabase.auth.getUser();
    if(!user){
      return <ServerRouter redirectPath="/login" />;
    }
    
    const {data , error} = await supabase
      .from("trainer")
      .select('*,profile(name)')
      .match({id:user.id});

    const trainer = !data || error ? null : data[0];
    
  return (
    <EditTrainer trainer={trainer}  />
  )
}
