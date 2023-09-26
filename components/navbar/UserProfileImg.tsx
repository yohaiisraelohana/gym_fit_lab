
export default function UserProfileImg({handleClick}:{ handleClick : Function }) {
  return (
      <button 
        onClick={()=>handleClick()}
        className="flex rounded-full md:mr-0 focus:ring-4 focus:ring-[var(--primary)] dark:focus:ring-[var(--primary)]" >
        <span className="sr-only">Open user menu</span>
        <img className="w-9 h-9 rounded-full" src="https://res.cloudinary.com/dftounwvk/image/upload/v1695036956/cld-sample-2.jpg" alt="user photo"/>
      </button>
  )
}
