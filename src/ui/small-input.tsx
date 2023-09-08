"use client";

import * as React from "react";
import { experimental_useFormStatus } from "react-dom";
import { cn } from "~/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    description?: string;
};
export const SmallInput = React.forwardRef<
    HTMLInputElement,
    Props
>(({ className, description,...props }, ref) => {
    const { pending } = experimental_useFormStatus();

    return (
        <div className="flex flex-col items-center">
        <input
            disabled={pending}
            className={cn(
                "text-background bg-primary rounded-[1.25rem] font-semibold w-full text-[0.85rem] text-center h-[33px] w-[64px] leading-[1.813rem] placeholder-primary",
                className,
            )}
            {...props}
        />
            <div className="font-semibold text-sm mt-1">{description}</div>
        </div>
    );
});
SmallInput.displayName = "Input";
