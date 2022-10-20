import { Heading } from '@/components/Heading'
import { Counter } from '@/components/Counter'
import { Theme } from '@/components/Theme'

export function App() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <Heading className='animate-pulse'>Hello World!</Heading>
      <Counter />
      <Theme />
    </div>
  )
}
