import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function useCartCount() {
  const [cartCount, setCartCount] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    function handleStorage() {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
      } catch {
        setCartCount(0);
      }
    }
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 500);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  return cartCount;
}

export default function Navigation() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to dark mode
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const cartCount = useCartCount();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

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

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');

    // Redirect to home page
    navigate('/');
  };

  return (
    <nav className='sticky top-0 z-50 bg-gray-50/80 dark:bg-gray-900/10 backdrop-blur-lg shadow border-b border-gray-200/50 dark:border-gray-700/10 px-8 md:px-16 xl:px-32 py-3 flex items-center justify-between gap-8'>
      <div className='flex items-center gap-3'>
        {/* Hamburger for mobile (left of logo) */}
        <button
          className='md:hidden mr-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4845b] hover:bg-[#f8e1da]/40 dark:hover:bg-[#232326]/40 transition-colors'
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          {mobileNavOpen ? (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
        <NavLink to='/' className='flex items-center gap-3 group'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-xl font-bold shadow group-hover:scale-105 transition-transform'>
            K
          </span>
          <span className='font-bold text-xl text-gray-800 dark:text-gray-100 group-hover:text-[#d4845b] transition-colors hidden md:inline'>
            Kola
          </span>
        </NavLink>
      </div>
      <div className='hidden md:flex gap-8'>
        {['Home', 'Marketplace', 'Entrepreneur', 'About'].map((link) => (
          <NavLink
            key={link}
            to={link === 'Home' ? '/' : '/' + link.toLowerCase()}
            className={({ isActive }) =>
              `font-medium px-2 py-1 rounded transition-colors focus:text-[#d4845b] focus:bg-[#f8e1da]/30 dark:focus:bg-[#d4845b]/20 ` +
              (isActive
                ? 'text-[#d4845b] bg-[#f8e1da]/50 dark:bg-[#d4845b]/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#d4845b] hover:bg-[#f8e1da]/30 dark:hover:bg-[#d4845b]/20')
            }
            end={link === 'Home'}
          >
            {link}
          </NavLink>
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

        {isLoggedIn ? (
          <>
            {/* Cart Icon */}
            <Link
              to='/cart'
              className='relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-white/10 hover:bg-[#d4845b]/80 text-gray-600 dark:text-[#a1a1aa] hover:text-white transition-colors'
              aria-label='View cart'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <circle cx='9' cy='21' r='1' />
                <circle cx='20' cy='21' r='1' />
                <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
              </svg>
              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 w-4 h-4 bg-[#d4845b] text-white text-xs font-bold rounded-full flex items-center justify-center shadow'>
                  {cartCount}
                </span>
              )}
            </Link>
            {/* User Avatar Dropdown */}
            <div className='relative' ref={menuRef}>
              <button
                onClick={() => setShowMenu((v) => !v)}
                className={`w-11 h-11 flex items-center justify-center rounded-full border-2 ${
                  showMenu
                    ? 'border-[#d4845b]'
                    : 'border-gray-200 dark:border-[#d4845b]'
                } bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4845b] hover:scale-105 active:scale-95 cursor-pointer`}
                aria-label='User menu'
                tabIndex={0}
              >
                {userData?.img ? (
                  <img
                    src={userData.img}
                    alt={userData.name || userEmail || 'User'}
                    className='w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900'
                  />
                ) : (
                  <span className='text-lg font-bold text-[#7a3419] drop-shadow-sm select-none'>
                    {userData?.name
                      ? userData.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                      : userEmail
                      ? userEmail[0].toUpperCase()
                      : 'U'}
                  </span>
                )}
              </button>
              {showMenu && (
                <div className='absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-4 px-6 z-50 animate-fade-in-up'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-xl font-bold text-[#7a3419] shadow'>
                      {userData?.img ? (
                        <img
                          src={userData.img}
                          alt={userData.name || userEmail || 'User'}
                          className='w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900'
                        />
                      ) : userData?.name ? (
                        userData.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                      ) : userEmail ? (
                        userEmail[0].toUpperCase()
                      ) : (
                        'U'
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='text-xs text-gray-400 dark:text-gray-500 mb-1'>
                        Signed in as
                      </div>
                      <div className='font-bold text-lg text-gray-800 dark:text-white truncate'>
                        {userData?.name || 'User'}
                      </div>
                      <div className='text-sm text-gray-500 dark:text-gray-400 truncate'>
                        {userEmail}
                      </div>
                    </div>
                  </div>
                  <Link
                    to='/dashboard'
                    className='block w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-[#f8e1da] dark:hover:bg-[#d4845b]/20 transition-colors mb-2'
                    onClick={() => setShowMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to='/orders'
                    className='block w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-[#f8e1da] dark:hover:bg-[#d4845b]/20 transition-colors mb-2'
                    onClick={() => setShowMenu(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 mt-2'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Not logged in - show login/signup
          <div className='flex items-center gap-4'>
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
        )}
      </div>
      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden'
          onClick={() => setMobileNavOpen(false)}
        >
          <nav
            className='fixed left-0 top-0 z-50 w-64 h-full bg-white dark:bg-[#18181b] shadow-xl p-8 flex flex-col gap-6 transition-transform duration-300 md:hidden'
            style={{
              transform: mobileNavOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='self-end mb-6 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4845b] hover:bg-[#f8e1da]/40 dark:hover:bg-[#232326]/40 transition-colors'
              aria-label='Close menu'
              onClick={() => setMobileNavOpen(false)}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
            {['Home', 'Marketplace', 'Entrepreneur', 'About'].map((link) => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : '/' + link.toLowerCase()}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-colors ` +
                  (isActive
                    ? 'text-[#d4845b] bg-[#f8e1da]/60 dark:bg-[#d4845b]/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#d4845b] hover:bg-[#f8e1da]/30 dark:hover:bg-[#d4845b]/20')
                }
                end={link === 'Home'}
                onClick={() => setMobileNavOpen(false)}
              >
                {link}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
}
