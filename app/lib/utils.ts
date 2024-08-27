import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toTitleCase = (str: string | undefined | null) => {
  if (!str) return "";
  return str
    .replace(/^\d+-/, "") // Remove leading numbers
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

// convert `code` with backticks to <code>code</code>
export const codify = (str: string) =>
  str.replace(/`([^`]+)`/g, "<code>$1</code>");
