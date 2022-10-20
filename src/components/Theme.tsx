import { useTheme, type ITheme } from '@/context/theme'

export function Theme() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <>
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
      <p>
        theme: {theme}, resolvedTheme: {resolvedTheme}
      </p>
    </>
  )
}
