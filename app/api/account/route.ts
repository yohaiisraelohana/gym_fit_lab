import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'



//TODO: add the validation function
export async function PUT(request:NextRequest):Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body : TUser = await request.json();
    const {data:{user}} = await supabase.auth.getUser();
    

    const { data , error } = await supabase
      .from("profile")
      .select()
      .match({id:user?.id});
    
    
    if(error){
      console.error({error});
      return NextResponse.json({error,message:"user not found"});
    }
    const profile : TUser = data[0];

    if (! profile.is_trainer && body.is_trainer) {
      await supabase.from("trainer").insert([{}]);
    }
    if (! profile.is_trainee && body.is_trainee) {
      await supabase.from("trainer").insert([{}]);
    }
    
    
    await supabase
       .from("profile")
       .update(body)
       .match({id:user?.id});
    
    
    return NextResponse.json({message:"הפרטים נשמרו בהצלחה"}); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:error , message:"עדכון המשתמש נכשל"});
  }

}








// export async function PUT(request : NextRequest , context : { params : { userId : string } } ) {
//   try {
//       const {postId} = context.params;
//       const post : PostInt = await request.json(); 

//       const validPost : ValidPost = validatePost(post);
//       if (! validPost.valid) 
//           return new NextResponse(validPost.message , {status:400});

//       await firestore.collection(GET_POSTS).doc(postId).set({
//           title:post.title,
//           body:post.body
//       });
//       await revalidate(request,["/posts" , `/posts/${postId}`]);
//       return NextResponse.json({message:"Post updated successfully"});
//   } catch (error) {
//       console.error("error editing post",error);
//       return new NextResponse("Internal Server Error",{status:500});
//   }
// }