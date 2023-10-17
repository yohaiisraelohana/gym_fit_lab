import BannerImage from "./BannerImage";

export default function Banner() {
  return (
    <div className="flex w-screen justify-between bg-gradient-to-b from-background to-neutral-300 border-b-2 border-[var(--primary)]">
        <BannerImage/>
    </div>
  )
}
