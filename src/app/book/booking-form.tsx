"use client";

import { useActionState } from "react";
import { CalendarCheck } from "lucide-react";
import { createBooking, type FormState } from "@/app/actions";
import { FieldError } from "@/components/field-error";
import { timeSlots, todayInputValue } from "@/lib/time-slots";

const initialState: FormState = {
  ok: false,
};

const inputClass =
  "mt-2 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";

const labelClass = "text-sm font-semibold text-stone-800";

export function BookingForm() {
  const [state, action, pending] = useActionState(createBooking, initialState);
  const values = state.values ?? {};

  return (
    <form action={action} className="grid gap-6">
      {state.message ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Full name
          <input
            className={inputClass}
            name="customerName"
            defaultValue={values.customerName}
            autoComplete="name"
            required
          />
          <FieldError errors={state.errors?.customerName} />
        </label>

        <label className={labelClass}>
          Email
          <input
            className={inputClass}
            name="email"
            type="email"
            defaultValue={values.email}
            autoComplete="email"
            required
          />
          <FieldError errors={state.errors?.email} />
        </label>

        <label className={labelClass}>
          Phone
          <input
            className={inputClass}
            name="phone"
            defaultValue={values.phone}
            autoComplete="tel"
            required
          />
          <FieldError errors={state.errors?.phone} />
        </label>

        <label className={labelClass}>
          Event type
          <input
            className={inputClass}
            name="eventType"
            defaultValue={values.eventType}
            placeholder="Wedding, seminar, dinner"
            required
          />
          <FieldError errors={state.errors?.eventType} />
        </label>

        <label className={labelClass}>
          Guest count
          <input
            className={inputClass}
            name="guestCount"
            type="number"
            min="10"
            max="420"
            defaultValue={values.guestCount}
            required
          />
          <FieldError errors={state.errors?.guestCount} />
        </label>

        <label className={labelClass}>
          Event date
          <input
            className={inputClass}
            name="eventDate"
            type="date"
            min={todayInputValue()}
            defaultValue={values.eventDate}
            required
          />
          <FieldError errors={state.errors?.eventDate} />
        </label>
      </div>

      <fieldset>
        <legend className={labelClass}>Time slot</legend>
        <p className="mt-1 text-sm text-stone-600">
          Choose a 1-hour or 2-hour reservation window. Two hours is the maximum
          length per booking slot.
        </p>
        <div className="mt-3 grid max-h-[420px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {timeSlots.map((slot) => (
            <label
              key={slot}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-stone-300 bg-white p-4 text-sm font-medium text-stone-800 has-checked:border-emerald-700 has-checked:bg-emerald-50"
            >
              <input
                type="radio"
                name="timeSlot"
                value={slot}
                defaultChecked={values.timeSlot === slot}
                className="size-4 accent-emerald-700"
                required
              />
              <span>
                <span className="block">{slot}</span>
                <span className="block text-xs font-normal text-stone-500">
                  {slot.endsWith(":00") &&
                  Number(slot.slice(8, 10)) - Number(slot.slice(0, 2)) === 2
                    ? "2 hours"
                    : "1 hour"}
                </span>
              </span>
            </label>
          ))}
        </div>
        <FieldError errors={state.errors?.timeSlot} />
      </fieldset>

      <label className={labelClass}>
        Notes for the venue team
        <textarea
          className="mt-2 min-h-32 w-full rounded-md border border-stone-300 bg-white px-3 py-3 text-sm text-stone-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          name="notes"
          defaultValue={values.notes}
          placeholder="Layout needs, setup timing, vendor information"
        />
        <FieldError errors={state.errors?.notes} />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        <CalendarCheck size={18} />
        {pending ? "Submitting request..." : "Submit booking request"}
      </button>
    </form>
  );
}
