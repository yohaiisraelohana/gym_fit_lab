import Link from "next/link"

export default function page() {
    const savedTypes = [
        {name:"תרגילים",link:"/saved/exercises"},
        {name:"מאמרים",link:"/saved/articles"}
    ]
  return (
    <section className="flex flex-col justify-center items-center w-screen gap-4">
        <h1 className="title">שמורים</h1>
        <div className="w-full   grid grid-cols-2 px-[4vw] gap-[4vw]">
            { 
            savedTypes 
                .map((s) => (
                    <Link 
                        className="h-[44vw]   text text-xl   border rounded-sm    flex justify-center items-center"
                        key={s.name}
                        href={s.link} 
                        >{s.name}
                    </Link>
                ))
            }
        </div>
    </section>
  )
}
