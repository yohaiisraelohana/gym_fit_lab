import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Create a Supabase client configured to use cookies
  const supabase = createRouteHandlerClient({ cookies })

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: todos } = await supabase.from('profile').select()

  return NextResponse.json(todos)
}


//TODO: add the validation function
export async function PUT(request:NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body : TUser = await request.json();
    const {data:{user}} = await supabase.auth.getUser();
    

    const { data , error } = await supabase
      .from("profile")
      .select()
      .match({id:user?.id});
    
    console.log({data,body});
    
    if(error){
      console.log({error});
      
      //TODO: Error message
      return ;
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
    console.log(error);
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