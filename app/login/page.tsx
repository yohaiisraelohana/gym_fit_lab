import Messages from './messages'

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md h-[80vh] justify-center gap-2 ">
      <form
        className="flex-1 flex flex-col w-full text-end justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          אימייל
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-2 text-end"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          סיסמא
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 text-end"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
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
