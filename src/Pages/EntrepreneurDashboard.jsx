import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function EntrepreneurDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntrepreneur = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getArtisanById(id);
        if (!data) throw new Error('Entrepreneur not found');
        setEntrepreneur(data.artisan);
      } catch (err) {
        setError(err.message || 'Failed to load entrepreneur details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEntrepreneur();
  }, [id]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white flex flex-col'>
      <Navigation />
      <main className='flex-1 container mx-auto px-4 md:px-16 xl:px-32 py-12'>
        {loading ? (
          <div className='flex justify-center items-center h-96'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4845b]'></div>
            <span className='ml-4 text-[#a1a1aa] text-lg'>
              Loading entrepreneur dashboard...
            </span>
          </div>
        ) : error ? (
          <div className='text-center py-20'>
            <p className='text-red-500 text-xl mb-4'>{error}</p>
            <button
              onClick={() => navigate(-1)}
              className='px-6 py-3 bg-[#d4845b] text-white rounded-xl hover:bg-[#b8734a] transition-colors'
            >
              Go Back
            </button>
          </div>
        ) : !entrepreneur ? null : (
          <div className=''>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10'>
              <div className='flex items-center gap-6'>
                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-4xl font-bold text-[#7a3419] shadow overflow-hidden'>
                  {entrepreneur.imageUrl ? (
                    <img
                      src={entrepreneur.imageUrl}
                      alt={entrepreneur.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    entrepreneur.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  )}
                </div>
                <div>
                  <h1 className='text-4xl font-bold text-white mb-1'>
                    {entrepreneur.name}
                  </h1>
                  <div className='text-[#a1a1aa] text-sm'>
                    {entrepreneur.location} &bull; {entrepreneur.specialty}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 items-start md:items-end'>
                <div className='flex items-center gap-2'>
                  <span className='text-[#a1a1aa] text-sm'>Products:</span>
                  <span className='text-white font-bold text-lg'>
                    {entrepreneur.productCount ||
                      (entrepreneur.products
                        ? entrepreneur.products.length
                        : 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className='mb-8'>
              <h2 className='text-2xl font-semibold mb-2 text-white'>About</h2>
              <p className='text-[#a1a1aa] text-base leading-relaxed bg-white/5 rounded-xl p-4'>
                {entrepreneur.story}
              </p>
            </div>

            {/* Referral Stats (placeholders) */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
              <div className='bg-white/10 rounded-2xl p-6 flex flex-col items-center'>
                <span className='text-[#a1a1aa] text-sm mb-1'>
                  People Sharing Link
                </span>
                <span className='text-3xl font-bold text-[#d4845b]'>-</span>
              </div>
              <div className='bg-white/10 rounded-2xl p-6 flex flex-col items-center'>
                <span className='text-[#a1a1aa] text-sm mb-1'>
                  People Signed Up With Link
                </span>
                <span className='text-3xl font-bold text-[#d4845b]'>-</span>
              </div>
              <div className='bg-white/10 rounded-2xl p-6 flex flex-col items-center'>
                <span className='text-[#a1a1aa] text-sm mb-1'>
                  Total Products
                </span>
                <span className='text-3xl font-bold text-[#d4845b]'>
                  {entrepreneur.products?.length || 0}
                </span>
              </div>
            </div>

            {/* Products and Top Patrons Side by Side */}
            <div className='flex flex-col md:flex-row gap-8'>
              {/* Products */}
              <div className='flex-1'>
                <h2 className='text-2xl font-semibold mb-4 text-white'>
                  Products
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6'>
                  {entrepreneur.products && entrepreneur.products.length > 0 ? (
                    entrepreneur.products.map((product) => (
                      <div
                        key={product._id}
                        className='bg-white/10 rounded-xl p-4 flex flex-col gap-2 shadow hover:scale-105 transition-transform duration-200'
                      >
                        <div className='font-bold text-lg text-[#7a3419]'>
                          {product.name}
                        </div>
                        <div className='text-[#d4845b] font-semibold text-base'>
                          GH₵{product.price}
                        </div>
                        <div className='text-[#a1a1aa] text-sm'>
                          {product.description || 'No description.'}
                        </div>
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className='w-full h-32 object-cover rounded mt-2'
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className='col-span-2 text-[#a1a1aa] text-center'>
                      No products found.
                    </div>
                  )}
                </div>
              </div>
              {/* Top Patrons */}
              <div className='w-full md:w-80 flex-shrink-0'>
                <div className='bg-white/10 rounded-2xl p-6 shadow flex flex-col gap-4 h-full'>
                  <h2 className='text-xl font-semibold text-white mb-2'>
                    Top Patrons
                  </h2>
                  {entrepreneur.topPatrons &&
                  entrepreneur.topPatrons.length > 0 ? (
                    <ul className='space-y-3'>
                      {entrepreneur.topPatrons.map((patron, idx) => (
                        <li key={idx} className='flex items-center gap-3'>
                          <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419] font-bold'>
                            {patron.name ? patron.name[0] : '?'}
                          </span>
                          <span className='text-white font-medium'>
                            {patron.name || 'Anonymous'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className='text-[#a1a1aa] text-center'>
                      No patrons yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
