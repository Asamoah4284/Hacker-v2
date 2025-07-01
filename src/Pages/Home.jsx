import { useState, useEffect } from 'react';
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
      className={`rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/10 ${className} transition-all duration-200 hover:shadow-2xl hover:-translate-y-1`}
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
      className={`w-full px-4 py-2 rounded bg-[#232326]/80 border-none text-white focus:outline-none focus:ring-2 focus:ring-[#d4845b] ${className}`}
      {...props}
    />
  );
}

const heroImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'African woman entrepreneur working on traditional textiles',
    name: 'Kofi Pottery',
    location: 'Kumasi, Ghana',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2066&q=80',
    alt: 'African craftsman creating beautiful wooden sculptures',
    name: 'Kwame Woodcraft',
    location: 'Accra, Ghana',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    alt: 'African fashion designer showcasing traditional patterns',
    name: 'Zara Fashion House',
    location: 'Cape Town, South Africa',
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

const featuredProducts = [
  {
    badge: 'Bestseller',
    name: 'Handwoven Kente Scarf',
    seller: 'Amara Okafor',
    rating: 4.5,
    reviews: 156,
    price: 89,
    oldPrice: 120,
    btn: 'View',
  },
  {
    badge: 'Handmade',
    name: 'Carved Wooden Mask',
    seller: 'Kwame Asante',
    rating: 4.8,
    reviews: 89,
    price: 145,
    oldPrice: null,
    btn: 'View',
  },
  {
    badge: 'Natural',
    name: 'Argan Oil Hair Treatment',
    seller: 'Fatima Al-Rashid',
    rating: 4.9,
    reviews: 234,
    price: 34,
    oldPrice: 45,
    btn: 'View',
  },
  {
    badge: 'Limited',
    name: 'Beaded Jewelry Set',
    seller: 'Amara Okafor',
    rating: 4.7,
    reviews: 78,
    price: 67,
    oldPrice: null,
    btn: 'View',
  },
];

const entrepreneurs = [
  {
    name: 'Amara Okafor',
    tag: 'Fashion & Apparel',
    company: "Amara's Textiles",
    location: 'Lagos, Nigeria',
    desc: 'Creating beautiful traditional fabrics with modern designs',
    rating: 4.9,
    products: 45,
    sales: 1200,
  },
  {
    name: 'Kwame Asante',
    tag: 'Arts & Crafts',
    company: 'Asante Crafts',
    location: 'Accra, Ghana',
    desc: 'Handcrafted wooden sculptures and home decor',
    rating: 4.8,
    products: 32,
    sales: 890,
  },
  {
    name: 'Fatima Al-Rashid',
    tag: 'Beauty & Wellness',
    company: 'Desert Rose Beauty',
    location: 'Marrakech, Morocco',
    desc: 'Natural beauty products inspired by Moroccan traditions',
    rating: 4.9,
    products: 28,
    sales: 1500,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Top Navigation Bar */}
      <nav className='sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow border-b border-white/10 px-8 md:px-16 xl:px-32 py-3 flex items-center justify-between gap-8'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-xl font-bold shadow'>
            K
          </span>
          <span className='font-bold text-xl text-white'>Kola</span>
        </div>
        {/* Navigation Links */}
        <div className='hidden md:flex gap-8'>
          {['Home', 'Marketplace', 'Entrepreneur', 'About'].map((link) => (
            <a
              key={link}
              href={link.toLowerCase()}
              className='text-[#a1a1aa] font-medium px-2 py-1 rounded transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30 focus:text-[#d4845b] focus:bg-[#f8e1da]/30'
            >
              {link}
            </a>
          ))}
        </div>
        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {/* Search */}
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
          {/* Theme Toggle */}
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
          {/* Notifications */}
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
          {/* Cart */}
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
          {/* User Avatar */}
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
      <section className='relative py-28 overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b]'>
        {/* Animated Gradient Overlay */}
        <div className='absolute inset-0 pointer-events-none z-0'>
          <div className='absolute left-[-20%] top-[-20%] w-[600px] h-[600px] bg-gradient-to-br from-[#d4845b]/40 via-[#f8e1da]/30 to-transparent rounded-full blur-3xl animate-pulse-slow'></div>
          <div className='absolute right-[-10%] bottom-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-[#d4845b]/30 via-[#f8e1da]/20 to-transparent rounded-full blur-2xl animate-pulse-slower'></div>
        </div>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10'>
          {/* Left Column */}
          <div className='space-y-12 animate-fade-in-up'>
            <div className='space-y-8'>
              <span className='inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base bg-gradient-to-r from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] shadow-lg border border-[#f1c3b5]/60 transition-transform hover:scale-105'>
                <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f1c3b5]'>
                  <Sparkles className='h-4 w-4 text-[#d4845b]' />
                </span>
                ENTREPRENEUR MARKETPLACE
              </span>
              <h1 className='font-heading text-7xl md:text-8xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_32px_rgba(212,132,91,0.15)]'>
                Amplify Your{' '}
                <span className='relative text-transparent bg-clip-text bg-gradient-to-r from-[#d4845b] via-[#f1c3b5] to-[#d4845b]'>
                  Hustle.
                  <span className='absolute left-0 -bottom-2 w-full h-4 bg-gradient-to-r from-[#f8e1da] via-[#d4845b]/30 to-transparent rounded-full -z-10 opacity-80 animate-underline'></span>
                </span>
              </h1>
              <p className='text-2xl text-[#a1a1aa] max-w-2xl leading-relaxed'>
                Kola connects Africa's most innovative entrepreneurs with the
                world. Turn your customers into your marketing team.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                className='shadow-lg hover:scale-105 transition-transform'
              >
                Explore Marketplace <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='hover:bg-[#f8e1da] hover:text-[#7a3419] border-2 border-[#f1c3b5] shadow hover:scale-105 transition-transform'
              >
                Meet Entrepreneurs
              </Button>
            </div>
          </div>
          {/* Right Column */}
          <div className='relative flex flex-col items-center animate-fade-in'>
            <div className='relative min-h-[440px] w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10 group transition-all duration-500 hover:scale-105'>
              <img
                key={currentImageIndex}
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
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
      </section>

      {/* Stats Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
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
      </section>

      {/* Featured Products Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-5xl font-bold text-white mb-4 text-center'>
            Featured Products
          </h2>
          <p className='text-xl text-[#a1a1aa] text-center mb-12'>
            Discover handpicked products from our most talented entrepreneurs
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
            {featuredProducts.map((product, i) => (
              <div
                key={i}
                className='relative flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-0 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in-up'
                style={{ animationDelay: `${i * 0.14 + 0.1}s` }}
              >
                {/* Product Image Placeholder with Heart Icon */}
                <div className='relative h-40 w-full flex items-center justify-center rounded-t-2xl bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] mb-0'>
                  <span className='absolute top-3 left-3 z-10'>
                    <span className='px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] shadow'>
                      {product.badge}
                    </span>
                  </span>
                  <span className='absolute top-3 right-3 z-10'>
                    <button className='w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-[#d4845b]/80 transition-colors shadow'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#d4845b'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.5 3.75a4.5 4.5 0 00-3.57 7.28l.07.08.07-.08a4.5 4.5 0 013.57-7.28z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A6.5 6.5 0 0112 2a6.5 6.5 0 0110 6.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                        />
                      </svg>
                    </button>
                  </span>
                  {/* Placeholder for product image */}
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
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className='text-base line-through text-[#a1a1aa]'>
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  <Button className='mt-auto w-full' size='sm'>
                    {product.btn}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-12'>
            <Button
              variant='outline'
              className='rounded-full px-8 py-3 text-lg'
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Our Entrepreneurs */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-5xl font-bold text-white mb-4 text-center'>
            Meet Our Entrepreneurs
          </h2>
          <p className='text-xl text-[#a1a1aa] text-center mb-12'>
            Get to know the talented creators behind these amazing products
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            {entrepreneurs.map((e, i) => (
              <div
                key={i}
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
                  {e.tag}
                </span>
                {/* Name and Company */}
                <h3 className='text-2xl font-extrabold mb-1 text-white text-center'>
                  {e.name}
                </h3>
                <p className='text-base text-[#d4845b] mb-1 text-center'>
                  {e.company}
                </p>
                <p className='text-sm text-[#a1a1aa] mb-2 text-center'>
                  {e.location}
                </p>
                {/* Description */}
                <p className='text-base mb-5 text-[#fdf3f0] text-center'>
                  {e.desc}
                </p>
                {/* Divider */}
                <div className='w-full h-px bg-white/10 my-4'></div>
                {/* Stats Grid */}
                <div className='grid grid-cols-3 gap-2 w-full text-center mb-5'>
                  <div className='flex flex-col items-center'>
                    <Star className='h-5 w-5 text-yellow-400 mb-1' />
                    <span className='font-bold text-white'>{e.rating}</span>
                    <span className='text-xs text-[#a1a1aa]'>Rating</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <ShoppingBag className='h-5 w-5 text-[#d4845b] mb-1' />
                    <span className='font-bold text-white'>{e.products}</span>
                    <span className='text-xs text-[#a1a1aa]'>Products</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <Users className='h-5 w-5 text-[#d4845b] mb-1' />
                    <span className='font-bold text-white'>{e.sales}</span>
                    <span className='text-xs text-[#a1a1aa]'>Sales</span>
                  </div>
                </div>
                <Button className='mt-auto w-full' size='sm'>
                  View Profile
                </Button>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-12'>
            <Button
              variant='outline'
              className='rounded-full px-8 py-3 text-lg'
            >
              Meet All Entrepreneurs
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-5xl font-bold text-white mb-4 text-center'>
            Why Choose Our Platform?
          </h2>
          <p className='text-xl text-[#a1a1aa] text-center mb-12'>
            We're committed to creating meaningful connections between
            entrepreneurs and customers
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            {platformFeatures.map((f, i) => (
              <div
                key={i}
                className='flex flex-col items-center text-center bg-[#232326]/80 rounded-2xl p-10 h-full shadow-xl backdrop-blur-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200'
              >
                {f.icon}
                <h4 className='font-semibold text-2xl mb-2 text-white'>
                  {f.title}
                </h4>
                <p className='text-lg text-[#fdf3f0]'>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Ready to Make a Difference?
          </h2>
          <p className='text-xl text-[#a1a1aa] mb-12'>
            Join thousands of customers who are already supporting African
            entrepreneurs and discovering unique products that tell a story.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 justify-center'>
            <Button className='px-8 py-3 text-lg rounded-full shadow-lg'>
              Start Shopping
            </Button>
            <Button
              variant='outline'
              className='px-8 py-3 text-lg border-[#f1c3b5] hover:bg-[#f8e1da] hover:text-[#7a3419] rounded-full shadow'
            >
              Meet Entrepreneurs
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className='py-16'>
        <div className='container mx-auto px-4 flex justify-center'>
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
      </section>

      {/* Footer */}
      <footer className='relative bg-[#18181b] border-t border-white/10 pt-16 pb-8 text-base backdrop-blur-lg shadow-2xl rounded-t-2xl animate-fade-in-up'>
        {/* Top Gradient Border/Accent */}
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4845b] via-[#f8e1da] to-[#d4845b] opacity-40 rounded-t-2xl'></div>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 grid grid-cols-1 md:grid-cols-5 gap-14 mb-10'>
          {/* Kola Logo and About */}
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
            {/* Social Icons */}
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
          {/* Footer Links */}
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
        {/* Copyright Area */}
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
