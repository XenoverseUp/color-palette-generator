import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export default function cx(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export type Class = ClassValue
