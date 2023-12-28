import Banner from '@/components/banner/Banner'
import TrainersPreviewBanner from '@/components/trainers/TrainersPreviewBanner'
import ExercisesPrewievBanner from '@/components/exercises/ExercisesPrewievBanner'
import ManBodyButtons from '@/components/exercises/ManBodyButtons'
import Calculators from '@/components/calculators/Calculators'
import CalcMeal from '@/components/meals/CalcMeal'
import ChangesPreviewBanner from '@/components/changes/ChangesPreviewBanner'

export const dynamic = 'force-dynamic'

export default function Index() {

  return (
    <div className="w-full flex flex-col items-center">
      <Banner/>
      <TrainersPreviewBanner/>
      <ExercisesPrewievBanner/>
      <ChangesPreviewBanner />
      <ManBodyButtons/>
      <Calculators/>
      <CalcMeal/>
    </div>
  )
}
