import Link from "next/link";
import { CalendarCheck, LogIn } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-emerald-700 text-sm font-bold text-white">
            GA
          </span>
          <span>
            <span className="block text-base font-semibold text-stone-950">
              Grand Aurora Hall
            </span>
            <span className="block text-xs text-stone-500">
              Venue booking desk
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
