import Banner from '@/components/banner/Banner'
import TrainersPreviewBanner from '@/components/trainers/TrainersPreviewBanner'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ExercisesPrewievBanner from '@/components/exercises/ExercisesPrewievBanner'
import ManBodyButtons from '@/components/exercises/ManBodyButtons'
import Calculators from '@/components/calculators/Calculators'
import PaiChart from '@/components/reusefull/PaiChart'
import CalcMeal from '@/components/meals/CalcMeal'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <Banner/>
      <TrainersPreviewBanner/>
      <ExercisesPrewievBanner/>
      <ManBodyButtons/>
      <Calculators/>
      <CalcMeal/>
      <PaiChart classNameStyle='h-[30vh] w-[30vh] rounded-full bg-green-600' data={[
        {color:"#4287f5" ,val:100 , name:"protein"},
        {color:"#4ef542" ,val:35 , name:"fat"},
        {color:"#f5da42" ,val:70 , name:"carbs"}
    ]} />
    </div>
  )
}
