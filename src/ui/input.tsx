"use client";

import * as React from "react";
import { experimental_useFormStatus } from "react-dom";
import {cn} from "~/lib/utils";

export const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    const { pending } = experimental_useFormStatus();

    return (
        <input
            disabled={pending}
            className={cn(
                "border-8 border-primary text-primary bg-transparent rounded-[1.25rem] py-[1.35rem] px-6 w-full text-[1.1875rem] leading-[1.813rem] placeholder-primary",
                className
            )}
            {...props}
        />
    );
});
Input.displayName = "Input";
