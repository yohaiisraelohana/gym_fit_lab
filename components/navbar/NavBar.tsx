import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from './Logo'
import MainMenu from './MainMenu'
import RigntNavbar from './RigntNavbar'
import { cookies } from 'next/headers'

export default async function NavBar() {
  const supabase = createServerComponentClient({cookies});
  const { data : { user } } = await supabase.auth.getUser();

  return (
    <nav className=' w-full flex items-center h-16 px-4 lg:px-8 relative '>
        <Logo/>
        <MainMenu/>
        <RigntNavbar user={user} />
    </nav>
  )
}
