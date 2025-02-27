import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-500 border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100",
        primary: "bg-primary text-white border-blue-700 border-2 border-b-4 active:border-b-2 hover:bg-blue-800",
        primaryOutline: "bg-white text-primary hover:bg-slate-200",
        secondary: "bg-orange-500 text-white border-orange-600 border-2 border-b-4 active:border-b-2 hover:bg-orange-500",
        secondaryOutline: "bg-white text-orange-300 hover:bg-slate-200",
        danger: "bg-red-500 text-white border-red-600 border-2 border-b-4 active:border-b-2 hover:bg-red-600",
        dangerOutline: "bg-white text-red-500 hover:bg-slate-200",
        super: "bg-indigo-500 text-white border-indigo-600 border-2 border-b-4 active:border-b-2 hover:bg-indigo-600",
        superOutline: "bg-white text-indigo-500 hover:bg-slate-200",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-500",
        sidebar: "bg-transparent hover:bg-slate-100 text-slate-500 border-2 border-transparent",
        sidebarActive: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
