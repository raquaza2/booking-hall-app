import Link from "next/link";
import { Check, MapPin, ShieldCheck, Users } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { detailImage, venueProfile } from "@/lib/venue";

export default function VenuePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:py-16">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Venue details
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
                {venueProfile.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
                {venueProfile.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-md border border-stone-200 p-4">
                  <Users className="text-emerald-700" size={22} />
                  <p className="mt-3 text-2xl font-semibold text-stone-950">
                    {venueProfile.capacity}
                  </p>
                  <p className="text-sm text-stone-500">Guest capacity</p>
                </div>
                <div className="rounded-md border border-stone-200 p-4">
                  <ShieldCheck className="text-emerald-700" size={22} />
                  <p className="mt-3 text-2xl font-semibold text-stone-950">3</p>
                  <p className="text-sm text-stone-500">Daily time slots</p>
                </div>
                <div className="rounded-md border border-stone-200 p-4">
                  <MapPin className="text-emerald-700" size={22} />
                  <p className="mt-3 text-2xl font-semibold text-stone-950">MY</p>
                  <p className="text-sm text-stone-500">Selangor location</p>
                </div>
              </div>
            </div>

            <div
              className="min-h-[420px] rounded-md bg-stone-800"
              style={{
                backgroundImage: `url(${detailImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              aria-label="Decorated event hall"
            />
          </div>
        </section>

        <section className="border-y border-stone-200 bg-stone-50 py-14">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-stone-950">Amenities</h2>
              <div className="mt-6 grid gap-3">
                {venueProfile.amenities.map((amenity) => (
                  <div key={amenity} className="flex gap-3 rounded-md bg-white p-4">
                    <Check className="mt-0.5 shrink-0 text-emerald-700" size={18} />
                    <span className="text-sm leading-6 text-stone-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-stone-950">Booking rules</h2>
              <div className="mt-6 grid gap-3">
                {venueProfile.rules.map((rule) => (
                  <div key={rule} className="flex gap-3 rounded-md bg-white p-4">
                    <Check className="mt-0.5 shrink-0 text-amber-600" size={18} />
                    <span className="text-sm leading-6 text-stone-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-stone-950">
                Ready to request a slot?
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                Choose a date and time slot, then submit your event details for admin review.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Open booking form
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
