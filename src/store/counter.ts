import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

const _count = atom(0)

export function useCounter() {
  return useStore(_count)
}

export function increment() {
  _count.set(_count.get() + 1)
}

export function decrement() {
  _count.set(_count.get() - 1)
}
