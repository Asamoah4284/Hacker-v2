import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../config/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import kolaLogo from '../assets/images/logo/kola-logo-gradient.png';

// Default empty data structure for dashboard
const defaultData = {
  totalPoints: 0,
  peopleReferred: 0,
  activeLinks: [],
  averageQualityScore: 0,
  referralData: [],
  recentReferrals: [],
  leaderboardData: [],
  analytics: {
    totalClicks: 0,
    successfulReferrals: 0,
    conversionRate: '0%'
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard data and leaderboard users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get token from localStorage (stored as 'authToken' during login)
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          // Redirect to login if no token found
          navigate('/login');
          return;
        }

        // Fetch dashboard data
        const dashboardData = await apiService.getDashboardData(token);
        setDashboardData(dashboardData);

        // Fetch all users for leaderboard
        const usersResponse = await apiService.getUsers();
        const usersWithPoints = usersResponse.users
        
        // Sort by points in descending order
        const sortedUsers = usersWithPoints.sort((a, b) => b.points - a.points);
        setLeaderboardUsers(sortedUsers);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  // Get user data from localStorage
  const userEmail = localStorage.getItem('userEmail');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  // Show loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-[#d4845b] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-[#a1a1aa] text-lg'>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto px-4'>
          <div className='w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-red-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <path d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>Error Loading Dashboard</h2>
          <p className='text-[#a1a1aa] mb-6'>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='px-6 py-3 bg-[#d4845b] text-white font-semibold rounded-xl hover:bg-[#b8734a] transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Toast Notification */}
      {showToast && (
        <div className='fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out'>
          <div className='bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navigation />

      {/* Dashboard Header */}
      <section className='py-8 border-b border-white/10'>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 xl:px-32'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 className='text-2xl md:text-4xl font-bold text-white mb-2'>Dashboard</h1>
              <p className='text-[#a1a1aa]'>
                Track your referrals, earnings, and impact
              </p>
            </div>

          </div>
          
          {/* Referral Code Section */}
          {userData.myReferralCode && (
            <div className='mt-6 bg-gradient-to-r from-[#d4845b]/10 to-[#f8e1da]/5 rounded-xl p-6 border border-[#d4845b]/20'>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>Your Referral Code</h3>
                <p className='text-[#a1a1aa] text-sm mb-3'>
                  Share this code with friends to earn points when they sign up
                </p>
                <div className='flex items-center gap-3'>
                  <div className='bg-white/10 rounded-lg px-4 py-3 border border-white/20'>
                    <code className='text-[#d4845b] font-mono font-bold text-lg tracking-wider'>
                      {userData.myReferralCode}
                    </code>
                  </div>
                                      <button
                      onClick={() => {
                        console.log('Copy button clicked');
                        navigator.clipboard.writeText(userData.myReferralCode);
                        showToastMessage('Referral code copied to clipboard!');
                      }}
                      className='px-4 py-3 bg-[#d4845b] text-white font-semibold rounded-lg hover:bg-[#b8734a] transition-colors flex items-center gap-2'
                    >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Cards */}
      <section className='py-8'>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 xl:px-32'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            {/* Total Points */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 hover:border-[#d4845b]/30 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4845b] to-[#b8734a] flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                  </svg>
                </div>
                <span className='text-sm text-[#a1a1aa]'>+12%</span>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>
                {(userData.points || 0).toLocaleString()}
              </h3>
              <p className='text-[#a1a1aa]'>Total Points</p>
            </div>

            {/* People Referred */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 hover:border-[#d4845b]/30 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                  </svg>
                </div>
                <span className='text-sm text-[#10b981]'>+8%</span>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>
                {Math.floor((userData.points || 0) / 100)}
              </h3>
              <p className='text-[#a1a1aa]'>People Referred</p>
            </div>




          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className='py-4 border-b border-white/10'>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 xl:px-32'>
          <div className='flex gap-1 bg-white/5 rounded-xl p-1 overflow-x-auto whitespace-nowrap min-w-0'>
            {['leaderboard', 'overview'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all capitalize min-w-[120px]` +
                  (activeTab === tab
                    ? ' bg-[#d4845b] text-white shadow-lg'
                    : ' text-[#a1a1aa] hover:text-white hover:bg-white/10')
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className='py-8'>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 xl:px-32'>
          {activeTab === 'overview' && (
            <div className='space-y-8'>
              {/* Referral Growth Chart */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-white'>
                    Referral Growth
                  </h2>
                  <div className='flex gap-2 overflow-x-auto whitespace-nowrap min-w-0'>
                    <button className='px-4 py-2 bg-[#d4845b] text-white text-sm font-medium rounded-lg'>Points</button>
                    <button className='px-4 py-2 bg-white/10 text-[#a1a1aa] text-sm font-medium rounded-lg hover:bg-white/20'>Products</button>
                    <button className='px-4 py-2 bg-white/10 text-[#a1a1aa] text-sm font-medium rounded-lg hover:bg-white/20'>Artisans</button>
                  </div>
                </div>
                
                <div className='h-64 sm:h-80 w-full overflow-x-auto md:overflow-x-visible'>
                  <div className='flex items-end justify-between gap-4 min-w-[400px] w-full'>
                    {(dashboardData?.referralData || []).length > 0 ? (
                      (dashboardData?.referralData || []).map((data, index) => (
                        <div key={index} className='flex-1 flex flex-col items-center min-w-[48px]'>
                          <div className='w-full bg-white/5 rounded-t-lg relative group'>
                            <div 
                              className='bg-gradient-to-t from-[#d4845b] to-[#f8e1da] rounded-t-lg transition-all duration-500'
                              style={{ height: `${(data.points / 400) * 100}%` }}
                            ></div>
                            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                              <div className='bg-black/80 text-white text-xs px-2 py-1 rounded'>
                                {data.points} pts
                              </div>
                            </div>
                          </div>
                          <span className='text-sm text-[#a1a1aa] mt-2'>{data.month}</span>
                        </div>
                      ))
                    ) : (
                      <div className='flex-1 flex items-center justify-center h-full'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-[#a1a1aa]' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                              <path d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                            </svg>
                          </div>
                          <p className='text-[#a1a1aa]'>No referral data available</p>
                          <p className='text-sm text-[#71717a]'>Start referring to see your growth</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            
            </div>
          )}



          {activeTab === 'leaderboard' && (
            <div className='space-y-8'>
              {/* Leaderboard */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10'>
                <div className='flex items-center justify-between mb-8'>
                  <h2 className='text-2xl font-bold text-white'>
                    Community Leaderboard
                  </h2>
                  <div className='flex gap-2'>
                    <button className='px-4 py-2 bg-[#d4845b] text-white text-sm font-medium rounded-lg'>
                      This Month
                    </button>
                    <button className='px-4 py-2 bg-white/10 text-[#a1a1aa] text-sm font-medium rounded-lg hover:bg-white/20'>
                      All Time
                    </button>
                  </div>
                </div>

                <div className='max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#d4845b]/30 scrollbar-track-white/5 rounded-lg'>
                  <div className='space-y-3 pr-2'>
                    {leaderboardUsers.length > 0 ? (
                      leaderboardUsers.map((user, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 sm:p-6 rounded-xl transition-all ${
                          index === 0 ? 'bg-gradient-to-r from-[#d4845b]/20 to-[#f8e1da]/10 border border-[#d4845b]/30' : 'bg-white/5 hover:bg-white/10'
                        }`}>
                          <div className='flex items-center gap-3 sm:gap-4 min-w-0 flex-1'>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold flex-shrink-0 ${
                              index === 0 ? 'bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-white' :
                              index === 1 ? 'bg-gradient-to-br from-[#9ca3af] to-[#6b7280] text-white' :
                              index === 2 ? 'bg-gradient-to-br from-[#d97706] to-[#b45309] text-white' :
                              'bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419]'
                            }`}>
                              {index + 1}
                            </div>
                            <div className='flex items-center gap-2 sm:gap-3 min-w-0 flex-1'>
                              <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-xs sm:text-sm font-bold text-[#7a3419] flex-shrink-0'>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className='min-w-0 flex-1'>
                                <p className='font-bold text-white text-sm sm:text-base truncate'>{user.name}</p>
                                <p className='text-xs sm:text-sm text-[#a1a1aa]'>{Math.floor(user.points / 100)} referrals</p>
                              </div>
                            </div>
                          </div>
                          <div className='text-right flex-shrink-0 ml-2'>
                            <p className='text-lg sm:text-2xl font-bold text-[#d4845b]'>{user.points.toLocaleString()}</p>
                            <p className='text-xs sm:text-sm text-[#a1a1aa]'>points</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='text-center py-12'>
                        <div className='w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg className='w-8 h-8 text-[#a1a1aa]' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                            <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                          </svg>
                        </div>
                        <p className='text-[#a1a1aa] mb-2'>No users with 100+ points yet</p>
                        <p className='text-sm text-[#71717a]'>Start referring to see rankings</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Your Ranking */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10'>
                <h3 className='text-xl font-bold text-white mb-6'>
                  Your Ranking
                </h3>
                <div className='flex items-center justify-between p-6 bg-gradient-to-r from-[#d4845b]/10 to-[#f8e1da]/5 rounded-xl border border-[#d4845b]/20'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#d4845b] to-[#b8734a] flex items-center justify-center text-lg font-bold text-white'>
                      12
                    </div>
                    <div>
                      <p className='font-bold text-white'>Your Position</p>
                      <p className='text-sm text-[#a1a1aa]'>
                        You're in the top 15% of referrers!
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-2xl font-bold text-[#d4845b]'>
                      {(dashboardData?.totalPoints || 0).toLocaleString()}
                    </p>
                    <p className='text-sm text-[#a1a1aa]'>your points</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />

      {/* Footer */}
      {/* <footer className='relative bg-[#18181b] border-t border-white/10 pt-16 pb-8 text-base backdrop-blur-lg shadow-2xl rounded-t-2xl mt-16'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4845b] via-[#f8e1da] to-[#d4845b] opacity-40 rounded-t-2xl'></div>
        <div className='container mx-auto px-4 sm:px-6 md:px-8 xl:px-32 grid grid-cols-1 md:grid-cols-5 gap-14 mb-10'>
          <div>
            <div className='flex items-center mb-4'>
              <img
                src={kolaLogo}
                alt='Kola Logo'
                className='h-16 w-auto object-contain'
              />
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
        <div className='container mx-auto px-4 sm:px-6 md:px-8 xl:px-32 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[#a1a1aa] mt-8'>
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
      </footer> */}
    </div>
  );
}
