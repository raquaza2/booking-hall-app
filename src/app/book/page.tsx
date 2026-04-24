import { Clock3, Info } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { timeSlots } from "@/lib/time-slots";
import { venueProfile } from "@/lib/venue";
import { BookingForm } from "./booking-form";

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-stone-50">
        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Booking request
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-stone-950">
              Choose a date and time slot
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              Submit your event details for {venueProfile.name}. The request will
              appear in the admin dashboard as pending.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <BookingForm />
          </div>

          <aside className="space-y-4">
            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <Info className="text-emerald-700" size={23} />
              <h2 className="mt-4 text-lg font-semibold text-stone-950">
                What happens next
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Your request is saved as pending. Venue admins review the event
                information and mark it approved or rejected.
              </p>
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <Clock3 className="text-emerald-700" size={23} />
              <h2 className="mt-4 text-lg font-semibold text-stone-950">
                Available slot windows
              </h2>
              <div className="mt-4 grid gap-2">
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="rounded-md border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
