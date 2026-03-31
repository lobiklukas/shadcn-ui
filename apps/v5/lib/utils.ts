import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAppUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  if (import.meta.env?.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL as string
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:4000"
}

export function absoluteUrl(path: string) {
  return `${getAppUrl()}${path}`
}
