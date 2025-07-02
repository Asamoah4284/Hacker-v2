import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Categories based on the actual API data
const categories = [
  'All Products',
  'Jewelry',
  'Decor',
  'Kitchenware',
  'Furniture',
  'Accessories',
  'Textiles',
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addToCartMsg, setAddToCartMsg] = useState('');

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
    .filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Products' ||
        product.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
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
    badge:
      product.stockQuantity < 10
        ? 'Limited'
        : product.stockQuantity < 20
        ? 'Popular'
        : '',
    description: product.description,
    stockQuantity: product.stockQuantity,
    isAvailable: product.isAvailable,
  });

  // Add to cart handler
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const idx = cart.findIndex((item) => item.id === product.id);
    if (idx > -1) {
      cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl,
        seller: product.artisan?.name || 'Unknown Artisan',
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddToCartMsg(`${product.name} added to cart!`);
    setTimeout(() => setAddToCartMsg(''), 1500);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Top Navigation Bar */}
      <Navigation />

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
                className='px-4 py-2 bg-[#232326] dark:bg-[#18181b] border border-[#d4845b]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4845b] focus:border-[#d4845b] transition-colors appearance-none'
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg fill='white' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4L10 9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-.7.3z'/></svg>')",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.25em 1.25em',
                }}
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
                    <div
                      key={product.id}
                      className='group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#d4845b]/30 transition-all duration-300'
                    >
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
                      </div>

                      {/* Product Info */}
                      <div className='p-6'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='flex items-center'>
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(transformedProduct.rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-600'
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            ))}
                          </div>
                          <span className='text-sm text-[#a1a1aa]'>
                            ({transformedProduct.reviews})
                          </span>
                        </div>

                        <h3 className='font-bold text-lg text-white mb-2 group-hover:text-[#d4845b] transition-colors'>
                          {product.name}
                        </h3>

                        <p className='text-[#a1a1aa] text-sm mb-3'>
                          by {transformedProduct.seller} •{' '}
                          {transformedProduct.location}
                        </p>

                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex items-center gap-2'>
                            <span className='text-2xl font-bold text-white'>
                              ${product.price}
                            </span>
                            {transformedProduct.originalPrice >
                              product.price && (
                              <span className='text-lg text-[#a1a1aa] line-through'>
                                ${transformedProduct.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className='text-sm text-[#d4845b] font-medium'>
                            {transformedProduct.originalPrice > product.price
                              ? `${Math.round(
                                  ((transformedProduct.originalPrice -
                                    product.price) /
                                    transformedProduct.originalPrice) *
                                    100
                                )}% OFF`
                              : ''}
                          </span>
                        </div>

                        <button
                          className='w-full py-3 bg-[#d4845b] text-white font-semibold rounded-xl hover:bg-[#b8734a] transition-colors'
                          onClick={() => handleAddToCart(transformedProduct)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredAndSortedProducts.length === 0 && !loading && (
                <div className='text-center py-20'>
                  <p className='text-[#a1a1aa] text-xl'>
                    No products found matching your criteria.
                  </p>
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
              {
                name: 'David Mwangi',
                location: 'Nairobi, Kenya',
                products: 2,
                rating: 4.9,
                specialty: 'Jewelry Making',
              },
              {
                name: 'Fatima Benali',
                location: 'Fez, Morocco',
                products: 2,
                rating: 4.8,
                specialty: 'Ceramic Pottery',
              },
              {
                name: 'Kwame Asante',
                location: 'Kumasi, Ghana',
                products: 2,
                rating: 4.7,
                specialty: 'Wood Carving',
              },
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
      <Footer />

      {/* Show add to cart message */}
      {addToCartMsg && (
        <div className='fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#d4845b] text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-up'>
          {addToCartMsg}
        </div>
      )}
    </div>
  );
}
