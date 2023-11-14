import { iconProps } from "@/types/icon";

export default function ChevronUpIcon({classNameStyle , onClick}:iconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNameStyle || "w-6 h-6"} onClick={()=>onClick ? onClick() : console.log("no action sent")}> 
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />  
    </svg>
  )
}
