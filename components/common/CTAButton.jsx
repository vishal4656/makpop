import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTAButton({ children, href, variant = "default", showIcon = true, ...props }) {
  return (
    <Button variant={variant} size="lg" className="font-medium" {...props}>
      {children}
      {showIcon && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  )
}
