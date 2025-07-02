import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';

export default function CartsPage() {
  const [cart, setCart] = useState([]);
  const didLoad = useRef(false);

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
            <div className='flex flex-col md:flex-row justify-between items-center mt-8 gap-6'>
              <div className='text-xl font-bold'>
                Cart Total:{' '}
                <span className='font-bold text-2xl text-[#d4845b]'>
                  GH₵{total.toFixed(2)}
                </span>
              </div>
              <button
                className='px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold text-lg hover:from-[#f1c3b5] hover:to-[#d4845b] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
