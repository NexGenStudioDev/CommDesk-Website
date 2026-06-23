import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A stricter type for conditional class values, avoiding `any` properties
 * that could mask incorrect inputs.
 */
export type StrictClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | StrictClassDictionary
  | StrictClassArray;

export type StrictClassDictionary = Record<string, boolean | string | number | null | undefined>;
export interface StrictClassArray extends Array<StrictClassValue> {}

/**
 * Utility to conditionally join classNames together and merge Tailwind CSS classes
 * safely without style conflicts.
 *
 * @param inputs - Rest parameters of strict class values. Can be strings, conditionally 
 * formatted objects, arrays, numbers, booleans, undefined, or null.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: StrictClassValue[]): string {
  // `clsx` and `twMerge` gracefully handle falsy or unusual inputs without throwing runtime errors.
  return twMerge(clsx(...inputs));
}
