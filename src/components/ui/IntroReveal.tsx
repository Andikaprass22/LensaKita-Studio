import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { siteConfig } from '../../lib/data'
import { easeDrama } from '../../lib/motion'

interface IntroRevealProps {
  duration?: number
}

const SESSION_KEY = 'lensakita:intro-seen'
/** How long to wait for the clip before running the intro anyway (ms). */
const VIDEO_WAIT_CAP = 2500

function alreadySeenThisSession() {
  if (!siteConfig.intro.oncePerSession) return false
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function rememberSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Private mode / storage disabled — the intro simply plays again.
  }
}

export function IntroReveal({ duration = 3600 }: IntroRevealProps) {
  const reduceMotion = !usePrefersMotion()
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [visible, setVisible] = useState(
    () => !reduceMotion && !alreadySeenThisSession(),
  )

  const seconds = duration / 1000

  const dismiss = useCallback(() => {
    setVisible(false)
    rememberSeen()
  }, [])

  // Hard cap: a slow or missing clip must never trap the visitor on the intro.
  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(dismiss, duration + VIDEO_WAIT_CAP)
    return () => window.clearTimeout(timer)
  }, [visible, duration, dismiss])

  // Happy path: the copy is readable and the clip is playing — hold for `duration`.
  useEffect(() => {
    if (!visible || !videoReady) return
    const timer = window.setTimeout(dismiss, duration)
    return () => window.clearTimeout(timer)
  }, [visible, videoReady, duration, dismiss])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          data-testid="intro-reveal"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: easeDrama }}
        >
          {/*
            The clip fades in only once it can actually play, so a slow connection
            never shows a black rectangle. Until then the copy below stands alone.
          */}
          {!videoFailed ? (
            <motion.video
              data-testid="intro-video"
              className="absolute inset-0 h-full w-full object-cover"
              src={siteConfig.intro.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={
                videoReady
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.08 }
              }
              transition={{
                opacity: { duration: 0.8, ease: 'easeOut' },
                scale: { duration: seconds, ease: 'linear' },
              }}
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
            />
          ) : null}

          <div aria-hidden="true" className="absolute inset-0 bg-ink-950/65" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.8)_100%)]"
          />

          <motion.div
            className="relative flex flex-col items-center gap-5 px-6 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeDrama }}
          >
            <span className="text-[11px] uppercase tracking-[0.55em] text-brand-300">
              {siteConfig.tagline}
            </span>

            <motion.span
              aria-hidden="true"
              className="h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '16rem', opacity: 1 }}
              transition={{ duration: 0.9, ease: easeDrama, delay: 0.35 }}
            />

            <span className="font-display text-4xl text-ink-50 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-6xl">
              {siteConfig.businessName}
            </span>
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-[calc(2rem_+_env(safe-area-inset-bottom))] rounded-full border border-ink-600 bg-ink-950/50 px-5 py-2 text-xs uppercase tracking-widest text-ink-200 backdrop-blur transition-colors hover:border-brand-400 hover:text-brand-300"
          >
            Lewati intro
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
