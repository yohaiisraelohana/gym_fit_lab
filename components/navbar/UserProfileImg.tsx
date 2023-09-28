
export default function UserProfileImg({handleClick}:{ handleClick : Function }) {
  return (
      <button 
        onClick={()=>handleClick()}
        className="flex rounded-full md:mr-0 focus:ring-4 focus:ring-[var(--primary)] dark:focus:ring-[var(--primary)]" >
        <span className="sr-only">Open user menu</span>
        <img className="w-9 h-9 rounded-full" src="https://res.cloudinary.com/dftounwvk/image/upload/v1695842040/5C0FE921-267A-43D4-A999-99231C9319A6_1_201_a_ditmpn.jpg" alt="user photo"/>
        
      </button>
  )
}
