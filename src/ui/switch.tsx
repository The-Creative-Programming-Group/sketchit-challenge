"use client";

import React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "~/lib/utils";

type Props = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  description?: string;
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  Props
>(({ className, description, ...props }, ref) => (
  <div className="flex flex-col items-center">
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-[33px] w-[64px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-9 data-[state=unchecked]:translate-x-1",
        )}
      />
    </SwitchPrimitives.Root>
    <div className="font-semibold text-sm mt-1">{description}</div>
  </div>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
