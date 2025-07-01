import { Link } from 'react-router-dom';

// Dummy entrepreneur data
const entrepreneurs = [
  {
    name: 'Aisha Okechukwu',
    business: 'Nubian Crafts',
    category: 'Handmade Jewelry',
    img: '',
    bio: 'Creating authentic African jewelry that tells stories of heritage and culture.',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    products: 45,
  },
  {
    name: 'Kwame Addo',
    business: 'Ghanaian Textiles',
    category: 'Fashion & Apparel',
    img: '',
    bio: 'Reviving traditional Ghanaian textile patterns for modern fashion.',
    location: 'Accra, Ghana',
    rating: 4.8,
    products: 32,
  },
  {
    name: 'Fatima Diallo',
    business: 'Senegal Home Decor',
    category: 'Home & Living',
    img: '',
    bio: 'Bringing West African aesthetics to contemporary home design.',
    location: 'Dakar, Senegal',
    rating: 4.7,
    products: 28,
  },
  {
    name: 'David Mwangi',
    business: 'Kenyan Coffee Co.',
    category: 'Food & Beverages',
    img: '',
    bio: 'Premium Kenyan coffee beans sourced directly from local farmers.',
    location: 'Nairobi, Kenya',
    rating: 4.9,
    products: 15,
  },
  {
    name: 'Zara Hassan',
    business: 'Moroccan Pottery',
    category: 'Art & Crafts',
    img: '',
    bio: 'Handcrafted Moroccan ceramics with traditional geometric patterns.',
    location: 'Marrakech, Morocco',
    rating: 4.6,
    products: 38,
  },
  {
    name: 'Emeka Okonkwo',
    business: 'Igbo Woodworks',
    category: 'Furniture',
    img: '',
    bio: 'Custom wooden furniture inspired by Igbo cultural heritage.',
    location: 'Enugu, Nigeria',
    rating: 4.8,
    products: 22,
  },
];

export default function EntrepreneurPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Top Navigation Bar (same as Home) */}
      <nav className='sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow border-b border-white/10 px-8 md:px-16 xl:px-32 py-3 flex items-center justify-between gap-8'>
        <div className='flex items-center gap-3'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] text-xl font-bold shadow'>
            K
          </span>
          <span className='font-bold text-xl text-white'>Kola</span>
        </div>
        <div className='hidden md:flex gap-8'>
          {['Home', 'Marketplace', 'Entrepreneurs', 'About'].map((link) => (
            <Link
              key={link}
              to={link === 'Home' ? '/' : '/' + link.toLowerCase()}
              className='text-[#a1a1aa] font-medium px-2 py-1 rounded transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30 focus:text-[#d4845b] focus:bg-[#f8e1da]/30'
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
            Meet Our Entrepreneurs
          </h1>
          <p className='text-2xl text-[#a1a1aa] max-w-2xl mx-auto mb-10'>
            Discover the incredible stories and products from Africa's most
            innovative entrepreneurs who are building businesses that make a difference.
          </p>
        </div>
      </section>

      {/* Featured Entrepreneurs Section */}
      <section className='py-20'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Featured Entrepreneurs</h2>
            <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto'>
              These talented creators are bringing African culture, innovation, and craftsmanship to the world stage.
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {entrepreneurs.map((entrepreneur, i) => (
              <div key={i} className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105'>
                {/* Avatar */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-2xl font-bold text-[#7a3419] shadow'>
                    {entrepreneur.img ? (
                      <img
                        src={entrepreneur.img}
                        alt={entrepreneur.name}
                        className='w-full h-full object-cover rounded-full'
                      />
                    ) : (
                      entrepreneur.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    )}
                  </div>
                  <div>
                    <div className='font-bold text-lg text-white'>
                      {entrepreneur.name}
                    </div>
                    <div className='text-[#d4845b] font-semibold text-sm'>
                      {entrepreneur.business}
                    </div>
                  </div>
                </div>
                
                {/* Business Info */}
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#a1a1aa] text-sm'>Category:</span>
                    <span className='text-white font-medium'>{entrepreneur.category}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#a1a1aa] text-sm'>Location:</span>
                    <span className='text-white font-medium'>{entrepreneur.location}</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                      <span className='text-[#a1a1aa] text-sm'>Rating:</span>
                      <span className='text-[#d4845b] font-bold'>{entrepreneur.rating}</span>
                      <svg className='w-4 h-4 text-[#d4845b]' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-[#a1a1aa] text-sm'>Products:</span>
                      <span className='text-white font-bold'>{entrepreneur.products}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bio */}
                <p className='text-[#a1a1aa] text-sm mb-6 leading-relaxed'>
                  {entrepreneur.bio}
                </p>
                
                {/* Action Button */}
                <button className='w-full bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 shadow-lg hover:shadow-xl'>
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Entrepreneur Section */}
      <section className='py-20 bg-white/5'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>Join Our Community</h2>
          <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-8'>
            Are you an African entrepreneur with a story to tell? Join our platform and connect with customers worldwide.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold py-4 px-8 rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 shadow-lg hover:shadow-xl'>
              Become a Seller
            </button>
            <button className='bg-white/10 backdrop-blur-lg text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20'>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer (same as Home) */}
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
