import ProfileIcon from "@/assets/icons/ProfileIcon";

export default function UserProfileImg({handleClick , profile_img , gender }
    :{ handleClick : Function ; profile_img:string | null; gender : string | null}) {
          
  return (
      <button 
        onClick={()=>handleClick()}
        className="flex rounded-full md:mr-0 focus:ring-4  focus:ring-[var(--primary)] dark:focus:ring-[var(--primary)]" >
        <span className="sr-only">Open user menu</span>
        {profile_img ? (
          <img className="w-9 h-9  rounded-full" src={profile_img} alt="user photo"/>
        ) : (
          <ProfileIcon classNameStyle="h-9 w-9 p-[0.35rem] border border-primary rounded-full text" />
          // <img 
          //   className="w-9 h-9 rounded-full" 
          //   src={gender != "נקבה" ? (
          //     "https://res.cloudinary.com/dftounwvk/image/upload/v1696176580/9A484DF4-3F00-450E-A67F-42347A12AD26_1_201_a_sa6dyu.jpg"
          //     ):("https://res.cloudinary.com/dftounwvk/image/upload/v1696173336/86D20B4B-F732-415E-8427-92A32C389FCF_1_201_a_dnhvvh.jpg") } 
          //   alt="user photo"/>
        )}
      </button>
  )
}
