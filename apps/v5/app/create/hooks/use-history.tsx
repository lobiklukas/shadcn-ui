"use client"

import * as React from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"

type HistoryContextValue = {
  canGoBack: boolean
  canGoForward: boolean
  goBack: () => void
  goForward: () => void
}

const HistoryContext = React.createContext<HistoryContextValue | null>(null)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const searchParams = new URLSearchParams(window.location.search)
  const preset = searchParams.get("preset") ?? ""

  const entriesRef = React.useRef<string[]>([preset])
  const indexRef = React.useRef(0)
  const maxIndexRef = React.useRef(0)
  const isNavigatingRef = React.useRef(false)

  const [index, setIndex] = React.useState(0)
  const [maxIndex, setMaxIndex] = React.useState(0)

  React.useEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false
      return
    }

    if (preset === entriesRef.current[indexRef.current]) {
      return
    }

    const nextEntries = entriesRef.current.slice(0, indexRef.current + 1)
    nextEntries.push(preset)
    entriesRef.current = nextEntries

    const nextIndex = nextEntries.length - 1
    indexRef.current = nextIndex
    maxIndexRef.current = nextIndex
    setIndex(nextIndex)
    setMaxIndex(nextIndex)
  }, [preset])

  const canGoBack = index > 0
  const canGoForward = index < maxIndex

  const goBack = React.useCallback(() => {
    if (indexRef.current <= 0) {
      return
    }

    isNavigatingRef.current = true
    const nextIndex = indexRef.current - 1
    indexRef.current = nextIndex
    setIndex(nextIndex)

    const targetPreset = entriesRef.current[nextIndex]
    const params = new URLSearchParams(window.location.search)
    if (targetPreset) {
      params.set("preset", targetPreset)
    } else {
      params.delete("preset")
    }
    const query = params.toString()
    navigate({ to: query ? `${pathname}?${query}` : pathname, replace: true })
  }, [pathname, navigate])

  const goForward = React.useCallback(() => {
    if (indexRef.current >= maxIndexRef.current) {
      return
    }

    isNavigatingRef.current = true
    const nextIndex = indexRef.current + 1
    indexRef.current = nextIndex
    setIndex(nextIndex)

    const targetPreset = entriesRef.current[nextIndex]
    const params = new URLSearchParams(window.location.search)
    if (targetPreset) {
      params.set("preset", targetPreset)
    } else {
      params.delete("preset")
    }
    const query = params.toString()
    navigate({ to: query ? `${pathname}?${query}` : pathname, replace: true })
  }, [pathname, navigate])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) {
        return
      }

      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      const key = e.key.toLowerCase()

      if ((key === "z" && e.shiftKey) || (key === "y" && e.ctrlKey)) {
        e.preventDefault()
        goForward()
        return
      }

      if (key === "z") {
        e.preventDefault()
        goBack()
      }
    }

    document.addEventListener("keydown", down)

    return () => {
      document.removeEventListener("keydown", down)
    }
  }, [goBack, goForward])

  const value = React.useMemo(
    () => ({ canGoBack, canGoForward, goBack, goForward }),
    [canGoBack, canGoForward, goBack, goForward]
  )

  return <HistoryContext value={value}>{children}</HistoryContext>
}

export function useHistory() {
  const context = React.useContext(HistoryContext)
  if (!context) {
    throw new Error("useHistory must be used within HistoryProvider")
  }
  return context
}
