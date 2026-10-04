import { createContext, useContext } from 'react'
import type { RefObject } from 'react'
import type Lenis from 'lenis'

export const LenisRefContext = createContext<RefObject<Lenis | null> | null>(null)

export function useLenisRef() {
  return useContext(LenisRefContext)
}
