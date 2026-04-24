export const timeSlots = [
  "09:00 - 13:00",
  "14:00 - 18:00",
  "19:00 - 23:00",
] as const;

export type TimeSlot = (typeof timeSlots)[number];

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export function toEventDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

export function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}
