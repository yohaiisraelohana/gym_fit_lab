import MailIcon from '@/assets/icons/MailIcon'
import Messages from './messages'
import LockIcon from '@/assets/icons/LockIcon'
import EmailInput from '@/components/Login/EmailInput'


export default function Login() {
    
  return (
    <div className="flex flex-col w-full px-8  h-[80vh] justify-center">
      <form
        className="flex flex-col w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] text text-end justify-center gap-2 "
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-lg" htmlFor="email">
          אימייל
        </label>
        <EmailInput />
        <MailIcon classNameStyle='h-5 w-5 text mt-[-47px] mb-[30px] ml-2' />

        <label className="text-lg" htmlFor="password">
          סיסמא
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 text-end"
          type="password"
          name="password"
          pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$'
          placeholder="••••••••"
          title='הסיסמא חייבת להכיל לפחות 8 תווים ולכלול בתוכה אותיות באנגלית בלבד אות אחת גדולה ומספר אחד לפחות'
          required
        />
        <button >
          <LockIcon classNameStyle='h-5 w-5 text mt-[-64px] mb-[30px] ml-2' />
        </button>

        <button className="bg-primary rounded px-4 py-2 text-black mb-2">
          התחברות
        </button>
        <button
          formAction="/auth/sign-up"
          className="border text border-gray-700 rounded px-4 py-2  mb-2"
        >
          הרשמה
        </button>
        <Messages />
      </form>
    </div>
  )
}
