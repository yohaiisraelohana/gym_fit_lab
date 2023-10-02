import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Logo from './Logo'
import MainMenu from './MainMenu'
import RigntNavbar from './RigntNavbar'
import { cookies } from 'next/headers'

export default async function NavBar() {
  const supabase = createServerComponentClient({cookies});
  const { data : { user } } = await supabase.auth.getUser();
  let profile : TUser | null = null;

  if(user){
    const {data} = await supabase
      .from("profile")
      .select()
      .match({id:user.id});
    if (data) {
      profile = data[0];
    }
  }
  return (
    <nav className=' w-full flex items-center h-16 px-4 lg:px-8 relative '>
        <Logo/>
        <MainMenu/>
        <RigntNavbar user={profile} />
    </nav>
  )
}
