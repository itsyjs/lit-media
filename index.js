import { map } from 'nanostores'

export const media = map({
  current: [],
})

const defaultBreakpoints = {
  sm: 'screen and (min-width: 480px)',
  md: 'screen and (min-width: 768px)',
  lg: 'screen and (min-width: 990px)'
}

export function setupMedia(breakpoints = defaultBreakpoints) {
  for (const k of Object.keys(breakpoints)) media.setKey(k, null)
  if (typeof window === 'undefined') return

  for (const [mediaName, queryString] of Object.entries(breakpoints)) {
    const query = window.matchMedia(queryString)
    const callback = (e) => {
      media.setKey(mediaName, e.matches)
      media.setKey('current', Object.keys(media.get()).filter(e => e !== 'current' && media.get(e)))
    }
    if (query.addEventListener) query.addEventListener('change', callback)
    else query.addListener(callback)
    callback(query)
  }
}
