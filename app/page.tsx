import Banner from '@/components/banner/Banner'
import TrainersPreviewBanner from '@/components/trainers/TrainersPreviewBanner'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ExercisesPrewievBanner from '@/components/exercises/ExercisesPrewievBanner'
import ManBodyButtons from '@/components/exercises/ManBodyButtons'

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
    </div>
  )
}
