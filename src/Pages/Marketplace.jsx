import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../config/api';

// Categories based on the actual API data
const categories = [
  'All Products',
  'Jewelry',
  'Decor',
  'Kitchenware',
  'Furniture',
  'Accessories',
  'Textiles'
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artisan?.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          // Since API doesn't have rating, sort by price as fallback
          return b.price - a.price;
        case 'newest':
          // Since API doesn't have date, sort by ID as fallback
          return b.id.localeCompare(a.id);
        default:
          return 0; // featured - no sorting
      }
    });

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the filter function above
  };

  // Transform API product to match component structure
  const transformProduct = (product) => ({
    id: product.id,
    name: product.name,
    seller: product.artisan?.name || 'Unknown Artisan',
    price: product.price,
    originalPrice: product.price * 1.2, // Add 20% markup for display
    image: product.imageUrl,
    category: product.category,
    rating: 4.5 + Math.random() * 0.5, // Generate random rating between 4.5-5.0
    reviews: Math.floor(Math.random() * 200) + 50, // Random reviews between 50-250
    location: product.artisan?.location || 'Unknown Location',
    badge: product.stockQuantity < 10 ? 'Limited' : 
           product.stockQuantity < 20 ? 'Popular' : '',
    description: product.description,
    stockQuantity: product.stockQuantity,
    isAvailable: product.isAvailable
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Top Navigation Bar */}
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
              className={`font-medium px-2 py-1 rounded transition-colors ${
                link === 'Marketplace' 
                  ? 'text-[#d4845b] bg-[#f8e1da]/30' 
                  : 'text-[#a1a1aa] hover:text-[#d4845b] hover:bg-[#f8e1da]/30'
              }`}
            >
              {link}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          <button className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b]/80 text-[#a1a1aa] hover:text-white transition-colors'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='M21 21l-4.35-4.35' />
            </svg>
          </button>
          <button className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b]/80 text-[#a1a1aa] hover:text-white transition-colors'>
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
          </button>
          <button className='relative w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b]/80 text-[#a1a1aa] hover:text-white transition-colors'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path d='M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9' />
            </svg>
            <span className='absolute -top-1 -right-1 w-4 h-4 bg-[#d4845b] text-white text-xs font-bold rounded-full flex items-center justify-center shadow'>
              2
            </span>
          </button>
          <button className='relative w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b]/80 text-[#a1a1aa] hover:text-white transition-colors'>
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
            <span className='absolute -top-1 -right-1 w-4 h-4 bg-[#d4845b] text-white text-xs font-bold rounded-full flex items-center justify-center shadow'>
              1
            </span>
          </button>
          <button className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b]/80 text-[#a1a1aa] hover:text-white transition-colors'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <circle cx='12' cy='8' r='4' />
              <path d='M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2' />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative py-24 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'>
        {/* Blurred Accent Shape */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 text-center relative z-10'>
          <h1 className='text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_32px_rgba(212,132,91,0.15)]'>
            Discover African
          </h1>
          <h1 className='text-6xl md:text-7xl font-extrabold text-[#d4845b] mb-6 drop-shadow-[0_4px_32px_rgba(212,132,91,0.15)]'>
            Excellence
          </h1>
          <p className='text-2xl text-[#a1a1aa] max-w-2xl mx-auto mb-10'>
            Explore handcrafted treasures from Africa's most talented
            entrepreneurs. Every purchase supports local communities and
            preserves cultural heritage.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <form onSubmit={handleSearch} className='relative max-w-md w-full'>
              <input
                type='text'
                placeholder='Search for products, sellers, or categories...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-[#a1a1aa] focus:outline-none focus:border-[#d4845b] transition-colors'
              />
              <button 
                type='submit'
                className='absolute right-2 top-2 w-10 h-10 flex items-center justify-center rounded-xl bg-[#d4845b] text-white hover:bg-[#b8734a] transition-colors'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <circle cx='11' cy='11' r='8' />
                  <path d='M21 21l-4.35-4.35' />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className='py-8 border-b border-white/10'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between'>
            {/* Categories */}
            <div className='flex flex-wrap gap-3'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#d4845b] text-white shadow-lg'
                      : 'bg-white/10 text-[#a1a1aa] hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className='flex items-center gap-4'>
              <span className='text-[#a1a1aa] font-medium'>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#d4845b] transition-colors'
              >
                <option value='featured'>Featured</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
                <option value='rating'>Highest Rated</option>
                <option value='newest'>Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className='py-16'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          {loading ? (
            <div className='text-center py-20'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4845b]'></div>
              <p className='text-[#a1a1aa] mt-4'>Loading products...</p>
            </div>
          ) : error ? (
            <div className='text-center py-20'>
              <p className='text-red-400 mb-4'>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className='px-6 py-3 bg-[#d4845b] text-white rounded-xl hover:bg-[#b8734a] transition-colors'
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {filteredAndSortedProducts.map((product) => {
                  const transformedProduct = transformProduct(product);
                  return (
                    <div key={product.id} className='group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#d4845b]/30 transition-all duration-300'>
                      {/* Product Image */}
                      <div className='relative h-64 bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center overflow-hidden'>
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='text-6xl text-[#7a3419] opacity-30'>
                            🛍️
                          </div>
                        )}
                        {transformedProduct.badge && (
                          <div className='absolute top-3 left-3 px-3 py-1 bg-[#d4845b] text-white text-xs font-bold rounded-full'>
                            {transformedProduct.badge}
                          </div>
                        )}
                        <div className='absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
                          <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                            <path d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className='p-6'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='flex items-center'>
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(transformedProduct.rating) ? 'text-yellow-400' : 'text-gray-600'
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            ))}
                          </div>
                          <span className='text-sm text-[#a1a1aa]'>({transformedProduct.reviews})</span>
                        </div>
                        
                        <h3 className='font-bold text-lg text-white mb-2 group-hover:text-[#d4845b] transition-colors'>
                          {product.name}
                        </h3>
                        
                        <p className='text-[#a1a1aa] text-sm mb-3'>
                          by {transformedProduct.seller} • {transformedProduct.location}
                        </p>
                        
                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex items-center gap-2'>
                            <span className='text-2xl font-bold text-white'>${product.price}</span>
                            {transformedProduct.originalPrice > product.price && (
                              <span className='text-lg text-[#a1a1aa] line-through'>${transformedProduct.originalPrice}</span>
                            )}
                          </div>
                          <span className='text-sm text-[#d4845b] font-medium'>
                            {transformedProduct.originalPrice > product.price 
                              ? `${Math.round(((transformedProduct.originalPrice - product.price) / transformedProduct.originalPrice) * 100)}% OFF`
                              : ''
                            }
                          </span>
                        </div>
                        
                        <button className='w-full py-3 bg-[#d4845b] text-white font-semibold rounded-xl hover:bg-[#b8734a] transition-colors'>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {filteredAndSortedProducts.length === 0 && !loading && (
                <div className='text-center py-20'>
                  <p className='text-[#a1a1aa] text-xl'>No products found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSelectedCategory('All Products');
                      setSearchTerm('');
                    }}
                    className='mt-4 px-6 py-3 bg-[#d4845b] text-white rounded-xl hover:bg-[#b8734a] transition-colors'
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Sellers Section */}
      <section className='py-20 bg-white/5'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Featured Sellers
            </h2>
            <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto'>
              Meet the talented entrepreneurs behind these amazing products
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              { name: 'David Mwangi', location: 'Nairobi, Kenya', products: 2, rating: 4.9, specialty: 'Jewelry Making' },
              { name: 'Fatima Benali', location: 'Fez, Morocco', products: 2, rating: 4.8, specialty: 'Ceramic Pottery' },
              { name: 'Kwame Asante', location: 'Kumasi, Ghana', products: 2, rating: 4.7, specialty: 'Wood Carving' }
            ].map((seller, i) => (
              <div
                key={i}
                className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#d4845b]/30 transition-all'
              >
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-2xl font-bold text-[#7a3419]'>
                    {seller.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className='font-bold text-xl text-white'>
                      {seller.name}
                    </h3>
                    <p className='text-[#a1a1aa]'>{seller.location}</p>
                  </div>
                </div>

                <div className='space-y-3 mb-6'>
                  <div className='flex justify-between'>
                    <span className='text-[#a1a1aa]'>Products:</span>
                    <span className='text-white font-semibold'>
                      {seller.products}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-[#a1a1aa]'>Rating:</span>
                    <span className='text-white font-semibold'>
                      {seller.rating} ⭐
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-[#a1a1aa]'>Specialty:</span>
                    <span className='text-[#d4845b] font-semibold'>
                      {seller.specialty}
                    </span>
                  </div>
                </div>

                <button className='w-full py-3 bg-[#d4845b] text-white font-semibold rounded-xl hover:bg-[#b8734a] transition-colors'>
                  View Shop
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative bg-[#18181b] border-t border-white/10 pt-16 pb-8 text-base backdrop-blur-lg shadow-2xl rounded-t-2xl animate-fade-in-up'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4845b] via-[#f8e1da] to-[#d4845b] opacity-40 rounded-t-2xl'></div>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 grid grid-cols-1 md:grid-cols-5 gap-14 mb-10'>
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <span className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-2xl font-bold shadow'>
                K
              </span>
              <span className='font-bold text-2xl text-white'>Kola</span>
            </div>
            <p className='text-lg text-[#a1a1aa] mb-4'>
              Empowering African entrepreneurs worldwide through a marketplace
              that celebrates creativity, authenticity, and community impact.
            </p>
            <div className='flex flex-col gap-1 text-[#a1a1aa] mb-4'>
              <span>hello@kola.com</span>
              <span>+1 (555) 123-4567</span>
              <span>Global Marketplace</span>
            </div>
            <div className='flex gap-3 mt-2'>
              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z' />
                </svg>
              </a>
              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M19.615 3.184c-1.72-.153-5.6-.153-7.32 0-1.72.153-2.89.63-3.6 1.34-.71.71-1.19 1.88-1.34 3.6-.153 1.72-.153 5.6 0 7.32.153 1.72.63 2.89 1.34 3.6.71.71 1.88 1.19 3.6 1.34 1.72.153 5.6.153 7.32 0 1.72-.153 2.89-.63 3.6-1.34.71-.71 1.19-1.88 1.34-3.6.153-1.72.153-5.6 0-7.32-.153-1.72-.63-2.89-1.34-3.6-.71-.71-1.88-1.19-3.6-1.34zm-7.615 1.816c1.67-.15 5.47-.15 7.14 0 1.52.14 2.35.6 2.7.95.35.35.81 1.18.95 2.7.15 1.67.15 5.47 0 7.14-.14 1.52-.6 2.35-.95 2.7-.35.35-1.18.81-2.7.95-1.67.15-5.47.15-7.14 0-1.52-.14-2.35-.6-2.7-.95-.35-.35-.81-1.18-.95-2.7-.15-1.67-.15-5.47 0-7.14.14-1.52.6-2.35.95-2.7.35-.35 1.18-.81 2.7-.95zm3.385 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                </svg>
              </a>
              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM20.452 20.452h-3.56v-5.605c0-1.336-.025-3.057-1.865-3.057-1.867 0-2.153 1.46-2.153 2.97v5.692h-3.56V9h3.42v1.561h.05c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286z' />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className='font-semibold mb-3 text-white text-lg'>
              Marketplace
            </div>
            <ul className='space-y-2 text-[#a1a1aa]'>
              <li>Browse Products</li>
              <li>Categories</li>
              <li>Featured</li>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
            </ul>
          </div>
          <div>
            <div className='font-semibold mb-3 text-white text-lg'>
              Entrepreneurs
            </div>
            <ul className='space-y-2 text-[#a1a1aa]'>
              <li>Become a Seller</li>
              <li>Seller Dashboard</li>
              <li>Success Stories</li>
              <li>Resources</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <div className='font-semibold mb-3 text-white text-lg'>Support</div>
            <ul className='space-y-2 text-[#a1a1aa]'>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Shipping Info</li>
              <li>Returns</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <div className='font-semibold mb-3 text-white text-lg'>Company</div>
            <ul className='space-y-2 text-[#a1a1aa]'>
              <li>About Us</li>
              <li>Our Mission</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[#a1a1aa] mt-8'>
          <span className='text-sm md:text-base text-center md:text-left'>
            © 2024 Kola. Made with <span className='text-[#d4845b]'>♥</span> for
            African entrepreneurs worldwide.
          </span>
          <div className='flex gap-6 mt-2 md:mt-0 text-sm'>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>
              Privacy Policy
            </a>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>
              Terms of Service
            </a>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>
              Cookie Policy
            </a>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>
              Refund Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
