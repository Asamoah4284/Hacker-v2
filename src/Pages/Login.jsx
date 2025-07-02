import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the real API
      const response = await apiService.login(
        formData.email,
        formData.password
      );

      // Store authentication data
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);

        // Store user data if available
        if (response.user) {
          localStorage.setItem('userData', JSON.stringify(response.user));
        }

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Login successful but no token received. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);

      // Show user-friendly error message
      if (
        err.message &&
        (err.message.toLowerCase().includes('user not found') ||
          err.message.toLowerCase().includes('invalid credentials') ||
          err.message.toLowerCase().includes('unauthorized') ||
          err.message.toLowerCase().includes('401') ||
          err.message.toLowerCase().includes('404'))
      ) {
        setError('User not found. Please check your email and password.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#18181b] dark:via-[#232326] dark:to-[#18181b] text-gray-800 dark:text-white'>
      <Navigation />

      {/* Login Section */}
      <motion.section
        className='relative py-20 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Blurred Accent Shapes */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#f8e1da] opacity-15 rounded-full blur-3xl pointer-events-none'></div>

        <div className='container mx-auto px-8 md:px-16 xl:px-32 flex flex-col md:flex-row items-center min-h-[calc(100vh-200px)] relative z-10 gap-12'>
          {/* Left: Image and Welcome Content */}
          <div className='hidden md:flex flex-1 flex-col items-center justify-center text-center'>
            <img
              src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
              alt='African entrepreneur smiling'
              className='w-full max-w-xs rounded-2xl shadow-xl mb-8 object-cover'
            />
            <h2 className='text-3xl font-extrabold text-white mb-4'>
              Welcome to Kola
            </h2>
            <p className='text-lg text-[#a1a1aa] mb-2'>
              Empowering Africa's most innovative entrepreneurs.
            </p>
            <p className='text-base text-[#f8e1da]'>
              Sign in to discover, shop, and support authentic African products
              and stories.
            </p>
          </div>
          {/* Right: Login Form */}
          <div className='w-full max-w-md mx-auto'>
            {/* Login Form Card */}
            <motion.div
              className='bg-white/80 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/10 p-8 md:p-10'
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className='text-center mb-8'>
                <h1 className='text-3xl font-bold text-white mb-2'>
                  Welcome Back
                </h1>
                <p className='text-[#a1a1aa]'>Sign in to your Kola account</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className='mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm'>
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className='space-y-6'>
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/10 border border-gray-300/50 dark:border-gray-600/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4845b] focus:border-transparent transition-all duration-200'
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
                    value={formData.password}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-700/10 border border-gray-300/50 dark:border-gray-600/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4845b] focus:border-transparent transition-all duration-200'
                    placeholder='Enter your password'
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      name='rememberMe'
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
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
                  disabled={isLoading}
                  className='w-full py-3 px-6 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold rounded-xl hover:from-[#f1c3b5] hover:to-[#d4845b] transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* API Info */}
              <div className='mt-6 p-4 bg-[#d4845b]/10 border border-[#d4845b]/20 rounded-xl'>
                <p className='text-sm text-[#a1a1aa] text-center'>
                  <strong className='text-[#d4845b]'>Connected to:</strong>
                  <br />
                  {apiService.API_ENDPOINTS?.LOGIN ||
                    'https://citsa-hackathon-2.onrender.com/auth/login'}
                </p>
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
