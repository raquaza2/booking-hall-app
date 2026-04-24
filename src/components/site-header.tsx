import Link from "next/link";
import { CalendarCheck, Crown, LogIn } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid size-12 place-items-center overflow-hidden rounded-md bg-stone-950 text-white shadow-sm ring-1 ring-stone-900/10">
            <span className="absolute inset-x-0 top-0 h-1 bg-amber-400" />
            <span className="absolute -right-3 -top-3 size-8 rounded-full bg-emerald-500/30" />
            <span className="absolute -bottom-4 -left-2 size-9 rounded-full bg-amber-300/25" />
            <Crown className="relative mb-0.5 text-amber-300" size={17} strokeWidth={2.2} />
            <span className="relative text-[11px] font-black leading-none tracking-normal">
              GA
            </span>
          </span>
          <span>
            <span className="block text-base font-bold leading-tight text-stone-950 group-hover:text-emerald-800">
              Grand Aurora Hall
            </span>
            <span className="mt-0.5 block text-xs font-medium text-stone-500">
              Private venue booking
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 md:flex">
          <Link className="hover:text-stone-950" href="/venue">
            Venue
          </Link>
          <Link className="hover:text-stone-950" href="/book">
            Book a slot
          </Link>
          <Link className="hover:text-stone-950" href="/admin/login">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/login"
            aria-label="Admin login"
            className="grid size-10 place-items-center rounded-md border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50 md:hidden"
          >
            <LogIn size={18} />
          </Link>
          <Link
            href="/book"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <CalendarCheck size={17} />
            Request booking
          </Link>
        </div>
      </div>
    </header>
  );
}
