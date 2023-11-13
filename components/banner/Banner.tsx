import BannerImage from "./BannerImage";

export default function Banner() {
  return (
    <div className="flex w-screen max-sm:h-[85vh] max-sm:items-end justify-between bg-gradient-to-b from-20% from-background to-neutral-300 border-b-2 border-[var(--primary)]">
        <BannerImage/>
    </div>
  )
}
