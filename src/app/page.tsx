import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { heroImage, venueHighlights, venueProfile } from "@/lib/venue";

const occasions = ["Wedding receptions", "Corporate dinners", "Seminars", "Community events"];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          className="relative isolate min-h-[76vh] overflow-hidden bg-stone-900"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(28,25,23,0.86), rgba(28,25,23,0.42), rgba(28,25,23,0.12)), url(${heroImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto flex min-h-[76vh] max-w-7xl items-center px-5 py-16 sm:px-8">
            <div className="max-w-3xl text-white">
              <p className="mb-5 inline-flex rounded-md bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                Cyberjaya event venue
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
                {venueProfile.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 sm:text-xl">
                {venueProfile.tagline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 hover:bg-amber-300"
                >
                  Choose date and slot
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/venue"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  View venue details
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
              {venueHighlights.map((item) => (
                <div key={item.label} className="min-w-0 bg-white py-5 sm:px-5 lg:px-6">
                  <p className="text-sm text-stone-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold leading-snug text-stone-950 break-words sm:text-xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Practical booking flow
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-stone-950 sm:text-4xl">
                Browse the hall, pick a date, request a slot, then wait for admin approval.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
                The system keeps the process realistic without collecting payments:
                every booking starts as pending, and venue staff can approve or
                reject requests from the dashboard.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: CalendarDays,
                  title: "Date selection",
                  text: "Guests choose a future event date from a clear form.",
                },
                {
                  icon: Clock3,
                  title: "Time slots",
                  text: "Guests can reserve a 1-hour or 2-hour slot, with two hours as the maximum.",
                },
                {
                  icon: Users,
                  title: "Guest planning",
                  text: "Event type, guest count, and notes help admins respond quickly.",
                },
                {
                  icon: CheckCircle2,
                  title: "Admin decision",
                  text: "Pending, approved, and rejected statuses are visible end to end.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <item.icon className="text-emerald-700" size={24} />
                  <h3 className="mt-4 text-lg font-semibold text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-semibold text-stone-950">Built for real events</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {occasions.map((occasion) => (
                  <div
                    key={occasion}
                    className="flex items-center gap-3 rounded-md border border-stone-200 px-4 py-3 text-sm font-medium text-stone-700"
                  >
                    <CheckCircle2 size={18} className="text-emerald-700" />
                    {occasion}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-stone-200 bg-stone-50 p-6">
              <MapPin className="text-emerald-700" size={24} />
              <p className="mt-4 text-lg font-semibold text-stone-950">
                {venueProfile.address}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Confirm layout, slot availability, and setup needs by submitting a
                request. The venue team will review it before approval.
              </p>
              <Link
                href="/book"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800"
              >
                Start booking request
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
