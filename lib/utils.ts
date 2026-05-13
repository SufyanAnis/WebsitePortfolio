import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — class name composer.
 * Combines clsx (conditional class joining) with tailwind-merge
 * (resolves conflicting utilities like "px-2 px-4" → "px-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation. Used by smooth cursor + scroll animations.
 */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
