import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

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
      <Navigation />
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
            innovative entrepreneurs who are building businesses that make a
            difference.
          </p>
        </div>
      </section>

      {/* Featured Entrepreneurs Section */}
      <section className='py-20'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Featured Entrepreneurs
            </h2>
            <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto'>
              These talented creators are bringing African culture, innovation,
              and craftsmanship to the world stage.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {entrepreneurs.map((entrepreneur, i) => (
              <div
                key={i}
                className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105'
              >
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
                    <span className='text-white font-medium'>
                      {entrepreneur.category}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#a1a1aa] text-sm'>Location:</span>
                    <span className='text-white font-medium'>
                      {entrepreneur.location}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                      <span className='text-[#a1a1aa] text-sm'>Rating:</span>
                      <span className='text-[#d4845b] font-bold'>
                        {entrepreneur.rating}
                      </span>
                      <svg
                        className='w-4 h-4 text-[#d4845b]'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-[#a1a1aa] text-sm'>Products:</span>
                      <span className='text-white font-bold'>
                        {entrepreneur.products}
                      </span>
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
          <h2 className='text-4xl font-bold text-white mb-6'>
            Join Our Community
          </h2>
          <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-8'>
            Are you an African entrepreneur with a story to tell? Join our
            platform and connect with customers worldwide.
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
      <Footer />
    </div>
  );
}
