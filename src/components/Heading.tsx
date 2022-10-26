import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface HeadingProps {
  className?: string
  children: ReactNode
}

export function Heading({ className, children }: HeadingProps) {
  return <h1 className={cn('text-9xl', className)}>{children}</h1>
}
