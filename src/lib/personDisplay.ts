export type PersonLike =
  | string
  | { name?: string; email: string; phoneNumber?: string | null }
  | undefined

export type PersonDisplay = {
  name: string
  email: string
  phone: string
}

export function getPersonDisplay(
  person: PersonLike,
  fallbackName: string
): PersonDisplay {
  if (!person || typeof person === "string") {
    return { name: fallbackName, email: "", phone: "—" }
  }
  return {
    name: person.name ?? person.email,
    email: person.email,
    phone: person.phoneNumber ?? "—",
  }
}
