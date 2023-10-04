import { validatePassword } from '@/services/validations/validatePassword'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient({ cookies })
  const validPassword : TValidation = validatePassword(password);

  if (!validPassword.valid)
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${validPassword.message}`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=הרשמת המשתמש נכשלה`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=בדקו את האימייל לאימות כדי לסיים את ההרשמה`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}
