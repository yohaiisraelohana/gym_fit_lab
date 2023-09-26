export default function UserMenu({email}:{email? : string}) {
  return (
    <div className="z-50 bg-background absolute top-16 right-1 text-base list-none text text-end divide-y shadow shadow-white rounded-lg  divide-neutral-500" >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-200">שם משתמש</span>
          <span className="block text-sm truncate text-primary text-start">{email}</span>
        </div>
        <ul className="py-2" >
          {[1,2,3,4].map((i) => (<li key={i}>
            <a href="#" className="block px-4 py-2 text-sm  dark:hover:bg-[var(--primary)] ">חשבון</a>
          </li>))}
        </ul>
    </div>
  )
}
