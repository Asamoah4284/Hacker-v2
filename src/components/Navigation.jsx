import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow border-b border-white/10 px-8 md:px-16 xl:px-32 py-3 flex items-center justify-between gap-8'>
      <div className='flex items-center gap-3'>
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-xl font-bold shadow'>
          K
        </span>
        <span className='font-bold text-xl text-white'>Kola</span>
      </div>
      <div className='hidden md:flex gap-8'>
        {['Home', 'Marketplace', 'Entrepreneur', 'About'].map((link) => (
          <Link
            key={link}
            to={link === 'Home' ? '/' : '/' + link.toLowerCase()}
            className='text-[#a1a1aa] font-medium px-2 py-1 rounded transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30 focus:text-[#d4845b] focus:bg-[#f8e1da]/30'
          >
            {link}
          </Link>
        ))}
      </div>
      <div className='flex items-center gap-4'>
        <Link
          to='/login'
          className='text-[#a1a1aa] font-medium px-4 py-2 rounded-lg transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30 focus:text-[#d4845b] focus:bg-[#f8e1da]/30'
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
