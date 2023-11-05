import EditProfile from "@/components/account/EditProfile";

export default function page() {
  return (
    <div className="text flex flex-col min-h-[90vh] overflow-y-auto justify-center items-center">
      <h2 className="text-xl">! {"ספר לנו על עצמך"}</h2>
      <p className="text-center w-[65vw] text-sm"> {"כדי לתת לך את מעטפת האימונים הטובה ביותר , אנחנו צריכים להכיר אותך"}</p>
      <EditProfile/>
    </div>
  )
}
