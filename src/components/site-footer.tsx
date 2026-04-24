import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-lg font-semibold text-white">Grand Aurora Hall</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-400">
            Booking requests are reviewed by the venue team before approval.
            This demo does not collect online payments.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/venue" className="hover:text-white">
            Venue details
          </Link>
          <Link href="/book" className="hover:text-white">
            Request booking
          </Link>
          <Link href="/admin/login" className="hover:text-white">
            Admin login
          </Link>
        </div>
      </div>
    </footer>
  );
}
