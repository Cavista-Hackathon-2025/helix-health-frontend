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
          "border-purple-100 bg-purple-50/50 placeholder:text-purple-400",
          "transition-colors duration-200",
          "focus-visible:border-purple-200 focus-visible:ring-purple-100",
          className,
        )}
      />
    </div>
  )
}

