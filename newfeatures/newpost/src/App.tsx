import { useState, useEffect } from 'react'
import CreatePostPopup from './components/CreatePostPopup'
import { Moon, Sun, PlusSquare } from 'lucide-react'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-300">
      <h1 className="text-3xl font-bold">Create Post Component Demo</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <PlusSquare size={20} />
          Create New Post
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <CreatePostPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default App
