import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    agreeToTerms: false,
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1 && formData.firstName && formData.lastName && formData.email) {
      setStep(2);
    } else if (step === 2 && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) {
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup data:', formData);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      <Navigation />

      {/* Signup Section */}
      <section className='relative py-20 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'>
        {/* Blurred Accent Shapes */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
                <div className='absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#f1c3b5] opacity-15 rounded-full blur-3xl pointer-events-none'></div>

        <div className='container mx-auto px-8 md:px-16 xl:px-32 flex justify-center items-center min-h-[calc(100vh-200px)] relative z-10'>
          <div className='w-full max-w-md'>
            {/* Logo */}
            <div className='text-center mb-8'>
              <div className='flex items-center justify-center gap-3 mb-4'>
                <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-2xl font-bold shadow'>
                  K
                </span>
                <span className='font-bold text-3xl text-white'>Kola</span>
              </div>
              <h1 className='text-2xl font-bold text-white mb-2'>Join Our Community</h1>
              <p className='text-[#a1a1aa]'>Start your entrepreneurial journey today</p>
            </div>

            {/* Progress Steps */}
            <div className='flex items-center justify-center mb-8'>
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className='flex items-center'>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber 
                      ? 'bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white' 
                      : 'bg-white/10 text-[#a1a1aa]'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step > stepNumber ? 'bg-gradient-to-r from-[#d4845b] to-[#f1c3b5]' : 'bg-white/10'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                      First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                      placeholder='Enter your first name'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                      placeholder='Enter your last name'
                      required
                    />
                  </div>
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
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a1a1aa] hover:text-white transition-colors'
                    >
                      {showPassword ? (
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                        </svg>
                      ) : (
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
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
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a1a1aa] hover:text-white transition-colors'
                    >
                      {showConfirmPassword ? (
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                        </svg>
                      ) : (
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className='text-red-400 text-sm mt-1'>Passwords do not match</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Business Information */}
            {step === 3 && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                    Business Name
                  </label>
                  <input
                    type='text'
                    name='businessName'
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                    placeholder='Enter your business name'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-[#a1a1aa] mb-2'>
                    Business Type
                  </label>
                  <select
                    name='businessType'
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#d4845b] focus:ring-1 focus:ring-[#d4845b] transition-colors'
                    required
                  >
                    <option value='' className='bg-[#232326]'>Select business type</option>
                    <option value='handmade' className='bg-[#232326]'>Handmade & Crafts</option>
                    <option value='fashion' className='bg-[#232326]'>Fashion & Apparel</option>
                    <option value='home' className='bg-[#232326]'>Home & Living</option>
                    <option value='food' className='bg-[#232326]'>Food & Beverages</option>
                    <option value='art' className='bg-[#232326]'>Art & Collectibles</option>
                    <option value='beauty' className='bg-[#232326]'>Beauty & Personal Care</option>
                    <option value='other' className='bg-[#232326]'>Other</option>
                  </select>
                </div>
                <div className='flex items-start gap-3 pt-2'>
                  <input
                    type='checkbox'
                    name='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className='mt-1 w-4 h-4 text-[#d4845b] bg-white/10 border-white/20 rounded focus:ring-[#d4845b] focus:ring-2'
                    required
                  />
                  <label className='text-sm text-[#a1a1aa]'>
                    I agree to the{' '}
                    <a href='#' className='text-[#d4845b] hover:underline'>Terms of Service</a>
                    {' '}and{' '}
                    <a href='#' className='text-[#d4845b] hover:underline'>Privacy Policy</a>
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
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type='button'
                  onClick={handleNext}
                  disabled={
                    (step === 1 && (!formData.firstName || !formData.lastName || !formData.email)) ||
                    (step === 2 && (!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword))
                  }
                  className='flex-1 px-6 py-3 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Next
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={!formData.agreeToTerms}
                  className='flex-1 px-6 py-3 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>

            {/* Login Link */}
            <div className='text-center mt-6'>
              <p className='text-[#a1a1aa]'>
                Already have an account?{' '}
                <Link to='/login' className='text-[#d4845b] hover:underline font-medium'>
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