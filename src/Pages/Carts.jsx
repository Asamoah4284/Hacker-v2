import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartsPage() {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  const didLoad = useRef(false);
  const navigate = useNavigate();

  const copyReferralLink = () => {
    console.log('Copying referral link:', referralLink);
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy referral link:', err);
    });
  };

  // Function to load cart from localStorage
  const loadCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(stored);
      console.log('Loaded cart from localStorage:', stored);
    } catch {
      setCart([]);
      console.log('Failed to load cart from localStorage');
    }
  };

  // Load cart on mount and when storage changes or tab becomes visible
  useEffect(() => {
    loadCart();
    function handleStorage() {
      loadCart();
    }
    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        loadCart();
      }
    }
    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Only update localStorage after initial load
  useEffect(() => {
    if (didLoad.current) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      didLoad.current = true;
    }
  }, [cart]);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Placeholder payment config (Paystack removed)
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  // Placeholder payment success handler
  const onPaymentSuccess = () => {
    console.log('Payment successful, showing referral modal');
    setCheckoutMessage('Payment successful! Your order has been placed.');
    
    // Generate referral link
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?.id || 'user';
    const baseUrl = window.location.origin;
    const referralUrl = `${baseUrl}/marketplace?ref=${userId}`;
    setReferralLink(referralUrl);
    
    // Show referral modal
    setShowReferralModal(true);
    console.log('Referral modal should now be visible');
  };

  // Placeholder payment close handler
  const onPaymentClose = () => {
    console.log('Payment modal closed');
    setCheckoutMessage('Payment was cancelled.');
    // If cart is empty (meaning order was successful), show success page
    if (cart.length === 0) {
      console.log('Cart is empty, navigating to success page');
      setTimeout(() => {
        navigate('/success');
      }, 1000);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutMessage('');
    setIsProcessing(true);

    const userData = JSON.parse(localStorage.getItem('userData'));
    let userId = userData?.id;
    if (!userId) {
      try {
        const user =
          JSON.parse(localStorage.getItem('user')) ||
          JSON.parse(localStorage.getItem('currentUser'));
        userId = user?.id || user?._id || user?.userId;
      } catch {}
    }

    // Check if we have a valid userId
    if (!userId) {
      setCheckoutMessage(
        'User not logged in. Please log in to complete your order.'
      );
      setIsProcessing(false);
      return;
    }

    const orderData = {
      userId: userId,
      items: cart,
      total: total,
      reference: `manual_checkout_${Date.now()}`,
      status: 'pending',
    };

    console.log('Sending order data:', orderData);

    try {
      const response = await fetch(
        'https://citsa-hackathon-2.onrender.com/app/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );

      console.log('Response status:', response.status);

      if (response.ok) {
        // Order created, clear cart immediately
        setCart([]);
        localStorage.removeItem('cart');
        
        // Placeholder: Simulate payment success (Paystack removed)
        console.log('Order created successfully, simulating payment success');
        setTimeout(() => {
          onPaymentSuccess();
        }, 1000);
        
        navigate('/success')
      } else {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        setCheckoutMessage(`Error: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setCheckoutMessage(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#18181b] dark:via-[#232326] dark:to-[#18181b] text-gray-800 dark:text-white'>
      <Navigation />
      <section className='container mx-auto px-8 md:px-16 xl:px-32 py-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white/80 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/10 p-8 md:p-10'>
            <h1 className='text-3xl font-bold mb-8 text-center'>My Cart</h1>
            {cart.length === 0 ? (
              <div className='text-center text-gray-400 dark:text-gray-500 py-16'>
                Your cart is empty.
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full text-sm'>
                  <thead>
                    <tr className='text-left border-b border-gray-200 dark:border-gray-700'>
                      <th className='py-3 pr-6 font-semibold'>Product</th>
                      <th className='py-3 pr-6 font-semibold'>Seller</th>
                      <th className='py-3 pr-6 font-semibold'>Price</th>
                      <th className='py-3 pr-6 font-semibold'>Quantity</th>
                      <th className='py-3 pr-6 font-semibold'>Total</th>
                      <th className='py-3 font-semibold'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr
                        key={item.id}
                        className='border-b border-gray-100 dark:border-gray-800 hover:bg-[#f8e1da]/20 dark:hover:bg-[#232326]/40 transition'
                      >
                        <td className='py-4 pr-6 font-semibold'>
                          <div className='flex items-center gap-4'>
                            <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-2xl font-bold text-[#7a3419] shadow'>
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className='w-full h-full object-cover rounded-xl'
                                />
                              ) : (
                                item.name[0]
                              )}
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className='py-4 pr-6'>{item.seller}</td>
                        <td className='py-4 pr-6'>
                          <span className='font-bold text-lg text-white'>
                            GH₵{item.price}
                          </span>
                        </td>
                        <td className='py-4 pr-6'>
                          <div className='flex items-center gap-2'>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white font-bold flex items-center justify-center hover:bg-[#f8e1da] dark:hover:bg-[#d4845b]/30 transition'
                            >
                              -
                            </button>
                            <span className='px-2 font-semibold'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white font-bold flex items-center justify-center hover:bg-[#f8e1da] dark:hover:bg-[#d4845b]/30 transition'
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className='py-4 pr-6 font-semibold'>
                          <span className='font-bold text-lg text-white'>
                            GH₵{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className='py-4'>
                          <button
                            onClick={() => removeItem(item.id)}
                            className='px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow'
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {checkoutMessage && (
              <div
                className={`mt-6 p-4 rounded-lg text-center font-semibold ${
                  checkoutMessage.includes('successful')
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}
              >
                {checkoutMessage}
              </div>
            )}

            <div className='flex flex-col md:flex-row justify-between items-center mt-8 gap-6'>
              <div className='text-xl font-bold'>
                Cart Total:{' '}
                <span className='font-bold text-2xl text-[#d4845b]'>
                  GH₵{total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0 || isProcessing}
                className='px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold text-lg hover:from-[#f1c3b5] hover:to-[#d4845b] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Referral Modal */}
      {console.log('Modal visibility state:', showReferralModal, 'Referral link:', referralLink)}
      {showReferralModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4845b] to-[#f1c3b5] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Join the Artisans Circle!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for your purchase! 🎉 You're now part of our artisan community. Share this referral link with friends and family to help grow our circle of creators and customers.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none"
                  />
                  <button
                    onClick={copyReferralLink}
                    className="px-3 py-1 rounded-lg bg-[#d4845b] text-white text-sm font-semibold hover:bg-[#f1c3b5] transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    console.log('User clicked View Success Page');
                    setShowReferralModal(false);
                    setTimeout(() => {
                      console.log('Navigating to success page');
                      navigate('/success');
                    }, 300);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  View Success Page
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowReferralModal(false);
                      setTimeout(() => {
                        navigate('/orders');
                      }, 300);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    View Orders
                  </button>
                  <button
                    onClick={() => setShowReferralModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold hover:from-[#f1c3b5] hover:to-[#d4845b] transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
