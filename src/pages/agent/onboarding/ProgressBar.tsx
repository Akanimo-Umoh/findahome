type ProgressBarProps = { currentStep: number; totalSteps: number }

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const percent = (currentStep / totalSteps) * 100

  return (
    <div className="h-2.5 w-full max-w-79.25 overflow-hidden rounded-full bg-bg-warm-section">
      <div
        className="h-full rounded-full bg-button-bg transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
