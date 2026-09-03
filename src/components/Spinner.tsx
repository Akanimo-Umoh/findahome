type SpinnerProps = {
  className?: string
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={
        className ?? "flex min-h-[calc(100vh-72px)] items-center justify-center"
      }
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-bg-accent border-t-button-bg" />
    </div>
  )
}
