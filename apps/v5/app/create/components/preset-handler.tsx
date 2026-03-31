"use client"

import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { generateRandomPreset, isPresetCode } from "shadcn/preset"

import { useDesignSystemSearchParams } from "@/app/create/lib/search-params"

export function PresetHandler() {
  const navigate = useNavigate()
  const [params, setParams] = useDesignSystemSearchParams()
  const hasConverted = React.useRef(false)

  React.useEffect(() => {
    if (params.preset === "random") {
      navigate({ to: `/create?preset=${generateRandomPreset()}`, replace: true })
    }
  }, [params.preset, navigate])

  React.useEffect(() => {
    if (hasConverted.current) {
      return
    }
    hasConverted.current = true

    if (!params.preset || params.preset === "random") {
      return
    }

    if (isPresetCode(params.preset)) {
      return
    }

    setParams({ base: params.base })
  }, [params.preset, params.base, setParams])

  return null
}
