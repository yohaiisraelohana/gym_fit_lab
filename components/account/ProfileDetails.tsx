'use client'
import ProfileIcon from "@/assets/icons/ProfileIcon";
import { userStore } from "@/stores/userStore"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfileDetails() {
  const { user , fetchUser } = userStore();

  useEffect(()=>{fetchUser();},[]);

  return (
    user &&
      <div className="flex flex-col justify-center items-center w-[80vw] gap-8">
        <section className="flex flex-col justify-center items-center">
          {user.profile_img ?
                  <Image
                  style={{border:'1px solid white', borderRadius:"100%"}}
                  height={200}
                  width={200}
                  alt="profile img"
                  src={user.profile_img }/>
                  :
                  <ProfileIcon classNameStyle="h-[200px] w-[200px] p-[0.35rem] border border-primary rounded-full text" />
          }

          <h1 className=" title">{user.name}</h1>
          <p className="text-primary">{user.email}</p>
        </section>

        
        <div className="w-full grid grid-cols-2 gap-2 text-center">
          <p className={user.is_trainee ? "border border-primary text p-2" : "border border-white text p-2"}>מתאמן</p>
          <p className={user.is_trainee ? "border border-primary text p-2" : "border border-white text p-2"}>מאמן</p>
        </div>

        <div className="w-full">
          <p>{user.created_at?.substring(0,10).replaceAll('-',"/")}{" חבר מאז"}</p>
          
          <div className="flex items-center gap-2">
          
            {user.gender == "זכר" 
              ? <img 
                  className="h-10 w-10 rounded-full border border-primary"
                  src="https://res.cloudinary.com/dftounwvk/image/upload/v1696176580/9A484DF4-3F00-450E-A67F-42347A12AD26_1_201_a_sa6dyu.jpg" 
                  alt="male img" />
              : <img 
                  className="h-10 w-10 rounded-full border border-primary"
                  src="https://res.cloudinary.com/dftounwvk/image/upload/v1696176580/9A484DF4-3F00-450E-A67F-42347A12AD26_1_201_a_sa6dyu.jpg" 
                  alt="male img" />
            }
            <p className="text-lg">{user.gender}</p>
          </div>

          
          <Link href={"/account/edit"}>{"עריכה"}</Link>
          <p>{"שנה סיסמא"}</p>
        </div>

      </div>
  )
}