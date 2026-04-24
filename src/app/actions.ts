"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, requireAdmin } from "@/lib/auth";
import { ensureVenue } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { doTimeSlotsOverlap, toEventDate } from "@/lib/time-slots";
import { bookingSchema, loginSchema, statusSchema } from "@/lib/validation";

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
};

function formValues(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
  );
}

export async function createBooking(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = formValues(formData);
  const parsed = bookingSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const venue = await ensureVenue();
  const eventDate = toEventDate(parsed.data.eventDate);

  const approvedBookings = await prisma.booking.findMany({
    where: {
      venueId: venue.id,
      eventDate,
      status: "approved",
    },
    select: { timeSlot: true },
  });

  const approvedConflict = approvedBookings.some((booking) =>
    doTimeSlotsOverlap(booking.timeSlot, parsed.data.timeSlot),
  );

  if (approvedConflict) {
    return {
      ok: false,
      message:
        "That slot is already approved for another event. Choose a different time slot.",
      values,
    };
  }

  const booking = await prisma.booking.create({
    data: {
      venueId: venue.id,
      customerName: parsed.data.customerName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      eventType: parsed.data.eventType,
      guestCount: parsed.data.guestCount,
      eventDate,
      timeSlot: parsed.data.timeSlot,
      notes: parsed.data.notes || null,
    },
    select: { id: true },
  });

  revalidatePath("/admin");
  redirect(`/booking/confirmation/${booking.id}`);
}

export async function loginAdmin(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = formValues(formData);
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check your login details.",
      errors: parsed.error.flatten().fieldErrors,
      values: { email: values.email ?? "" },
    };
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) {
    return {
      ok: false,
      message: "Invalid email or password.",
      values: { email: parsed.data.email },
    };
  }

  await createAdminSession(admin.id);
  redirect("/admin");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();

  const parsed = statusSchema.safeParse(formValues(formData));
  if (!parsed.success) {
    redirect("/admin?error=invalid-status");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: parsed.data.bookingId },
  });

  if (!booking) {
    redirect("/admin?error=missing-booking");
  }

  if (parsed.data.status === "approved") {
    const approvedBookings = await prisma.booking.findMany({
      where: {
        id: { not: parsed.data.bookingId },
        venueId: booking.venueId,
        eventDate: booking.eventDate,
        status: "approved",
      },
      select: { timeSlot: true },
    });

    const conflict = approvedBookings.some((approvedBooking) =>
      doTimeSlotsOverlap(approvedBooking.timeSlot, booking.timeSlot),
    );

    if (conflict) {
      redirect("/admin?error=slot-taken");
    }
  }

  await prisma.booking.update({
    where: { id: parsed.data.bookingId },
    data: { status: parsed.data.status },
  });

  revalidatePath("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
