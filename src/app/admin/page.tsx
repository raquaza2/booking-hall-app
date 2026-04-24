import Link from "next/link";
import { CalendarDays, Clock3, LogOut, Mail, Phone, Users } from "lucide-react";
import { logoutAdmin, updateBookingStatus } from "@/app/actions";
import { StatusBadge } from "@/components/status-badge";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/time-slots";
import type { BookingStatus } from "@/generated/prisma/enums";

export const dynamic = "force-dynamic";

const statuses = ["pending", "approved", "rejected"] as const;

const errorMessages: Record<string, string> = {
  "slot-taken": "Another booking is already approved for that date and time slot.",
  "missing-booking": "That booking could not be found.",
  "invalid-status": "The requested status update was invalid.",
};

type AdminPageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
  }>;
};

function isBookingStatus(value?: string): value is BookingStatus {
  return statuses.includes(value as BookingStatus);
}

export default async function AdminDashboardPage({ searchParams }: AdminPageProps) {
  const admin = await requireAdmin();
  const query = await searchParams;
  const statusFilter = isBookingStatus(query.status) ? query.status : undefined;
  const where = statusFilter ? { status: statusFilter } : {};

  const [bookings, pendingCount, approvedCount, rejectedCount] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: { venue: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.booking.count({ where: { status: "approved" } }),
    prisma.booking.count({ where: { status: "rejected" } }),
  ]);

  const error = query.error ? errorMessages[query.error] : undefined;

  return (
    <main className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Admin dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">
              Booking requests
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Signed in as {admin.name} ({admin.email})
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-stone-300 px-4 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            >
              Public site
            </Link>
            <form action={logoutAdmin}>
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800">
                <LogOut size={17} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Pending", count: pendingCount, href: "/admin?status=pending" },
            { label: "Approved", count: approvedCount, href: "/admin?status=approved" },
            { label: "Rejected", count: rejectedCount, href: "/admin?status=rejected" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md border border-stone-200 bg-white p-5 shadow-sm hover:border-emerald-200"
            >
              <p className="text-sm text-stone-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-stone-950">{item.count}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className={`rounded-md px-3 py-2 text-sm font-semibold ${
                !statusFilter
                  ? "bg-stone-950 text-white"
                  : "border border-stone-300 bg-white text-stone-700"
              }`}
            >
              All
            </Link>
            {statuses.map((status) => (
              <Link
                key={status}
                href={`/admin?status=${status}`}
                className={`rounded-md px-3 py-2 text-sm font-semibold capitalize ${
                  statusFilter === status
                    ? "bg-stone-950 text-white"
                    : "border border-stone-300 bg-white text-stone-700"
                }`}
              >
                {status}
              </Link>
            ))}
          </div>
          <p className="text-sm text-stone-500">{bookings.length} visible requests</p>
        </div>

        {error ? (
          <div className="mt-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4">
          {bookings.length === 0 ? (
            <div className="rounded-md border border-dashed border-stone-300 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-stone-950">No booking requests found</p>
              <p className="mt-2 text-sm text-stone-500">
                New public booking requests will appear here.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-stone-950">
                        {booking.customerName}
                      </h2>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="mt-2 text-sm text-stone-600">
                      {booking.eventType} at {booking.venue.name}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <form key={status} action={updateBookingStatus}>
                        <input type="hidden" name="bookingId" value={booking.id} />
                        <input type="hidden" name="status" value={status} />
                        <button
                          disabled={booking.status === status}
                          className="h-9 rounded-md border border-stone-300 px-3 text-sm font-semibold capitalize text-stone-700 hover:bg-stone-50 disabled:cursor-default disabled:border-transparent disabled:bg-stone-200 disabled:text-stone-500"
                        >
                          {status}
                        </button>
                      </form>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 border-t border-stone-200 pt-5 text-sm text-stone-700 md:grid-cols-2 lg:grid-cols-4">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-emerald-700" />
                    {formatDate(booking.eventDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock3 size={17} className="text-emerald-700" />
                    {booking.timeSlot}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={17} className="text-emerald-700" />
                    {booking.guestCount} guests
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail size={17} className="text-emerald-700" />
                    {booking.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone size={17} className="text-emerald-700" />
                    {booking.phone}
                  </span>
                </div>

                {booking.notes ? (
                  <p className="mt-4 rounded-md bg-stone-50 p-3 text-sm leading-6 text-stone-600">
                    {booking.notes}
                  </p>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
