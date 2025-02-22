import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function PillButton({ children, selected, onClick, className, ...props }) {
  return (
    <Button
      variant="outline"
      className={cn(
        "rounded-full transition-colors",
        selected ? "bg-purple-100 text-purple-900 hover:bg-purple-200" : "hover:bg-purple-50",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}

