import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function OtherInput({ value, onChange, placeholder = "Please specify", className }) {
  return (
    <div className="mt-2 w-full max-w-md">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "border-blue-100 bg-blue-50/50 placeholder:text-blue-400",
          "transition-colors duration-200",
          "focus-visible:border-blue-200 focus-visible:ring-blue-100",
          className,
        )}
      />
    </div>
  )
}

