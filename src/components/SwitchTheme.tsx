import { useTheme, type Theme } from '@/context/theme'

export function SwitchTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <>
      <select
        title='switch theme'
        className='bg-white text-black dark:bg-black dark:text-white'
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        <option value='system'>System</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
      <p>
        theme: {theme}, resolvedTheme: {resolvedTheme}
      </p>
    </>
  )
}
