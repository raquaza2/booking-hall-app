import { z } from "zod";
import { isValidTimeSlot } from "./time-slots";

const phoneRegex = /^[0-9+\-\s()]{8,24}$/;

export const bookingSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  eventType: z.string().trim().min(2, "Enter the event type."),
  guestCount: z.coerce
    .number()
    .int("Guest count must be a whole number.")
    .min(10, "Minimum booking size is 10 guests.")
    .max(420, "Grand Aurora Hall supports up to 420 guests."),
  eventDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date.")
    .refine((value) => value >= new Date().toISOString().slice(0, 10), {
      message: "Choose today or a future date.",
    }),
  timeSlot: z
    .string()
    .trim()
    .refine(isValidTimeSlot, "Choose a 1-hour or 2-hour time slot."),
  notes: z.string().trim().max(600, "Keep notes under 600 characters.").optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter your admin email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const statusSchema = z.object({
  bookingId: z.string().min(1),
  status: z.enum(["pending", "approved", "rejected"]),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
