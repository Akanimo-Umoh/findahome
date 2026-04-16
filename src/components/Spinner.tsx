export default function Spinner() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-bg-accent border-t-button-bg animate-spin" />
    </div>
  );
}
