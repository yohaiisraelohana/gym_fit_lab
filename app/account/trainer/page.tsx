import Link from "next/link";

export default async function page() {
  return (
    <Link 
        href={"/account/trainer/edit"}
        className="title"
        >עריכה
    </Link>
  )
}
