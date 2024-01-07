import Link from 'next/link';
import { mainMenu } from './menuOptions';

export default function MainMenu() {


  return (
    <div className='flex m-auto gap-3 text-lg  max-md:hidden'>
        {mainMenu.map((menuItem)=>(
            <Link
                href={menuItem.href} 
                key={menuItem.name}
                className='text-hover'
                >{menuItem.name}
            </Link>
        ))}
    </div>
  )
}
