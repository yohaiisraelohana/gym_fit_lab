import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const supabase = createRouteHandlerClient({ cookies })

    if(!email)
        return NextResponse.redirect(
            `${requestUrl.origin}/login?error=אימייל לא סופק`,
            {
              // a 301 status is required to redirect from a POST to a GET route
              status: 301,
            }
    )
  
    const { error } = await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${requestUrl.origin}/reset_password`})
  
    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=שכזור סיסמת המשתמש נכשלה`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      )
    }
  
    return NextResponse.redirect(
      `${requestUrl.origin}/login?message=בדקו את האימייל לאימות כדי לסיים את שחזור הסיסמה`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }