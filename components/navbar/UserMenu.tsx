import Link from "next/link";
import { userMenuOptions } from "./menuOptions";

export default function UserMenu({email , name ,closeUserMenu}:{
  email? : string; 
  name?:string | null ; 
  closeUserMenu : () => void;
}) {
  return (
    <div className="z-50 bg-background absolute top-16 right-1 text-base list-none text text-end divide-y shadow shadow-white rounded-lg  divide-neutral-500" >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-200">{name || "אורח"}</span>
          <span className="block text-sm truncate text-primary text-start">{email}</span>
        </div>
        <ul className="py-2" >
          {userMenuOptions
            .map((menu) => (<li key={menu.name}>
            <Link 
              onClick={closeUserMenu}
              href={menu.href} 
              className="block px-4 py-2 text-sm  dark:hover:bg-[var(--primary)] ">{menu.name}</Link>
          </li>))}
          <li><form action="/auth/sign-out" method="post">
            <button 
              className="block px-4 py-2 text-sm  dark:hover:bg-[var(--primary)] w-full text-end"
              type='submit'>{"התנתק"}</button>
          </form></li>
        </ul>
    </div>
  )
}
