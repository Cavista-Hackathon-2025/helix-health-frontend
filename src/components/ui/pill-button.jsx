import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function PillButton({ children, selected, onClick, className, ...props }) {
  return (
    <Button
      variant="outline"
      className={cn(
        "rounded-full transition-colors",
        selected ? "bg-blue-100 text-blue-900 hover:bg-blue-200" : "hover:bg-blue-50",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}

