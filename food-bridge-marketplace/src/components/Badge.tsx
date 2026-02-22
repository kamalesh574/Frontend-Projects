/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { cn } from "../utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className,
}) => {
  const variants = {
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    error: "bg-rose-100 text-rose-700 border-rose-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    neutral: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 text-xs font-bold rounded-full border uppercase tracking-wider",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
