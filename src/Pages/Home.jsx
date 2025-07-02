import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Globe,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../index.css'; // Ensure custom CSS is loaded

// Import local hero images
import hero1 from '../assets/images/hero/hero-1.webp';
import hero2 from '../assets/images/hero/hero-2.webp';
import hero3 from '../assets/images/hero/hero-3.webp';
import hero4 from '../assets/images/hero/hero-4.webp';
import hero5 from '../assets/images/hero/hero-5.webp';

// Local UI components
function Button({ children, className = '', variant, size, ...props }) {
  let base =
    'inline-flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm';
  let variants = {
    outline:
      'border border-[#f1c3b5] bg-transparent text-[#d4845b] hover:bg-[#f8e1da] hover:text-[#7a3419]',
    default: 'bg-[#d4845b] hover:bg-[#b96a4b] text-white',
  };
  let sizes = {
    lg: 'px-8 py-3 text-lg rounded-full',
    sm: 'px-4 py-2 text-sm rounded',
    default: 'px-6 py-2 rounded',
  };
  let variantClass = variant ? variants[variant] : variants.default;
  let sizeClass = size ? sizes[size] : sizes.default;
  return (
    <button
      className={`${base} ${variantClass} ${sizeClass} ${className} hover:scale-[1.04] active:scale-95 transition-transform`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl shadow-xl bg-white/80 dark:bg-gray-800/10 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/10 ${className} transition-all duration-200 hover:shadow-2xl hover:-translate-y-1`}
    >
      {children}
    </div>
  );
}
function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-semibold ${className} bg-[#f8e1da] text-[#7a3419] shadow`}
    >
      {children}
    </span>
  );
}
function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 rounded bg-gray-200/80 dark:bg-gray-700/80 border-none text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d4845b] ${className}`}
      {...props}
    />
  );
}

const heroImages = [
  {
    id: 1,
    src: hero1,
    alt: 'African woman entrepreneur working on traditional textiles',
    name: 'Kofi Pottery',
    location: 'Kumasi, Ghana',
  },
  {
    id: 2,
    src: hero2,
    alt: 'African craftsman creating beautiful wooden sculptures',
    name: 'Kwame Woodcraft',
    location: 'Accra, Ghana',
  },
  {
    id: 3,
    src: hero3,
    alt: 'African fashion designer showcasing traditional patterns',
    name: 'Zara Fashion House',
    location: 'Cape Town, South Africa',
  },
  {
    id: 4,
    src: hero4,
    alt: 'Nigerian artisan crafting traditional beaded jewelry',
    name: 'Adunni Beads',
    location: 'Lagos, Nigeria',
  },
  {
    id: 5,
    src: hero5,
    alt: 'Kenyan artisan weaving traditional kiondo baskets',
    name: 'Maua Baskets',
    location: 'Nairobi, Kenya',
  },
];

const stats = [
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <Users className='h-6 w-6 text-[#d4845b]' />
      </div>
    ),
    value: '2,500+',
    label: 'Active Entrepreneurs',
  },
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <Globe className='h-6 w-6 text-[#d4845b]' />
      </div>
    ),
    value: '54',
    label: 'Countries Represented',
  },
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <ShoppingBag className='h-6 w-6 text-[#d4845b]' />
      </div>
    ),
    value: '125K+',
    label: 'Products Sold',
  },
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <Star className='h-6 w-6 text-[#d4845b]' />
      </div>
    ),
    value: '4.9',
    label: 'Average Rating',
  },
];

const platformFeatures = [
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <ShieldCheck className='h-7 w-7 text-[#d4845b]' />
      </div>
    ),
    title: 'Verified Entrepreneurs',
    desc: 'Every entrepreneur is verified to ensure authenticity, quality products',
  },
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <Heart className='h-7 w-7 text-[#d4845b]' />
      </div>
    ),
    title: 'Direct Impact',
    desc: 'Your purchases directly support entrepreneurs and their communities',
  },
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <CheckCircle className='h-7 w-7 text-[#d4845b]' />
      </div>
    ),
    title: 'Quality Guaranteed',
    desc: 'All products meet our high standards for craftsmanship and materials',
  },
  {
    icon: (
      <div className='bg-[#f8e1da] rounded-xl p-3 mb-2 flex items-center justify-center'>
        <Truck className='h-7 w-7 text-[#d4845b]' />
      </div>
    ),
    title: 'Fast Shipping',
    desc: 'Quick and secure delivery worldwide with tracking included',
  },
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [entrepreneursLoading, setEntrepreneursLoading] = useState(true);
  const [entrepreneursError, setEntrepreneursError] = useState(null);

  // Fetch featured products from API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        // Take first 4 products as featured
        const products = data.products || [];
        const featured = products.slice(0, 4).map((product) => ({
          badge:
            product.stockQuantity < 10
              ? 'Limited'
              : product.stockQuantity < 20
              ? 'Popular'
              : 'Featured',
          name: product.name,
          seller: product.artisan?.name || 'Unknown Artisan',
          rating: 4.5 + Math.random() * 0.5, // Generate random rating between 4.5-5.0
          reviews: Math.floor(Math.random() * 200) + 50, // Random reviews between 50-250
          price: product.price,
          oldPrice: product.price * 1.2, // Add 20% markup for display
          btn: 'View',
          imageUrl: product.imageUrl,
          id: product.id,
        }));
        setFeaturedProducts(featured);
      } catch {
        setError('Failed to fetch featured products');
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch 3 entrepreneurs (artisans) from API
  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        setEntrepreneursLoading(true);
        setEntrepreneursError(null);
        const data = await apiService.getArtisans();
        setEntrepreneurs((data.artisans || []).slice(0, 3));
      } catch (err) {
        setEntrepreneursError('Failed to fetch entrepreneurs');
      } finally {
        setEntrepreneursLoading(false);
      }
    };
    fetchEntrepreneurs();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className='relative py-28 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] hero-pattern'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className='mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10'>
          {/* Left Column */}
          <div className='space-y-12 animate-fade-in-up'>
            <div className='space-y-8'>
              <span className='inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base bg-gradient-to-r from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] shadow-lg border border-[#f1c3b5]/60 transition-transform hover:scale-105'>
                <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f1c3b5]'>
                  <Sparkles className='h-4 w-4 text-[#d4845b]' />
                </span>
                ENTREPRENEUR MARKETPLACE
              </span>
              <h1 className='font-heading text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_32px_rgba(212,132,91,0.15)]'>
                Amplify Your{' '}
                <span className='relative text-transparent bg-clip-text bg-gradient-to-r from-[#d4845b] via-[#f1c3b5] to-[#d4845b]'>
                  Hustle.
                  <span className='absolute left-0 -bottom-2 w-full h-4 bg-gradient-to-r from-[#f8e1da] via-[#d4845b]/30 to-transparent rounded-full -z-10 opacity-80 animate-underline'></span>
                </span>
              </h1>
              <p className='text-lg text-[#a1a1aa] max-w-2xl leading-relaxed'>
                Kola connects Africa's most innovative entrepreneurs with the
                world. Turn your customers into your marketing team.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link to='/marketplace' className='w-full sm:w-auto'>
                <Button
                  size='lg'
                  className='shadow-lg hover:scale-105 transition-transform w-full sm:w-auto'
                >
                  Explore Marketplace <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <Link to='/entrepreneur' className='w-full sm:w-auto'>
                <Button
                  variant='outline'
                  size='lg'
                  className='hover:bg-[#f8e1da] hover:text-[#7a3419] border-2 border-[#f1c3b5] shadow hover:scale-105 transition-transform w-full sm:w-auto'
                >
                  Meet Entrepreneurs
                </Button>
              </Link>
            </div>
          </div>
          {/* Right Column */}
          <div className='relative flex flex-col items-center animate-fade-in'>
            <div className='relative h-[440px] w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10 group transition-all duration-500 hover:scale-105'>
              <img
                key={currentImageIndex}
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-3xl'>
                <div className='text-white'>
                  <h3 className='font-semibold text-lg mb-1'>
                    {heroImages[currentImageIndex].name}
                  </h3>
                  <p className='text-white/80 text-sm'>
                    {heroImages[currentImageIndex].location}
                  </p>
                </div>
              </div>
            </div>
            {/* Pagination Dots */}
            <div className='flex justify-center items-center gap-3 mt-6'>
              {heroImages.map((img, idx) => (
                <button
                  key={img.id}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none border-none ${
                    currentImageIndex === idx
                      ? 'w-6 h-3 bg-[#d4845b] shadow-lg'
                      : 'w-3 h-3 bg-white/30 hover:bg-[#d4845b]/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className='py-16'
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <div className='mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
          {stats.map((stat, i) => (
            <div key={i} className='flex flex-col items-center'>
              {stat.icon}
              <span className='text-4xl font-bold text-white'>
                {stat.value}
              </span>
              <span className='text-lg text-[#a1a1aa] mt-1'>{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section
        className='py-20'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className='mx-auto max-w-7xl px-4 md:px-8'>
          <h2 className='text-3xl font-bold text-white mb-4 text-center'>
            Featured Products
          </h2>
          <p className='text-base text-[#a1a1aa] text-center mb-12'>
            Discover handpicked products from our most talented entrepreneurs
          </p>
          {loading ? (
            <div className='text-center py-20'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4845b]'></div>
              <p className='text-[#a1a1aa] mt-4'>
                Loading featured products...
              </p>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
              {featuredProducts.map((product, i) => (
                <div
                  key={product.id || i}
                  className='relative flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-0 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in-up'
                  style={{ animationDelay: `${i * 0.14 + 0.1}s` }}
                >
                  {/* Product Image with Badge */}
                  <div className='relative h-40 w-full flex items-center justify-center rounded-t-2xl bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] mb-0 overflow-hidden'>
                    <span className='absolute top-3 left-3 z-10'>
                      <span className='px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] shadow'>
                        {product.badge}
                      </span>
                    </span>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <span className='w-20 h-20 rounded-xl bg-white/30 flex items-center justify-center text-3xl text-[#d4845b] font-bold shadow'>
                        <svg
                          className='w-10 h-10 opacity-30'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                        >
                          <rect x='4' y='4' width='16' height='16' rx='4' />
                        </svg>
                      </span>
                    )}
                  </div>
                  {/* Divider */}
                  <div className='w-full h-px bg-white/10 my-0'></div>
                  {/* Product Details */}
                  <div className='flex flex-col flex-1 p-6'>
                    <h3 className='text-xl font-extrabold mb-1 text-white'>
                      {product.name}
                    </h3>
                    <p className='text-sm text-[#a1a1aa] mb-2'>
                      by {product.seller}
                    </p>
                    <div className='flex items-center text-sm mb-2'>
                      <Star className='h-5 w-5 text-yellow-400 mr-1' />
                      <span>{product.rating}</span>
                      <span className='ml-1 text-[#a1a1aa]'>
                        ({product.reviews})
                      </span>
                    </div>
                    <div className='flex items-end gap-2 mb-4'>
                      <span className='text-2xl font-bold text-white'>
                        GH₵{product.price}
                      </span>
                      {product.oldPrice && (
                        <span className='text-base line-through text-[#a1a1aa]'>
                          GH₵{product.oldPrice}
                        </span>
                      )}
                    </div>
                    <Button className='mt-auto w-full' size='sm' as='div'>
                      <Link to={'/marketplace'} className='block w-full h-full'>
                        {product.btn}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className='flex justify-center mt-12'>
            <Link to='/marketplace'>
              <Button
                variant='outline'
                className='rounded-full px-8 py-3 text-lg'
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Meet Our Entrepreneurs */}
      <motion.section
        className='py-20'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className='mx-auto max-w-7xl px-4 md:px-8'>
          <h2 className='text-3xl font-bold text-white mb-4 text-center'>
            Meet Our Entrepreneurs
          </h2>
          <p className='text-base text-[#a1a1aa] text-center mb-12'>
            Get to know the talented creators behind these amazing products
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            {entrepreneursLoading ? (
              <div className='col-span-3 text-center text-[#a1a1aa] py-12'>
                Loading entrepreneurs...
              </div>
            ) : entrepreneursError ? (
              <div className='col-span-3 text-center text-red-400 py-12'>
                {entrepreneursError}
              </div>
            ) : (
              entrepreneurs.map((e, i) => (
                <div
                  key={e.id}
                  className='relative flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-10 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in-up'
                  style={{ animationDelay: `${i * 0.14 + 0.1}s` }}
                >
                  {/* Avatar Circle */}
                  <div className='w-20 h-20 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-3xl font-bold text-[#7a3419] shadow mb-4'>
                    {e.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  {/* Gradient Badge */}
                  <span className='mb-2 px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] shadow'>
                    {e.specialty}
                  </span>
                  {/* Name and Company */}
                  <h3 className='text-2xl font-extrabold mb-1 text-white text-center'>
                    {e.name}
                  </h3>
                  <p className='text-base text-[#d4845b] mb-1 text-center'>
                    {e.location}
                  </p>
                  {/* Description */}
                  <p className='text-base mb-5 text-[#fdf3f0] text-center'>
                    {e.story}
                  </p>
                  {/* Divider */}
                  <div className='w-full h-px bg-white/10 my-4'></div>
                  {/* Stats Grid */}
                  <div className='grid grid-cols-2 gap-2 w-full text-center mb-5'>
                    <div className='flex flex-col items-center'>
                      <ShoppingBag className='h-5 w-5 text-[#d4845b] mb-1' />
                      <span className='font-bold text-white'>
                        {e.productCount || (e.products ? e.products.length : 0)}
                      </span>
                      <span className='text-xs text-[#a1a1aa]'>Products</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <Users className='h-5 w-5 text-[#d4845b] mb-1' />
                      <span className='font-bold text-white'>
                        {e.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className='text-xs text-[#a1a1aa]'>Status</span>
                    </div>
                  </div>
                  <Button className='mt-auto w-full' size='sm' as='div'>
                    <Link
                      to={`/entrepreneur/${e.id}`}
                      className='block w-full h-full'
                    >
                      View Profile
                    </Link>
                  </Button>
                </div>
              ))
            )}
          </div>
          <div className='flex justify-center mt-12'>
            <Link to='/entrepreneur'>
              <Button
                variant='outline'
                className='rounded-full px-8 py-3 text-lg'
              >
                Meet All Entrepreneurs
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Our Platform */}
      <motion.section
        className='py-20 bg-gradient-to-br from-[#232326]/80 via-[#18181b]/90 to-[#232326]/80 relative overflow-hidden'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Glassmorphism Card Overlay */}
        <div className='absolute inset-0 pointer-events-none z-0'>
          <div className='absolute left-1/2 top-0 -translate-x-1/2 w-[80vw] h-[60vh] bg-white/5 rounded-3xl blur-2xl'></div>
        </div>
        <div className='mx-auto max-w-7xl px-4 md:px-8 relative z-10'>
          <div className='flex flex-col items-center mb-8'>
            <span className='inline-block mb-4 px-5 py-2 rounded-full font-bold text-sm bg-gradient-to-r from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] shadow border border-[#f1c3b5]/60'>
              Why Choose Us
            </span>
            <h2 className='text-3xl font-bold text-white mb-2 text-center'>
              Why Choose Our Platform?
            </h2>
            <p className='text-base text-[#a1a1aa] text-center max-w-2xl'>
              We go beyond just selling products. Kola is a movement—empowering
              entrepreneurs, ensuring quality, and connecting you to authentic
              African stories.
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {platformFeatures.map((f, i) => (
              <motion.div
                key={i}
                className='flex flex-col items-center text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 h-full shadow-xl border border-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 group'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08 + 0.1,
                  ease: 'easeOut',
                }}
              >
                <div className='mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] shadow group-hover:scale-110 transition-transform'>
                  {f.icon}
                </div>
                <h4 className='font-semibold text-lg mb-2 text-white'>
                  {f.title}
                </h4>
                <p className='text-sm text-[#fdf3f0]'>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className='py-20'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className='mx-auto max-w-7xl px-4 md:px-8 text-center'>
          <h2 className='text-2xl font-bold text-white mb-6'>
            Ready to Make a Difference?
          </h2>
          <p className='text-base text-[#a1a1aa] mb-12'>
            Join thousands of customers who are already supporting African
            entrepreneurs and discovering unique products that tell a story.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 justify-center'>
            <Link to='/marketplace' className='w-full sm:w-auto'>
              <Button className='px-8 py-3 text-lg rounded-full shadow-lg w-full sm:w-auto'>
                Start Shopping
              </Button>
            </Link>
            <Link to='/entrepreneur' className='w-full sm:w-auto'>
              <Button
                variant='outline'
                className='px-8 py-3 text-lg border-[#f1c3b5] hover:bg-[#f8e1da] hover:text-[#7a3419] rounded-full shadow w-full sm:w-auto'
              >
                Meet Entrepreneurs
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        className='py-16'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className='mx-auto max-w-7xl px-4 md:px-8 flex justify-center'>
          <div className='bg-[#232326]/80 backdrop-blur-lg rounded-2xl p-12 w-full max-w-xl shadow-xl'>
            <h3 className='text-2xl font-semibold mb-4 text-white text-center'>
              Stay Updated with Kola
            </h3>
            <p className='text-lg text-[#a1a1aa] mb-8 text-center'>
              Get the latest products and entrepreneur stories delivered to your
              inbox
            </p>
            <form className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='bg-[#18181b] border-none text-white'
              />
              <Button
                className='bg-[#d4845b] hover:bg-[#b96a4b] text-white px-8 py-3 rounded shadow-lg text-lg'
                type='submit'
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
