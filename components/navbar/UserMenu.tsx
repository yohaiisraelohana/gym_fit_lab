import Link from "next/link";
import { userMenuOptions } from "./menuOptions";

export default function UserMenu({user,closeUserMenu}:{
  closeUserMenu : () => void;
  user : TUser;
}) {
  const userMenu = userMenuOptions
    .filter((option)=>{
      if(option.name == "אזור מאמן"){
        return user.is_trainer;
      }else if(option.name == "אזור מתאמן"){
        return user.is_trainee;
      }else return true;
    })
  return (
    <div className="z-50 bg-background absolute top-16 right-1 text-base list-none text text-end divide-y shadow shadow-white rounded-lg  divide-neutral-500" >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-200">{user.name || "אורח"}</span>
          <span className="block text-sm truncate text-primary text-start">{user.email}</span>
        </div>
        <ul className="pt-2" >
          {userMenu
            .map((menu) => (<li key={menu.name}>
            <Link 
              onClick={closeUserMenu}
              href={menu.href} 
              className="block px-4 py-2 text-sm  dark:hover:bg-[var(--primary)] hover:text-black rounded-md ">{menu.name}</Link>
          </li>))}
          <li><form action="/auth/sign-out" method="post">
            <button 
              className="block px-4 py-2 text-sm  dark:hover:bg-[var(--primary)] hover:text-black rounded-md  w-full text-end"
              type='submit'>{"התנתק"}</button>
          </form></li>
        </ul>
    </div>
  )
}
