
import ArrowRigthIcon from "@/assets/icons/ArrowRigthIcon";
import Link from "next/link";

export default function BackRouteButton(
    {className , href}:{
        className?: string;
        href: string;
    }
) {
  return (
    <Link 
        href={href}
        className={className || " absolute top-0 right-0 text"}
        ><ArrowRigthIcon  />
    </Link>
  )
}
