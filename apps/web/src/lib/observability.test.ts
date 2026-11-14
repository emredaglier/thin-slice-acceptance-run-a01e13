// @vitest-environment jsdom
import { MOTION_FAULT_EVENT, reportMotionFault } from '@kiln-and-clay/motion'
import { describe, expect, it } from 'vitest'

import { startMotionFaultReporting } from './observability'

const fault = (target: EventTarget, detail: unknown) =>
  target.dispatchEvent(new CustomEvent(MOTION_FAULT_EVENT, { detail }))

describe('startMotionFaultReporting', () => {
  it('forwards each distinct fault once and ignores malformed events', () => {
    const target = new EventTarget()
    const seen: [string, string | undefined][] = []
    startMotionFaultReporting(target, (kind, detail) => seen.push([kind, detail]))
    fault(target, { kind: 'gl-error', detail: 'example' })
    fault(target, { kind: 'gl-error', detail: 'example' })
    fault(target, { kind: 'gl-context-lost', detail: 'example' })
    fault(target, { kind: 'gl-error' })
    fault(target, null)
    fault(target, { detail: 'no kind' })
    expect(seen).toEqual([
      ['gl-error', 'example'],
      ['gl-context-lost', 'example'],
      ['gl-error', undefined],
    ])
  })

  it('stops forwarding after the returned function is called', () => {
    const target = new EventTarget()
    const seen: string[] = []
    const stop = startMotionFaultReporting(target, (kind) => seen.push(kind))
    stop()
    fault(target, { kind: 'gl-error', detail: 'example' })
    expect(seen).toEqual([])
  })

  it('caps how many distinct faults it forwards', () => {
    const target = new EventTarget()
    let count = 0
    startMotionFaultReporting(target, () => count++)
    for (let i = 0; i < 200; i++) fault(target, { kind: 'gl-error', detail: `effect-${i}` })
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(200)
  })

  it('hears what the motion package reports', () => {
    const seen: string[] = []
    const stop = startMotionFaultReporting(window, (kind, detail) => seen.push(`${kind}/${detail}`))
    reportMotionFault('gl-error', 'example')
    stop()
    expect(seen).toEqual(['gl-error/example'])
  })
})
