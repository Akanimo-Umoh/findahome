import { Dialog as DialogPrimitive } from "radix-ui"
import AdminSidebar from "./AdminSidebar"

type AdminMobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Radix Dialog gives the drawer focus trapping, Escape handling, scroll lock and ARIA for free — same reason the rest of the app uses it for modals.
export default function AdminMobileNav({
  open,
  onOpenChange,
}: AdminMobileNavProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-xl outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left lg:hidden"
        >
          <DialogPrimitive.Title className="sr-only">
            Admin navigation
          </DialogPrimitive.Title>
          <AdminSidebar onNavigate={() => onOpenChange(false)} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
