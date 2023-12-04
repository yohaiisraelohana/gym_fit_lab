import UserProfileImg from "../navbar/UserProfileImg";

export default function ChangeCardLikesList(
    {likes_list}:{
        likes_list: TLikeUser[];
    }) {

  return (
    <>
        {
            likes_list.map((like , ind)=>(
              <div 
                key={ind}
                className="w-full flex justify-end items-end px-1 gap-2"
                ><p 
                  className="font-bold"
                  >{like.name!}
                </p>

                <UserProfileImg 
                  handleClick={()=>console.log("")} 
                  profile_img={like.profile_img} />
              </div>
            ))
        }
    </>
  )
}
