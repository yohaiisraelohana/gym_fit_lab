import ExercisesPage from "@/components/exercises/ExercisesPage";
import supabase from "@/services/supabaseCreateClient";

export default async function page() {
  const { data } = await supabase
    .from("exercises")
    .select()
    .limit(20);

  if(!data)
    return <h1>תרגילים לא נמצאו</h1>

  const exercises : TExercise[] = data;

  return (  <ExercisesPage exercises_first_list={exercises} />  )
}
