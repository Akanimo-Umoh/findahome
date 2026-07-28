// TagInput.tsx
import { useState } from "react"

type TagInputProps = {
  id: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  error?: string
}

export default function TagInput({
  id,
  values,
  onChange,
  placeholder,
  error,
}: TagInputProps) {
  const [input, setInput] = useState("")

  const addTag = () => {
    const trimmed = input.trim()
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed])
    }
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && input === "" && values.length > 0) {
      onChange(values.slice(0, -1))
    }
  }

  const removeTag = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div
        className={`flex min-h-11.25 w-full flex-wrap items-center gap-2 rounded-xl border bg-white px-2 py-2 ${
          error ? "border-red-500" : "border-text-disabled"
        }`}
      >
        {values.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 rounded-full bg-bg-accent px-3 py-1 text-[13px]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              aria-label={`Remove ${tag}`}
              className="text-text-secondary hover:text-state-error"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={values.length === 0 ? placeholder : ""}
          className="min-w-20 flex-1 border-none text-[14px] outline-none"
        />
      </div>
      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  )
}
