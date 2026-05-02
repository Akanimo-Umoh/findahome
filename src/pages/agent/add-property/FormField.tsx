type FormFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export default function FormField({
  label,
  htmlFor,
  error,
  className = "",
  children,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className="app-property-label">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[11px] leading-4">{error}</p>
      )}
    </div>
  );
}