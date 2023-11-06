import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { specializes_at_options } from '@/components/trainers/specializes_at_options'
import { validateImageFile } from '@/services/validations/validateInputs'
import { deleteSingleImageFromCloudinary } from '@/services/cloudinary/deleteImage'
import { uploadSingleImgToCloudinary } from '@/services/cloudinary/uploadImage'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  console.log("in the route");
  
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const specializes_at : string [] = specializes_at_options.filter((specialize) => String(formData.get(specialize)) != "" );
  const bio : string = String(formData.get("bio"));
  const id : string = String(formData.get("id"));
  const trainer_img : File | null = formData.get("trainer_img") as File;
  const training_since : string = String(formData.get("training_since"));
  const trainer_current_img : string | null = String(formData.get("trainer_current_img"));
  let error ;

  
  let updatedTrainer : TTrainer = {
    bio,
    specializes_at,
    id
  };
  if(training_since.length > 0)
    updatedTrainer.training_since = training_since;

  //TODO: the same check with img


  
  /* 
  * Upload Image To Cloudinary
  ! Add validation to the image
  let trainer_new_img_url ;
  if (trainer_current_img != null && trainer_current_img.length > 0) {
      const deleteRes = await deleteSingleImageFromCloudinary(trainer_current_img);
      if(typeof deleteRes !== "string")
        error =  deleteRes;
  }
  const uploadRes : any | TCldRes | TError = await uploadSingleImgToCloudinary(trainer_img);
  if(!("secure_url" in uploadRes))
      error = uploadRes;
  trainer_new_img_url = uploadRes.secure_url;
  */
  

  console.log({error});
  
  
  const supabase = createRouteHandlerClient({ cookies });
  const {data:tData , error:tError} = await supabase 
    .from("trainer")
    .upsert(updatedTrainer,{onConflict:"id"});

    console.log("54 = ",{tData , tError});
    
  

  return NextResponse.redirect( `${requestUrl.protocol}//${requestUrl.host}/account/trainer`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}



/*
//! validate inputs
//   if (!validPassword.valid)
//     return NextResponse.redirect(`${requestUrl.origin}/account/trainer/edit?error=${validPassword.message}`,
//     {
//       // a 301 status is required to redirect from a POST to a GET route
//       status: 301,
//     });
  
//! update in database
//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })

//! in case of error
//   if (error) {
//     return NextResponse.redirect(
//       `${requestUrl.origin}/account/trainer/edit?error=עריכת המאמן נכשלה נסה שוב`,
//       {
//         // a 301 status is required to redirect from a POST to a GET route
//         status: 301,
//       }
//     )
//   }

*/