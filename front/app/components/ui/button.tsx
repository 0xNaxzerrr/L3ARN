const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { className, variant = "default", size = "default", ...props },
  ref
) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "text-primary underline-offset-4 hover:underline": variant === "link",
          "h-9 px-4 py-2": size === "default",
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

export { Button }
