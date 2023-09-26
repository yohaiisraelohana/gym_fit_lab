import BannerImage from "./BannerImage";

export default function Banner() {
  return (
    <div className="flex w-screen justify-between border-b-2 border-[var(--primary)]">
        <BannerImage/>
    </div>
  )
}
