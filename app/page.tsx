import Banner from '@/components/banner/Banner'
import TrainersPreviewBanner from '@/components/trainers/TrainersPreviewBanner'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import StoreData from './StoreData'
import ExercisesPrewievBanner from '@/components/exercises/ExercisesPrewievBanner'

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
    </div>
  )
}
