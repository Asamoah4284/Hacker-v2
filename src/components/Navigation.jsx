import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to dark mode
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className='sticky top-0 z-50 bg-gray-50/80 dark:bg-gray-900/10 backdrop-blur-lg shadow border-b border-gray-200/50 dark:border-gray-700/10 px-8 md:px-16 xl:px-32 py-3 flex items-center justify-between gap-8'>
      <div className='flex items-center gap-3'>
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-xl font-bold shadow'>
          K
        </span>
        <span className='font-bold text-xl text-gray-800 dark:text-gray-100'>
          Kola
        </span>
      </div>
      <div className='hidden md:flex gap-8'>
        {['Home', 'Marketplace', 'Entrepreneur', 'About'].map((link) => (
          <Link
            key={link}
            to={link === 'Home' ? '/' : '/' + link.toLowerCase()}
            className='text-gray-600 dark:text-gray-400 font-medium px-2 py-1 rounded transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30 dark:hover:bg-[#d4845b]/20 focus:text-[#d4845b] focus:bg-[#f8e1da]/30 dark:focus:bg-[#d4845b]/20'
          >
            {link}
          </Link>
        ))}
      </div>
      <div className='flex items-center gap-4'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-gray-700/10 hover:bg-[#d4845b]/80 dark:hover:bg-[#d4845b]/60 text-gray-600 dark:text-gray-400 hover:text-white transition-colors'
          aria-label='Toggle dark mode'
        >
          {isDarkMode ? (
            // Sun icon for dark mode (click to switch to light)
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path d='M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71' />
              <circle cx='12' cy='12' r='5' />
            </svg>
          ) : (
            // Moon icon for light mode (click to switch to dark)
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
            </svg>
          )}
        </button>

        <Link
          to='/login'
          className='text-gray-600 dark:text-gray-400 font-medium px-4 py-2 rounded-lg transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30 dark:hover:bg-[#d4845b]/20 focus:text-[#d4845b] focus:bg-[#f8e1da]/30 dark:focus:bg-[#d4845b]/20'
        >
          Login
        </Link>
        <Link
          to='/signup'
          className='bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold px-6 py-2 rounded-lg hover:from-[#f1c3b5] hover:to-[#d4845b] transform hover:scale-[1.02] transition-all duration-200 shadow-lg'
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
