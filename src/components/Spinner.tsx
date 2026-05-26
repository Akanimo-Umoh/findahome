export default function Spinner() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-bg-accent border-t-button-bg" />
    </div>
  )
}
