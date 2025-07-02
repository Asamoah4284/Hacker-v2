import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      <Navigation />

      {/* Login Section */}
      <section className='relative py-20 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'>
        {/* Blurred Accent Shapes */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#f8e1da] opacity-15 rounded-full blur-3xl pointer-events-none'></div>

        <div className='container mx-auto px-8 md:px-16 xl:px-32 flex justify-center items-center min-h-[calc(100vh-200px)] relative z-10'>
          <div className='w-full max-w-md'>
            {/* Login Form Card */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 md:p-10 animate-fade-in-up'>
              {/* Header */}
              <div className='text-center mb-8'>
                <h1 className='text-3xl font-bold text-white mb-2'>
                  Welcome Back
                </h1>
                <p className='text-[#a1a1aa]'>Sign in to your Kola account</p>
              </div>

              {/* Login Form */}
              <form className='space-y-6'>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-white mb-2'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#d4845b] focus:border-transparent transition-all duration-200'
                    placeholder='Enter your email'
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-white mb-2'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#d4845b] focus:border-transparent transition-all duration-200'
                    placeholder='Enter your password'
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      className='w-4 h-4 text-[#d4845b] bg-white/10 border-white/20 rounded focus:ring-[#d4845b] focus:ring-2'
                    />
                    <span className='ml-2 text-sm text-[#a1a1aa]'>
                      Remember me
                    </span>
                  </label>
                  <Link
                    to='/forgot-password'
                    className='text-sm text-[#d4845b] hover:text-[#f8e1da] transition-colors'
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type='submit'
                  className='w-full py-3 px-6 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold rounded-xl hover:from-[#f1c3b5] hover:to-[#d4845b] transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className='my-8 flex items-center'>
                <div className='flex-1 border-t border-white/20'></div>
                <span className='px-4 text-sm text-[#a1a1aa]'>
                  or continue with
                </span>
                <div className='flex-1 border-t border-white/20'></div>
              </div>

              {/* Social Login Buttons */}
              <div className='space-y-3'>
                <button className='w-full py-3 px-6 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-3'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24'>
                    <path
                      fill='#4285F4'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Continue with Google
                </button>
                <button className='w-full py-3 px-6 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-3'>
                  <svg className='w-5 h-5' fill='#1877F2' viewBox='0 0 24 24'>
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              {/* Sign Up Link */}
              <div className='mt-8 text-center'>
                <p className='text-[#a1a1aa]'>
                  Don't have an account?{' '}
                  <Link
                    to='/signup'
                    className='text-[#d4845b] hover:text-[#f8e1da] font-semibold transition-colors'
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
