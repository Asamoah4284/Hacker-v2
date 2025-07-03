import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import kolaLogo from '../assets/images/logo/kola-logo-gradient.png';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'customer',
    referralCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleNext = () => {
    if (step === 1 && formData.name && formData.email) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType,
      };

      // Only add enteredReferralCode if it's not empty
      if (formData.referralCode && formData.referralCode.trim()) {
        userData.enteredReferralCode = formData.referralCode;
      }

      console.log('User Data:', userData);

      const response = await apiService.register(userData);

      // Log the signup response
      console.log('Signup Response:', response);
      console.log('Response Type:', typeof response);
      console.log('Response Keys:', Object.keys(response));

      // Store user data and token if provided
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      // Redirect to login page or dashboard
      navigate('/login', {
        state: {
          message: 'Account created successfully! Please log in to continue.',
        },
      });
    } catch (err) {
      console.error('Registration error:', err);

      // Handle specific error cases
      if (err.message.includes('email') || err.message.includes('Email')) {
        setError(
          'An account with this email already exists. Please try logging in instead.'
        );
      } else if (
        err.message.includes('password') ||
        err.message.includes('Password')
      ) {
        setError('Password must be at least 6 characters long.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      <Navigation />

      {/* Signup Section */}
      <section className='relative py-20 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'>
        {/* Blurred Accent Shapes */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#f1c3b5] opacity-15 rounded-full blur-3xl pointer-events-none'></div>

        <div className='container mx-auto px-8 md:px-16 xl:px-32 flex flex-col md:flex-row items-center min-h-[calc(100vh-200px)] relative z-10 gap-12'>
          {/* Left: Image and Welcome Content */}
          <div className='hidden md:flex flex-1 flex-col items-center justify-center text-center'>
            <img
              src='https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'
              alt='African entrepreneur smiling'
              className='w-full max-w-xs rounded-2xl shadow-xl mb-8 object-cover'
            />
            <h2 className='text-xl font-extrabold text-white mb-4'>
              Join Kola
            </h2>
            <p className='text-base text-[#a1a1aa] mb-2'>
              Start your entrepreneurial journey with Africa's most vibrant
              marketplace.
            </p>
            <p className='text-sm text-[#f8e1da]'>
              Create an account to discover, shop, and support authentic African
              products and stories.
            </p>
          </div>
          {/* Right: Signup Form */}
          <div className='w-full max-w-md mx-auto'>
            {/* Logo */}
            <div className='text-center mb-8'>
              <div className='flex items-center justify-center mb-4'>
                <img
                  src={kolaLogo}
                  alt='Kola Logo'
                  className='h-16 w-auto object-contain'
                />
              </div>
              <h1 className='text-2xl font-bold text-white mb-2'>
                Join Our Community
              </h1>
              <p className='text-[#a1a1aa]'>
                Start your entrepreneurial journey today
              </p>
            </div>

            {/* Progress Steps */}
            <div className='flex items-center justify-center mb-8'>
              {[1, 2].map((stepNumber) => (
                <div key={stepNumber} className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white'
                        : 'bg-white/10 text-[#a1a1aa]'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 2 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        step > stepNumber
                          ? 'bg-gradient-to-r from-[#d4845b] to-[#f1c3b5]'
                          : 'bg-white/10'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className='mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm'>
                {error}
              </div>
            )}

            {/* Form */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                        placeholder='Enter your full name'
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                        placeholder='Enter your email address'
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                        Account Type
                      </label>
                      <select
                        name='userType'
                        value={formData.userType}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                        disabled={loading}
                      >
                        <option value='customer' className='bg-[#232326]'>
                          Customer
                        </option>
                        <option value='artisan' className='bg-[#232326]'>
                          Artisan/Seller
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                        Referral Code
                      </label>
                      <input
                        type='text'
                        name='referralCode'
                        value={formData.referralCode}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                        placeholder='Enter referral code'
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Security */}
                {step === 2 && (
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                        Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          value={formData.password}
                          onChange={handleInputChange}
                          className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors pr-12'
                          placeholder='Create a strong password'
                          required
                          disabled={loading}
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a1a1aa] hover:text-white transition-colors'
                          disabled={loading}
                        >
                          {showPassword ? (
                            <svg
                              className='w-5 h-5'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                              />
                            </svg>
                          ) : (
                            <svg
                              className='w-5 h-5'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                        Confirm Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name='confirmPassword'
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors pr-12'
                          placeholder='Confirm your password'
                          required
                          disabled={loading}
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a1a1aa] hover:text-white transition-colors'
                          disabled={loading}
                        >
                          {showConfirmPassword ? (
                            <svg
                              className='w-5 h-5'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                              />
                            </svg>
                          ) : (
                            <svg
                              className='w-5 h-5'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className='text-red-400 text-sm mt-1'>
                            Passwords do not match
                          </p>
                        )}
                    </div>
                    <div className='flex items-start gap-3 pt-2'>
                      <input
                        type='checkbox'
                        name='agreeToTerms'
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className='mt-1 w-4 h-4 text-[#d4845b] bg-white/10 border-white/20 rounded focus:ring-[#d4845b] focus:ring-2'
                        required
                        disabled={loading}
                      />
                      <label className='text-sm text-[#a1a1aa]'>
                        I agree to the{' '}
                        <a href='#' className='text-[#d4845b] hover:underline'>
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href='#' className='text-[#d4845b] hover:underline'>
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className='flex gap-3 pt-4'>
                  {step > 1 && (
                    <button
                      type='button'
                      onClick={() => setStep(step - 1)}
                      className='flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors'
                      disabled={loading}
                    >
                      Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      type='button'
                      onClick={handleNext}
                      disabled={!formData.name || !formData.email || loading}
                      className='flex-1 px-6 py-3 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type='submit'
                      disabled={
                        !formData.password ||
                        !formData.confirmPassword ||
                        formData.password !== formData.confirmPassword ||
                        !formData.agreeToTerms ||
                        loading
                      }
                      className='flex-1 px-6 py-3 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    >
                      {loading ? (
                        <>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Login Link */}
            <div className='text-center mt-6'>
              <p className='text-[#a1a1aa]'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='text-[#d4845b] hover:underline font-medium'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
