import {
  Banknote,
  Building2,
  ChartColumn,
  Landmark,
  LayoutDashboard,
  Megaphone,
  Scale,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import type { User } from "@/context/AuthContext"

// Single source of truth for the admin area: the sidebar renders it, the topbar reads titles from it, and unbuilt pages use it for their placeholder. Adding an admin page = add one entry here + one <Route> in AppRoutes.

export type AdminNavItem = {
  label: string
  to: string
  icon: LucideIcon
  title: string
  subtitle: string | ((user: User | null) => string)
  // other paths that should light this item up (e.g. a detail route)
  alsoActiveOn?: string[]
}

export type AdminNavGroup = { label: string | null; items: AdminNavItem[] }

const firstName = (user: User | null) => user?.name?.trim().split(" ")[0]

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: null,
    items: [
      {
        label: "Dashboard",
        to: "/admin/dashboard",
        icon: LayoutDashboard,
        title: "Dashboard",
        subtitle: (user) =>
          firstName(user) ? `Welcome back, ${firstName(user)}` : "Welcome back",
      },
    ],
  },
  {
    label: "Marketplace",
    items: [
      {
        label: "Listings",
        to: "/admin/properties",
        icon: Building2,
        title: "Listings",
        subtitle: "Review and moderate property listings",
      },
      {
        label: "User management",
        to: "/admin/users",
        icon: Users,
        title: "User management",
        subtitle: "Agents and house-hunters on the platform",
        alsoActiveOn: ["/admin/agents"],
      },
      {
        label: "Ads manager",
        to: "/admin/ads",
        icon: Megaphone,
        title: "Ads manager",
        subtitle: "Promoted listings and ad revenue",
      },
    ],
  },
  {
    label: "Money",
    items: [
      {
        label: "Escrow transactions",
        to: "/admin/transactions",
        icon: Landmark,
        title: "Escrow transactions",
        subtitle: "Funds held, released and in dispute",
      },
      {
        label: "Payouts",
        to: "/admin/payouts",
        icon: Banknote,
        title: "Payouts",
        subtitle: "Withdrawal requests and agent payments",
      },
      {
        label: "Financial reports",
        to: "/admin/reports",
        icon: ChartColumn,
        title: "Financial reports",
        subtitle: "Revenue, fees and settlements",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "Disputes",
        to: "/admin/disputes",
        icon: Scale,
        title: "Disputes",
        subtitle: "Cases raised by buyers and agents",
      },
    ],
  },
]

export const adminFooterNav: AdminNavItem[] = [
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
    title: "Settings",
    subtitle: "Your admin account",
  },
]

const allItems = [...adminNavGroups.flatMap((g) => g.items), ...adminFooterNav]

export const isNavItemActive = (item: AdminNavItem, pathname: string) =>
  [item.to, ...(item.alsoActiveOn ?? [])].some(
    (base) => pathname === base || pathname.startsWith(`${base}/`)
  )

export const findNavItem = (pathname: string) =>
  allItems.find((item) => isNavItemActive(item, pathname))
