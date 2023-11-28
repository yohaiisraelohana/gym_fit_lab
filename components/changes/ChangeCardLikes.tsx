
export default async function ChangeCardLikes(
    {change_show , change_id}:{
        change_show:string;
        change_id:string;
    }
) {
  // const supabase = createServerComponentClient({cookies});
  // const {data:{user}} = await supabase.auth.getUser();
  // const {data:change_likes , error} = await supabase
  //   .from("changeLike")
  //   .select()
  //   .match({item_id:change_id})
  //   .limit(20);
  // if(!change_likes || error)
  //   return;

  
  // const isLiked : boolean = change_likes.some((like)=> like.profile_id === user?.id);

  /*
  TODO_STEPS :
    ? 1 get the count of all likes to show on top
    ? 2 change the component to client and make a loading usage
    ? 3 make a button or use scrolling effects to refatch for another likes every time the user arrives to the bottom
   */
  return (
    <>
        {change_show == "לייקים"
            && ( 
            <div>
                
            </div>
            )
        } 
    </>
  )
}
