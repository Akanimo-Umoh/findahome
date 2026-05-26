import searchIcon from "@/assets/agentImages/icon-search.svg"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"

type SearchProps = {
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function Search({ defaultValue = "", onChange }: SearchProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState(defaultValue)
  const [placeholder, setPlaceholder] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}&page=1`)
    }
  }

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 768) {
        setPlaceholder("Search property here")
      } else {
        setPlaceholder("Search property by name or location")
      }
    }
    updatePlaceholder()
    window.addEventListener("resize", updatePlaceholder)
    return () => window.removeEventListener("resize", updatePlaceholder)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex h-8 w-full items-center justify-center md:h-14">
        <img
          src={searchIcon}
          alt=""
          className="absolute left-3 md:left-4 md:h-6 md:w-6"
        />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onChange?.(e.target.value)
          }}
          className="input-search h-full w-full rounded-xl bg-bg-tertiary pr-4 pl-8 text-[12px] leading-4 outline-none placeholder:text-text-secondary md:rounded-3xl md:pl-13 md:text-[14px]"
        />
      </div>
    </form>
  )
}
