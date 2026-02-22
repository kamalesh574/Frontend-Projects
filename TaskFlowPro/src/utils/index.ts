import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT":
      return "bg-rose-500 text-white";
    case "HIGH":
      return "bg-orange-500 text-white";
    case "MEDIUM":
      return "bg-amber-500 text-white";
    case "LOW":
      return "bg-emerald-500 text-white";
    default:
      return "bg-slate-500 text-white";
  }
};

export const getPriorityLabel = (priority: string) => {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
};
