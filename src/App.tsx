import { useTheme, type ITheme } from './context/theme'
import Counter from '@/components/Counter'

export function App() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <h1 className='text-6xl font-bold underline'>Hello world!</h1>
      <p>
        theme: {theme}, resolvedTheme: {resolvedTheme}
      </p>
      <select
        title='switch theme'
        className='bg-white text-black dark:bg-black dark:text-white'
        value={theme}
        onChange={(e) => setTheme(e.target.value as ITheme)}
      >
        <option value='system'>System</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
      <Counter />
    </div>
  )
}
