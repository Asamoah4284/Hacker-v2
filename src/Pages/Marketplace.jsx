import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Handcrafted Beaded Necklace',
    seller: "Ama's Creations",
    price: 45,
    originalPrice: 60,
    image: '',
    category: 'Jewelry',
    rating: 4.8,
    reviews: 127,
    location: 'Ghana',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Organic Shea Butter Soap',
    seller: 'Natural Beauty Co.',
    price: 12,
    originalPrice: 15,
    image: '',
    category: 'Beauty',
    rating: 4.9,
    reviews: 89,
    location: 'Nigeria',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Wax Print Fabric Scarf',
    seller: 'Kente Dreams',
    price: 28,
    originalPrice: 35,
    image: '',
    category: 'Fashion',
    rating: 4.7,
    reviews: 203,
    location: 'Kenya',
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'Handwoven Basket',
    seller: 'Artisan Crafts',
    price: 65,
    originalPrice: 80,
    image: '',
    category: 'Home & Living',
    rating: 4.6,
    reviews: 156,
    location: 'Senegal',
    badge: '',
  },
  {
    id: 5,
    name: 'Baobab Oil Face Serum',
    seller: 'African Botanicals',
    price: 32,
    originalPrice: 40,
    image: '',
    category: 'Beauty',
    rating: 4.8,
    reviews: 94,
    location: 'Tanzania',
    badge: 'Limited',
  },
  {
    id: 6,
    name: 'Leather Sandals',
    seller: 'Sole Stories',
    price: 55,
    originalPrice: 70,
    image: '',
    category: 'Fashion',
    rating: 4.5,
    reviews: 178,
    location: 'Ethiopia',
    badge: '',
  },
  {
    id: 7,
    name: 'Ceramic Coffee Mug',
    seller: 'Pottery Plus',
    price: 18,
    originalPrice: 25,
    image: '',
    category: 'Home & Living',
    rating: 4.7,
    reviews: 112,
    location: 'Morocco',
    badge: 'Trending',
  },
  {
    id: 8,
    name: 'Beaded Earrings Set',
    seller: 'Jewelry Junction',
    price: 22,
    originalPrice: 30,
    image: '',
    category: 'Jewelry',
    rating: 4.4,
    reviews: 67,
    location: 'Uganda',
    badge: '',
  },
];

const categories = [
  'All Products',
  'Fashion',
  'Jewelry',
  'Beauty',
  'Home & Living',
  'Art & Crafts',
  'Food & Beverages',
  'Books & Media',
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === 'All Products' ||
      product.category === selectedCategory
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Top Navigation Bar (same as About) */}
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
            <div className='relative max-w-md w-full'>
              <input
                type='text'
                placeholder='Search for products, sellers, or categories...'
                className='w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-[#a1a1aa] focus:outline-none focus:border-[#d4845b] transition-colors'
              />
              <button className='absolute right-2 top-2 w-10 h-10 flex items-center justify-center rounded-xl bg-[#d4845b] text-white hover:bg-[#b8734a] transition-colors'>
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
            </div>
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#d4845b]/30 transition-all duration-300'
              >
                {/* Product Image */}
                <div className='relative h-64 bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center'>
                  <div className='text-6xl text-[#7a3419] opacity-30'>🛍️</div>
                  {product.badge && (
                    <div className='absolute top-3 left-3 px-3 py-1 bg-[#d4845b] text-white text-xs font-bold rounded-full'>
                      {product.badge}
                    </div>
                  )}
                  <div className='absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
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
                            i < Math.floor(product.rating)
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
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className='font-bold text-lg text-white mb-2 group-hover:text-[#d4845b] transition-colors'>
                    {product.name}
                  </h3>

                  <p className='text-[#a1a1aa] text-sm mb-3'>
                    by {product.seller} • {product.location}
                  </p>

                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                      <span className='text-2xl font-bold text-white'>
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className='text-lg text-[#a1a1aa] line-through'>
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className='text-sm text-[#d4845b] font-medium'>
                      {product.originalPrice > product.price
                        ? `${Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}% OFF`
                        : ''}
                    </span>
                  </div>

                  <button className='w-full py-3 bg-[#d4845b] text-white font-semibold rounded-xl hover:bg-[#b8734a] transition-colors'>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className='text-center mt-12'>
            <button className='px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-[#d4845b] hover:border-[#d4845b] transition-all'>
              Load More Products
            </button>
          </div>
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
                name: "Ama's Creations",
                location: 'Ghana',
                products: 45,
                rating: 4.9,
                specialty: 'Jewelry & Accessories',
              },
              {
                name: 'Natural Beauty Co.',
                location: 'Nigeria',
                products: 32,
                rating: 4.8,
                specialty: 'Organic Beauty',
              },
              {
                name: 'Kente Dreams',
                location: 'Kenya',
                products: 28,
                rating: 4.7,
                specialty: 'Traditional Fashion',
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

      {/* Footer (same as About) */}
      <Footer />
    </div>
  );
}
