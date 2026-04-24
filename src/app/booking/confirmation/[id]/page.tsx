import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, Clock3, Mail, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusBadge } from "@/components/status-badge";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/time-slots";

export const dynamic = "force-dynamic";

type ConfirmationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { venue: true },
  });

  if (!booking) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-stone-50">
        <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <CalendarCheck className="text-emerald-700" size={34} />
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  Request received
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-stone-950">
                  Booking request submitted
                </h1>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Save this page for your reference. The venue team will review
                  the request and update its status from the admin dashboard.
                </p>
              </div>
              <StatusBadge status={booking.status} />
            </div>

            <div className="mt-8 grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-stone-500">Venue</p>
                <p className="mt-1 font-semibold text-stone-950">{booking.venue.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-stone-500">Event type</p>
                <p className="mt-1 font-semibold text-stone-950">{booking.eventType}</p>
              </div>
              <div className="flex gap-3">
                <CalendarCheck className="mt-1 text-emerald-700" size={18} />
                <div>
                  <p className="text-xs font-semibold uppercase text-stone-500">Date</p>
                  <p className="mt-1 font-semibold text-stone-950">
                    {formatDate(booking.eventDate)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-1 text-emerald-700" size={18} />
                <div>
                  <p className="text-xs font-semibold uppercase text-stone-500">Time slot</p>
                  <p className="mt-1 font-semibold text-stone-950">{booking.timeSlot}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-1 text-emerald-700" size={18} />
                <div>
                  <p className="text-xs font-semibold uppercase text-stone-500">Email</p>
                  <p className="mt-1 font-semibold text-stone-950">{booking.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-1 text-emerald-700" size={18} />
                <div>
                  <p className="text-xs font-semibold uppercase text-stone-500">Phone</p>
                  <p className="mt-1 font-semibold text-stone-950">{booking.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white hover:bg-stone-800"
              >
                Back to home
              </Link>
              <Link
                href="/book"
                className="inline-flex h-11 items-center justify-center rounded-md border border-stone-300 px-5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
              >
                Submit another request
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
