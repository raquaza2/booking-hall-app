export const openingHour = 9;
export const closingHour = 23;
export const slotDurationOptions = [1, 2] as const;

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export const timeSlots = Array.from(
  { length: closingHour - openingHour },
  (_, index) => openingHour + index,
).flatMap((startHour) =>
  slotDurationOptions
    .filter((duration) => startHour + duration <= closingHour)
    .map((duration) => `${formatHour(startHour)} - ${formatHour(startHour + duration)}`),
);

export type TimeSlot = string;

export function isValidTimeSlot(value: string) {
  return timeSlots.includes(value);
}

export function parseTimeSlot(value: string) {
  const match = /^(\d{2}):00 - (\d{2}):00$/.exec(value);

  if (!match) {
    return null;
  }

  const start = Number(match[1]) * 60;
  const end = Number(match[2]) * 60;

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return null;
  }

  return { start, end };
}

export function doTimeSlotsOverlap(first: string, second: string) {
  const firstSlot = parseTimeSlot(first);
  const secondSlot = parseTimeSlot(second);

  if (!firstSlot || !secondSlot) {
    return false;
  }

  return firstSlot.start < secondSlot.end && secondSlot.start < firstSlot.end;
}

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
