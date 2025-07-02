import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';

export default function CartsPage() {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const didLoad = useRef(false);
  const navigate = useNavigate();

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

  // Paystack config (recomputed on each render)
  const userData = JSON.parse(localStorage.getItem('userData'));
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: userData?.email || localStorage.getItem('userEmail') || 'customer@example.com',
    amount: total * 15 * 100, // 1 USD = 15 GHS, Paystack expects amount in pesewas
    currency: 'GHS',
    publicKey: 'pk_test_c827720756c17a27051917f50a45e18e1cb423ae',
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onPaystackSuccess = (reference) => {
    setCheckoutMessage('Payment successful! Your order has been placed.');
    setCart([]);
    localStorage.removeItem('cart');
    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

  const onPaystackClose = () => {
    setCheckoutMessage('Payment was cancelled.');
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutMessage('');
    setIsProcessing(true);

    const userData = JSON.parse(localStorage.getItem('userData'));
    let userId = userData?.id;
    if (!userId) {
      try {
        const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser'));
        userId = user?.id || user?._id || user?.userId;
      } catch {}
    }

    // Check if we have a valid userId
    if (!userId) {
      setCheckoutMessage('User not logged in. Please log in to complete your order.');
      setIsProcessing(false);
      return;
    }

    const orderData = {
      userId: userId,
      items: cart,
      total: total,
      reference: `manual_checkout_${Date.now()}`,
      status: 'pending'
    };

    console.log('Sending order data:', orderData);

    try {
      const response = await fetch('https://citsa-hackathon-2.onrender.com/app/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        // Order created, now show Paystack modal
        initializePayment(onPaystackSuccess, onPaystackClose);
      } else {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        setCheckoutMessage(`Error: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setCheckoutMessage('Network error. Please check your connection and try again.');
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
                        <td className='py-4 pr-6'>${item.price.toFixed(2)}</td>
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
                          ${(item.price * item.quantity).toFixed(2)}
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
              <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${
                checkoutMessage.includes('successful') 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}>
                {checkoutMessage}
              </div>
            )}
            
            <div className='flex flex-col md:flex-row justify-between items-center mt-8 gap-6'>
              <div className='text-xl font-bold'>
                Cart Total:{' '}
                <span className='text-[#d4845b]'>${total.toFixed(2)}</span>
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
      <Footer />
    </div>
  );
}
