import Link from "next/link"

export default function page() {
    const savedTypes = [
        {name:"תרגילים",link:"/saved/exercises"},
        {name:"מאמרים",link:"/saved/articles"}
    ]
  return (
    <section className="flex flex-col justify-center items-center w-screen gap-4 md:gap-6">
        <h1 className="title">שמורים</h1>
        <div className="w-full md:w-[80vw] lg:w-[70vw]  grid grid-cols-2 px-[4vw] gap-[4vw] md:gap-[6vw]">
            { 
            savedTypes 
                .map((s) => (
                    <Link 
                        className="h-[44vw]  md:h-[34vw] lg:h-[28vw]  text text-xl   border rounded-sm    flex justify-center items-center"
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
