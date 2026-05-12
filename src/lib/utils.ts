import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toAnchor(label: string) {
  return label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}
