import { Content } from '@rspress/core/runtime'
import { useEffect, useRef } from 'react'
import '../home.css'

/** Enhance canonical homepage content without affecting documentation routes. */
export function FlowHome() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return

    const listeners = new AbortController()
    const options = { signal: listeners.signal }
    const tabs = [...element.querySelectorAll<HTMLButtonElement>('[data-story]')]
    const panels = [...element.querySelectorAll<HTMLElement>('.story-panel')]
    const position = element.querySelector<HTMLElement>('#story-position')
    const status = element.querySelector<HTMLElement>('#story-status')

    const selectTab = (tab: HTMLButtonElement, announce = true) => {
      for (const other of tabs) {
        const selected = other === tab
        other.setAttribute('aria-selected', String(selected))
        other.tabIndex = selected ? 0 : -1
      }
      for (const panel of panels) {
        panel.hidden = panel.id !== tab.getAttribute('aria-controls')
      }
      const index = tabs.indexOf(tab) + 1
      if (position) position.textContent = `${index} / ${tabs.length}`
      if (status && announce)
        status.textContent = `${tab.textContent?.trim()}, ${index} of ${tabs.length}.`
    }

    for (const tab of tabs) {
      tab.addEventListener('click', () => selectTab(tab), options)
      tab.addEventListener(
        'keydown',
        (event) => {
          const index = tabs.indexOf(tab)
          let next: HTMLButtonElement | undefined
          if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length]
          if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length]
          if (event.key === 'Home') next = tabs[0]
          if (event.key === 'End') next = tabs.at(-1)
          if (!next) return
          event.preventDefault()
          selectTab(next)
          next.focus()
        },
        options,
      )
    }

    const initialTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? tabs[0]
    if (initialTab) selectTab(initialTab, false)

    for (const button of element.querySelectorAll<HTMLButtonElement>('[data-story-step]')) {
      button.addEventListener(
        'click',
        () => {
          if (!tabs.length) return
          const current = Math.max(
            0,
            tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'),
          )
          const step = Number(button.dataset.storyStep)
          if (!Number.isInteger(step)) return
          const index = ((current + step) % tabs.length + tabs.length) % tabs.length
          selectTab(tabs[index])
        },
        options,
      )
    }

    // The changing visual text leaves the heading's accessible name stable.
    const phrases = [...element.querySelectorAll<HTMLElement>('.hero-changing > span')]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let phraseIndex = Math.max(0, phrases.findIndex((phrase) => phrase.classList.contains('is-current')))
    let interval: number | undefined
    let transition: number | undefined

    const clearMotion = () => {
      window.clearInterval(interval)
      window.clearTimeout(transition)
      for (const phrase of phrases) phrase.classList.remove('is-leaving')
    }

    const syncMotion = () => {
      clearMotion()
      if (reducedMotion.matches) {
        phraseIndex = 0
        phrases.forEach((phrase, index) => phrase.classList.toggle('is-current', index === 0))
      }
      if (phrases.length < 2 || reducedMotion.matches || document.hidden) return
      interval = window.setInterval(() => {
        const previous = phrases[phraseIndex]
        previous.classList.remove('is-current')
        previous.classList.add('is-leaving')
        phraseIndex = (phraseIndex + 1) % phrases.length
        phrases[phraseIndex].classList.add('is-current')
        transition = window.setTimeout(() => previous.classList.remove('is-leaving'), 400)
      }, 3600)
    }

    reducedMotion.addEventListener('change', syncMotion, options)
    document.addEventListener('visibilitychange', syncMotion, options)
    syncMotion()

    return () => {
      listeners.abort()
      clearMotion()
    }
  }, [])

  if (import.meta.env.SSG_MD) return <Content />
  return (
    <div className="flow-home" ref={root}>
      <Content />
    </div>
  )
}
