import BannerImage from "./BannerImage";

export default function Banner() {
  return (
    <div className=" relative flex w-screen max-sm:h-[85vh] max-sm:items-end  justify-between bg-gradient-to-bl from-[48%] from-background  to-neutral-300 border-b-2 border-[var(--primary)]">
        <BannerImage/>
        <div dir="rtl" className="
          absolute text-lg text-white text-center md:text-start rounded-sm
          xl:right-[25vw] xl:top-[250px]  
          lg:w-[47vh] lg:right-[20vw] lg:top-[260px]
          md:w-[37vh] md:right-[15vw] md:top-[260px]
          w-[40vh] max-md:left-[50%] max-md:translate-x-[-50%] sm:top-[30px] top-[50px]
          ">

          <h1 className="w-full text-center md:text-start text-3xl md:text-4xl lg:text-6xl text-white ">
            {"GymFit"}<span className="text-primary">{"Lab"}</span>
          </h1>
          
          <h2 className=" text-white/95 text-xl md:text-2xl lg:text-3xl ">
            {"האתר שיספק לך את המעטפת הנדרשת עד לגוף החלומות שלך"}
          </h2>
        </div>
    </div>
  )
}
// div class "bg-gradient-to-tr from-black to-white bg-clip-text"
// p class "text-transparent"
// div
/*
        <div dir="rtl" className=" absolute xl:w-[33vh] xl:right-[400px] xl:top-[120px]  text-lg text-white text-justify rounded-sm">
          <h1 className="w-full text-center text-3xl text-white">
            {"GymFit"}<span className="text-primary">{"Lab"}</span>
          </h1>
          <h2 className="text-white/95 text-xl font-bold">
            {"האתר שיספק לך את כל המעטפת לגוף החלומות שלך"}
          </h2>
          <p className="text-white/70">{"מתאמנים , מאמנים , תתחרויות שינויים , תרגילים ועוד !"}</p>
          <p className="text-white/70">{"בנוסף בנינו עבורכם כלים שימושיים שיעזרו לכם להתמודד עם כל מה שקשור לכושר ותזונה כך שתוכלו להתרכז רק במה שחשוב"}</p>
          
        </div>
*/
