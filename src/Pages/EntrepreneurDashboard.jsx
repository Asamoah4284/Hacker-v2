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
        // Fetch all artisans and find the one with the matching ID
        const artisans = await apiService.getArtisans();
        const found = artisans.find((a) => String(a.id) === String(id));
        if (!found) throw new Error('Entrepreneur not found');
        setEntrepreneur(found);
      } catch (err) {
        setError(err.message || 'Failed to load entrepreneur details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEntrepreneur();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 md:px-16 xl:px-32 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4845b]"></div>
            <span className="ml-4 text-[#a1a1aa] text-lg">Loading entrepreneur dashboard...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-[#d4845b] text-white rounded-xl hover:bg-[#b8734a] transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-4xl font-bold text-[#7a3419] shadow overflow-hidden">
                  {entrepreneur.imageUrl ? (
                    <img
                      src={entrepreneur.imageUrl}
                      alt={entrepreneur.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    entrepreneur.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">{entrepreneur.name}</h1>
                  <div className="text-[#d4845b] font-semibold text-lg mb-1">{entrepreneur.business}</div>
                  <div className="text-[#a1a1aa] text-sm">{entrepreneur.location} &bull; {entrepreneur.specialty}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start md:items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[#a1a1aa] text-sm">Rating:</span>
                  <span className="text-[#d4845b] font-bold text-lg">{entrepreneur.rating?.toFixed(1) || 'N/A'}</span>
                  <svg className="w-5 h-5 text-[#d4845b]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#a1a1aa] text-sm">Products:</span>
                  <span className="text-white font-bold text-lg">{entrepreneur.products?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2 text-white">About</h2>
              <p className="text-[#a1a1aa] text-base leading-relaxed bg-white/5 rounded-xl p-4">
                {entrepreneur.story}
              </p>
            </div>

            {/* Referral Stats (placeholders) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 rounded-2xl p-6 flex flex-col items-center">
                <span className="text-[#a1a1aa] text-sm mb-1">People Sharing Link</span>
                <span className="text-3xl font-bold text-[#d4845b]">-</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 flex flex-col items-center">
                <span className="text-[#a1a1aa] text-sm mb-1">People Signed Up With Link</span>
                <span className="text-3xl font-bold text-[#d4845b]">-</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 flex flex-col items-center">
                <span className="text-[#a1a1aa] text-sm mb-1">Total Products</span>
                <span className="text-3xl font-bold text-[#d4845b]">{entrepreneur.products?.length || 0}</span>
              </div>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {entrepreneur.products && entrepreneur.products.length > 0 ? (
                  entrepreneur.products.map((product, idx) => (
                    <div key={idx} className="bg-white/10 rounded-xl p-4 flex flex-col gap-2 shadow hover:scale-105 transition-transform duration-200">
                      <div className="font-bold text-lg text-[#7a3419]">{product.name}</div>
                      <div className="text-[#d4845b] font-semibold text-base">${product.price}</div>
                      <div className="text-[#a1a1aa] text-sm">{product.description || 'No description.'}</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-[#a1a1aa] text-center">No products found.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 