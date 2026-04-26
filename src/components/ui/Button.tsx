import * as React from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "ghost"
type Size = "sm" | "md" | "lg"

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-cream text-black hover:bg-white",
  ghost:
    "bg-transparent text-cream/85 hover:text-cream hover:bg-white/[0.04] border border-white/10",
}
const SIZE: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-accent/60",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = "Button"
