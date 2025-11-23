import { useState, useEffect } from 'react';
import Header from './components/Header';
import Marketplace from './pages/Marketplace';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <Marketplace />
      </main>
    </div>
  );
}

export default App;
