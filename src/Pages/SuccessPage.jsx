import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Gift, 
  Users, 
  Share2, 
  Copy, 
  ArrowRight,
  Heart,
  Star,
  ShoppingBag
} from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReferralSection, setShowReferralSection] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Debug logging to check for undefined variables
  console.log('SuccessPage component state:', {
    referralLink,
    copied,
    showReferralSection,
    orderDetails
  });

  // Get order details from location state or localStorage
  useEffect(() => {
    console.log('SuccessPage useEffect running...');
    const orderData = location.state?.orderData || JSON.parse(localStorage.getItem('lastOrder')) || {};
    setOrderDetails(orderData);
    
    // Generate referral link on component mount
    const link = generateReferralLink();
    setReferralLink(link);
  }, [location.state]);

  // Function to generate referral link
  const generateReferralLink = () => {
    console.log('Generating referral link for success page...');
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log('User data from localStorage:', userData);
    
    // Try multiple sources for user data
    let userId = userData?.id || userData?._id;
    if (!userId) {
      try {
        const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser'));
        userId = user?.id || user?._id || user?.userId;
      } catch (error) {
        console.log('Error parsing user data from alternative sources:', error);
      }
    }
    
    // Fallback to anonymous if no user data found
    if (!userId) {
      userId = 'anonymous';
      console.log('No user data found, using anonymous');
    }
    
    console.log('Using userId:', userId);
    
    const baseUrl = window.location.origin;
    const referralCode = `${userId}_${Date.now()}`;
    const link = `${baseUrl}/?ref=${referralCode}`;
    
    console.log('Generated referral link:', link);
    
    // Store referral data in localStorage
    localStorage.setItem('referralCode', referralCode);
    localStorage.setItem('referralLink', link);
    
    return link;
  };

  // Function to copy referral link to clipboard
  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log('Referral link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy referral link:', err);
    }
  };

  // Function to handle joining artisan circle
  const handleJoinArtisanCircle = () => {
    setShowReferralSection(true);
    // Scroll to referral section
    setTimeout(() => {
      document.getElementById('referral-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#18181b] dark:via-[#232326] dark:to-[#18181b] text-gray-800 dark:text-white'>
      <Navigation />
      
      {/* Success Hero Section */}
      <motion.section 
        className='relative py-20 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Blurred Accent Shapes */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#f8e1da] opacity-15 rounded-full blur-3xl pointer-events-none'></div>
        
        <div className='container mx-auto px-8 md:px-16 xl:px-32 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            {/* Success Icon */}
            <motion.div 
              className='w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className='w-12 h-12 text-white' />
            </motion.div>
            
            {/* Success Message */}
            <motion.h1 
              className='text-5xl md:text-6xl font-bold text-white mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Payment Successful! 🎉
            </motion.h1>
            
            <motion.p 
              className='text-xl text-[#a1a1aa] mb-8 max-w-2xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for your purchase! Your order has been confirmed and is being processed. 
              You'll receive an email confirmation shortly.
            </motion.p>
            
            {/* Order Summary Card */}
            {orderDetails && (
              <motion.div 
                className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className='text-2xl font-bold text-white mb-4 flex items-center gap-2'>
                  <ShoppingBag className='w-6 h-6' />
                  Order Summary
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-left'>
                  <div>
                    <p className='text-[#a1a1aa]'>Order Total</p>
                    <p className='text-2xl font-bold text-[#d4845b]'>
                      GH₵{orderDetails.total?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div>
                    <p className='text-[#a1a1aa]'>Items</p>
                    <p className='text-xl font-semibold text-white'>
                      {orderDetails.items?.length || 0} items
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Action Buttons */}
            <motion.div 
              className='flex flex-col sm:flex-row gap-4 justify-center items-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={handleJoinArtisanCircle}
                className='px-8 py-4 bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold text-lg rounded-xl hover:from-[#f1c3b5] hover:to-[#d4845b] transition-all duration-200 shadow-lg flex items-center gap-2 group'
              >
                <Users className='w-5 h-5' />
                Join Artisan Circle
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
              
              <button
                onClick={() => navigate('/orders')}
                className='px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center gap-2'
              >
                <Gift className='w-5 h-5' />
                View My Orders
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Referral Section */}
      {showReferralSection && (
        <motion.section 
          id="referral-section"
          className='py-20 bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b]'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className='container mx-auto px-8 md:px-16 xl:px-32'>
            <div className='max-w-4xl mx-auto text-center'>
              <motion.div 
                className='w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Heart className='w-10 h-10 text-white' />
              </motion.div>
              
              <motion.h2 
                className='text-4xl font-bold text-white mb-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome to the Artisan Circle! 🌟
              </motion.h2>
              
              <motion.p 
                className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                You're now part of our vibrant community of creators and customers. 
                Share this referral link with friends and family to help grow our circle!
              </motion.p>
              
              {/* Referral Link Card */}
              <motion.div 
                className='bg-white/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/30 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2 justify-center'>
                  <Share2 className='w-5 h-5' />
                  Your Referral Link
                </h3>
                
                <div className='bg-white/10 rounded-lg p-4 mb-4'>
                  <div className='flex items-center gap-3'>
                    <input
                      type='text'
                      value={referralLink}
                      readOnly
                      className='flex-1 bg-transparent text-white placeholder-white/70 outline-none text-sm md:text-base'
                      placeholder='Generating referral link...'
                    />
                    <button
                      onClick={copyReferralLink}
                      className='px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors flex items-center gap-2'
                    >
                      {copied ? (
                        <>
                          <CheckCircle className='w-4 h-4' />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='w-4 h-4' />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className='text-white/80 text-sm'>
                  Share this link with friends and earn rewards when they join our community!
                </p>
              </motion.div>
              
              {/* Benefits */}
              <motion.div 
                className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className='bg-white/10 rounded-xl p-6 text-center'>
                  <Star className='w-8 h-8 text-white mx-auto mb-3' />
                  <h4 className='font-semibold text-white mb-2'>Earn Rewards</h4>
                  <p className='text-white/80 text-sm'>Get points and discounts for successful referrals</p>
                </div>
                <div className='bg-white/10 rounded-xl p-6 text-center'>
                  <Users className='w-8 h-8 text-white mx-auto mb-3' />
                  <h4 className='font-semibold text-white mb-2'>Grow Community</h4>
                  <p className='text-white/80 text-sm'>Help artisans reach more customers worldwide</p>
                </div>
                <div className='bg-white/10 rounded-xl p-6 text-center'>
                  <Heart className='w-8 h-8 text-white mx-auto mb-3' />
                  <h4 className='font-semibold text-white mb-2'>Support Artisans</h4>
                  <p className='text-white/80 text-sm'>Connect creators with customers who appreciate their work</p>
                </div>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div 
                className='flex flex-col sm:flex-row gap-4 justify-center items-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  onClick={() => navigate('/marketplace')}
                  className='px-8 py-4 bg-white text-[#d4845b] font-semibold text-lg rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg flex items-center gap-2'
                >
                  <ShoppingBag className='w-5 h-5' />
                  Continue Shopping
                </button>
                
                <button
                  onClick={() => navigate('/dashboard')}
                  className='px-8 py-4 bg-white/20 border border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center gap-2'
                >
                  <Gift className='w-5 h-5' />
                  Go to Dashboard
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
      
      <Footer />
    </div>
  );
}