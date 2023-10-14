import ProfileIcon from "@/assets/icons/ProfileIcon";
import {CldImage} from 'next-cloudinary';
export default function UserProfileImg({handleClick , profile_img , gender }
    :{ handleClick : Function ; profile_img?:string | null; gender : string | null}) {
      console.log(profile_img);
      
  return (
      <button 
        onClick={()=>handleClick()}
        className="flex rounded-full md:mr-0 focus:ring-4  focus:ring-[var(--primary)] dark:focus:ring-[var(--primary)]" >
        <span className="sr-only">Open user menu</span>
        {profile_img ? (
            <CldImage 
              style={{borderRadius:"100%"}}
              width="36" 
              height="36" 
              src={profile_img}
              alt="user photo"/>
        ) : (
          <ProfileIcon classNameStyle="h-9 w-9 p-[0.35rem] border border-primary rounded-full text" />
        )}
      </button>
  )
}
