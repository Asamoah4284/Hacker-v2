import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import EntrepreneurDashboard from './EntrepreneurDashboard';

export default function EntrepreneurPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const navigate = useNavigate();

  // Fetch artisans from API
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const data = await apiService.getArtisans();
        setArtisans(data.artisans || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch artisans. Please try again later.');
        console.error('Error fetching artisans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  // Get unique specialties for filtering
  const specialties = [
    'All Specialties',
    ...new Set(artisans.map((artisan) => artisan.specialty)),
  ];

  // Filter artisans
  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSpecialty =
      selectedSpecialty === 'All Specialties' ||
      artisan.specialty === selectedSpecialty;
    const matchesSearch =
      searchTerm === '' ||
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.story.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the filter function above
  };

  // Transform API artisan to match component structure
  const transformArtisan = (artisan) => ({
    id: artisan.id,
    name: artisan.name,
    business: artisan.name + ' Crafts', // Generate business name
    category: artisan.specialty,
    img: artisan.imageUrl,
    bio: artisan.story,
    location: artisan.location,
    rating: 4.5 + Math.random() * 0.5, // Generate random rating between 4.5-5.0
    products: artisan.productCount || 0,
    specialty: artisan.specialty,
    productList: artisan.products || [],
  });

  const handleViewProducts = (entrepreneur) => {
    navigate(`/entrepreneur/${entrepreneur.id}/dashboard`);
  };

  const handleCloseDashboard = () => {
    setShowDashboard(false);
    setSelectedEntrepreneur(null);
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
            Meet Our Artisans
          </h1>
          <p className='text-2xl text-[#a1a1aa] max-w-2xl mx-auto mb-10'>
            Discover the incredible stories and products from Africa's most
            talented artisans who are preserving cultural heritage through their
            craft.
          </p>

          {/* Search Bar */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto'>
            <form onSubmit={handleSearch} className='relative w-full'>
              <input
                type='text'
                placeholder='Search artisans, specialties, or locations...'
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

      {/* Filters Section */}
      <section className='py-8 border-b border-white/10'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='flex flex-wrap gap-3 justify-center'>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedSpecialty === specialty
                    ? 'bg-[#d4845b] text-white shadow-lg'
                    : 'bg-white/10 text-[#a1a1aa] hover:bg-white/20 hover:text-white'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans Section */}
      <section className='py-20'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Featured Artisans
            </h2>
            <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto'>
              These talented creators are bringing African culture, innovation,
              and craftsmanship to the world stage.
            </p>
          </div>

          {loading ? (
            <div className='text-center py-20'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4845b]'></div>
              <p className='text-[#a1a1aa] mt-4'>Loading artisans...</p>
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
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {filteredArtisans.map((artisan) => {
                  const transformedArtisan = transformArtisan(artisan);
                  return (
                    <div
                      key={artisan.id}
                      className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105'
                    >
                      {/* Avatar */}
                      <div className='flex items-center gap-4 mb-6'>
                        <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-2xl font-bold text-[#7a3419] shadow overflow-hidden'>
                          {artisan.imageUrl ? (
                            <img
                              src={artisan.imageUrl}
                              alt={artisan.name}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            artisan.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                          )}
                        </div>
                        <div>
                          <div className='font-bold text-lg text-white'>
                            {artisan.name}
                          </div>
                          <div className='text-[#d4845b] font-semibold text-sm'>
                            {transformedArtisan.business}
                          </div>
                        </div>
                      </div>

                      {/* Business Info */}
                      <div className='space-y-3 mb-6'>
                        <div className='flex items-center gap-2'>
                          <span className='text-[#a1a1aa] text-sm'>
                            Specialty:
                          </span>
                          <span className='text-white font-medium'>
                            {artisan.specialty}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-[#a1a1aa] text-sm'>
                            Location:
                          </span>
                          <span className='text-white font-medium'>
                            {artisan.location}
                          </span>
                        </div>
                        <div className='flex items-center gap-4'>
                          <div className='flex items-center gap-1'>
                            <span className='text-[#a1a1aa] text-sm'>
                              Rating:
                            </span>
                            <span className='text-[#d4845b] font-bold'>
                              {transformedArtisan.rating.toFixed(1)}
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
                            <span className='text-[#a1a1aa] text-sm'>
                              Products:
                            </span>
                            <span className='text-white font-bold'>
                              {artisan.productCount}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className='text-[#a1a1aa] text-sm mb-6 leading-relaxed'>
                        {artisan.story}
                      </p>

                      {/* Sample Products */}
                      {artisan.products && artisan.products.length > 0 && (
                        <div className='mb-6'>
                          <h4 className='text-white font-semibold mb-3'>
                            Sample Products:
                          </h4>
                          <div className='grid grid-cols-2 gap-2'>
                            {artisan.products
                              .slice(0, 2)
                              .map((product, index) => (
                                <div
                                  key={index}
                                  className='bg-white/5 rounded-lg p-2'
                                >
                                  <div className='text-xs text-[#a1a1aa] truncate'>
                                    {product.name}
                                  </div>
                                  <div className='text-xs text-[#d4845b] font-semibold'>
                                    ${product.price}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                
                {/* Action Button */}
                <button 
                  className='w-full bg-gradient-to-r from-[#d4845b] to-[#f1c3b5] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#c4734a] hover:to-[#e8b8a8] transition-all duration-300 shadow-lg hover:shadow-xl'
                  onClick={() => handleViewProducts(artisan)}
                >
                  View Products
                </button>
              </div>
                  );
                })}
              </div>

              {filteredArtisans.length === 0 && !loading && (
                <div className='text-center py-20'>
                  <p className='text-[#a1a1aa] text-xl'>
                    No artisans found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSpecialty('All Specialties');
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

      {/* Become an Entrepreneur Section */}
      <section className='py-20 bg-white/5'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            Join Our Community
          </h2>
          <p className='text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-8'>
            Are you an African artisan with a story to tell? Join our platform
            and connect with customers worldwide.
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

      {showDashboard && selectedEntrepreneur && (
        <EntrepreneurDashboard 
          entrepreneur={selectedEntrepreneur} 
          onClose={handleCloseDashboard} 
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
