// The picked day and an "HH:mm" time as one moment.
export function combineDateAndTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number)
  const combined = new Date(date)
  combined.setHours(hours || 0, minutes || 0, 0, 0)
  return combined
}

// True when that moment has already passed.
export function isInThePast(date: Date | undefined, time: string): boolean {
  return !!date && combineDateAndTime(date, time).getTime() <= Date.now()
}
