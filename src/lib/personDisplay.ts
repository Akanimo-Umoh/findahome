export type PersonLike =
  | string
  | {
      name?: string
      email: string
      phoneNumber?: string | null
      profilePicture?: string | null | string[]
    }
  | undefined

export type PersonDisplay = {
  name: string
  email: string
  phone: string
  profilePicture: string | null
}

function extractProfilePicture(
  pic: string | null | string[] | undefined
): string | null {
  if (!pic) return null
  if (typeof pic === "string") return pic
  // backend sends profilePicture as an array of URLs — take the first one
  return pic[0] ?? null
}

export function getPersonDisplay(
  person: PersonLike,
  fallbackName: string
): PersonDisplay {
  if (!person || typeof person === "string") {
    return { name: fallbackName, email: "", phone: "—", profilePicture: null }
  }
  return {
    name: person.name ?? person.email,
    email: person.email,
    phone: person.phoneNumber ?? "—",
    profilePicture: extractProfilePicture(person.profilePicture),
  }
}
