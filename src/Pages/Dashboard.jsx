import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Dummy data for dashboard
const customerStats = {
  totalPoints: 2847,
  peopleReferred: 23,
  activeLinks: 8,
  averageQualityScore: 4.8
};

const referralData = [
  { month: 'Jan', points: 120, products: 8, artisans: 3 },
  { month: 'Feb', points: 180, products: 12, artisans: 5 },
  { month: 'Mar', points: 220, products: 15, artisans: 7 },
  { month: 'Apr', points: 280, products: 18, artisans: 9 },
  { month: 'May', points: 320, products: 22, artisans: 11 },
  { month: 'Jun', points: 380, products: 25, artisans: 13 }
];

const recentReferrals = [
  { name: 'Sarah Johnson', date: '2024-06-15', points: 45, status: 'active' },
  { name: 'Michael Chen', date: '2024-06-14', points: 32, status: 'active' },
  { name: 'Emma Davis', date: '2024-06-13', points: 28, status: 'pending' },
  { name: 'David Wilson', date: '2024-06-12', points: 51, status: 'active' },
  { name: 'Lisa Brown', date: '2024-06-11', points: 38, status: 'active' }
];

const leaderboardData = [
  { rank: 1, name: 'Ama Boateng', points: 1247, referrals: 45, avatar: 'AB' },
  { rank: 2, name: 'Kwame Mensah', points: 1189, referrals: 42, avatar: 'KM' },
  { rank: 3, name: 'Fatima Bello', points: 1156, referrals: 38, avatar: 'FB' },
  { rank: 4, name: 'John Smith', points: 1098, referrals: 35, avatar: 'JS' },
  { rank: 5, name: 'Maria Garcia', points: 1045, referrals: 32, avatar: 'MG' }
];

const activeLinks = [
  { id: 1, name: 'Handcrafted Jewelry Collection', clicks: 156, conversions: 12, status: 'active' },
  { id: 2, name: 'Organic Beauty Products', clicks: 89, conversions: 8, status: 'active' },
  { id: 3, name: 'Traditional Fashion Line', clicks: 234, conversions: 19, status: 'active' },
  { id: 4, name: 'Artisan Home Decor', clicks: 67, conversions: 5, status: 'paused' },
  { id: 5, name: 'African Coffee & Tea', clicks: 123, conversions: 11, status: 'active' }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      {/* Top Navigation Bar */}
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
              className='text-[#a1a1aa] font-medium px-2 py-1 rounded transition-colors hover:text-[#d4845b] hover:bg-[#f8e1da]/30'
            >
              {link}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-sm text-[#a1a1aa] font-mono'>
            {formatTime(currentTime)}
          </div>
          <button className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b]/80 text-[#a1a1aa] hover:text-white transition-colors'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <circle cx='12' cy='8' r='4' />
              <path d='M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2' />
            </svg>
          </button>
        </div>
      </nav>

      {/* Dashboard Header */}
      <section className='py-8 border-b border-white/10'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 className='text-4xl font-bold text-white mb-2'>Dashboard</h1>
              <p className='text-[#a1a1aa]'>Track your referrals, earnings, and impact</p>
            </div>
            <div className='flex gap-4'>
              <button className='px-6 py-3 bg-[#d4845b] text-white font-semibold rounded-xl hover:bg-[#b8734a] transition-colors'>
                Create New Link
              </button>
              <button className='px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors'>
                Export Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className='py-8'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Total Points */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#d4845b]/30 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4845b] to-[#b8734a] flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                  </svg>
                </div>
                <span className='text-sm text-[#a1a1aa]'>+12%</span>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>{customerStats.totalPoints.toLocaleString()}</h3>
              <p className='text-[#a1a1aa]'>Total Points</p>
            </div>

            {/* People Referred */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#d4845b]/30 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                  </svg>
                </div>
                <span className='text-sm text-[#10b981]'>+8%</span>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>{customerStats.peopleReferred}</h3>
              <p className='text-[#a1a1aa]'>People Referred</p>
            </div>

            {/* Active Links */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#d4845b]/30 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                  </svg>
                </div>
                <span className='text-sm text-[#3b82f6]'>+3</span>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>{customerStats.activeLinks}</h3>
              <p className='text-[#a1a1aa]'>Active Links</p>
            </div>

            {/* Quality Score */}
            <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#d4845b]/30 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' />
                  </svg>
                </div>
                <span className='text-sm text-[#f59e0b]'>+0.2</span>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>{customerStats.averageQualityScore}</h3>
              <p className='text-[#a1a1aa]'>Quality Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className='py-4 border-b border-white/10'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          <div className='flex gap-1 bg-white/5 rounded-xl p-1'>
            {['overview', 'referrals', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[#d4845b] text-white shadow-lg'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className='py-8'>
        <div className='container mx-auto px-8 md:px-16 xl:px-32'>
          {activeTab === 'overview' && (
            <div className='space-y-8'>
              {/* Referral Growth Chart */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-white'>Referral Growth</h2>
                  <div className='flex gap-2'>
                    <button className='px-4 py-2 bg-[#d4845b] text-white text-sm font-medium rounded-lg'>Points</button>
                    <button className='px-4 py-2 bg-white/10 text-[#a1a1aa] text-sm font-medium rounded-lg hover:bg-white/20'>Products</button>
                    <button className='px-4 py-2 bg-white/10 text-[#a1a1aa] text-sm font-medium rounded-lg hover:bg-white/20'>Artisans</button>
                  </div>
                </div>
                
                {/* Chart */}
                <div className='h-80 flex items-end justify-between gap-4'>
                  {referralData.map((data, index) => (
                    <div key={index} className='flex-1 flex flex-col items-center'>
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
                  ))}
                </div>
              </div>

              {/* Recent Activity & Active Links */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Recent Referrals */}
                <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
                  <h3 className='text-xl font-bold text-white mb-6'>Recent Referrals</h3>
                  <div className='space-y-4'>
                    {recentReferrals.map((referral, index) => (
                      <div key={index} className='flex items-center justify-between p-4 bg-white/5 rounded-xl'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-sm font-bold text-[#7a3419]'>
                            {referral.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className='font-medium text-white'>{referral.name}</p>
                            <p className='text-sm text-[#a1a1aa]'>{referral.date}</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-bold text-[#d4845b]'>+{referral.points} pts</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            referral.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {referral.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Links */}
                <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
                  <h3 className='text-xl font-bold text-white mb-6'>Active Links</h3>
                  <div className='space-y-4'>
                    {activeLinks.map((link) => (
                      <div key={link.id} className='p-4 bg-white/5 rounded-xl'>
                        <div className='flex items-center justify-between mb-2'>
                          <h4 className='font-medium text-white'>{link.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            link.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {link.status}
                          </span>
                        </div>
                        <div className='flex items-center justify-between text-sm text-[#a1a1aa]'>
                          <span>{link.clicks} clicks</span>
                          <span>{link.conversions} conversions</span>
                          <span className='text-[#d4845b] font-medium'>
                            {((link.conversions / link.clicks) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'referrals' && (
            <div className='space-y-8'>
              {/* Referral Analytics */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10'>
                <h2 className='text-2xl font-bold text-white mb-6'>Referral Analytics</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='text-center p-6 bg-white/5 rounded-xl'>
                    <div className='text-3xl font-bold text-[#d4845b] mb-2'>156</div>
                    <div className='text-[#a1a1aa]'>Total Clicks</div>
                  </div>
                  <div className='text-center p-6 bg-white/5 rounded-xl'>
                    <div className='text-3xl font-bold text-[#10b981] mb-2'>23</div>
                    <div className='text-[#a1a1aa]'>Successful Referrals</div>
                  </div>
                  <div className='text-center p-6 bg-white/5 rounded-xl'>
                    <div className='text-3xl font-bold text-[#3b82f6] mb-2'>14.7%</div>
                    <div className='text-[#a1a1aa]'>Conversion Rate</div>
                  </div>
                </div>
              </div>

              {/* Referral History */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
                <h3 className='text-xl font-bold text-white mb-6'>Referral History</h3>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b border-white/10'>
                        <th className='text-left py-3 text-[#a1a1aa] font-medium'>Name</th>
                        <th className='text-left py-3 text-[#a1a1aa] font-medium'>Date</th>
                        <th className='text-left py-3 text-[#a1a1aa] font-medium'>Points Earned</th>
                        <th className='text-left py-3 text-[#a1a1aa] font-medium'>Status</th>
                        <th className='text-left py-3 text-[#a1a1aa] font-medium'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReferrals.map((referral, index) => (
                        <tr key={index} className='border-b border-white/5'>
                          <td className='py-4'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-xs font-bold text-[#7a3419]'>
                                {referral.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className='font-medium text-white'>{referral.name}</span>
                            </div>
                          </td>
                          <td className='py-4 text-[#a1a1aa]'>{referral.date}</td>
                          <td className='py-4 font-bold text-[#d4845b]'>+{referral.points}</td>
                          <td className='py-4'>
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              referral.status === 'active' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {referral.status}
                            </span>
                          </td>
                          <td className='py-4'>
                            <button className='text-[#d4845b] hover:text-white transition-colors'>
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className='space-y-8'>
              {/* Leaderboard */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10'>
                <div className='flex items-center justify-between mb-8'>
                  <h2 className='text-2xl font-bold text-white'>Community Leaderboard</h2>
                  <div className='flex gap-2'>
                    <button className='px-4 py-2 bg-[#d4845b] text-white text-sm font-medium rounded-lg'>This Month</button>
                    <button className='px-4 py-2 bg-white/10 text-[#a1a1aa] text-sm font-medium rounded-lg hover:bg-white/20'>All Time</button>
                  </div>
                </div>
                
                <div className='space-y-4'>
                  {leaderboardData.map((user, index) => (
                    <div key={index} className={`flex items-center justify-between p-6 rounded-xl transition-all ${
                      index === 0 ? 'bg-gradient-to-r from-[#d4845b]/20 to-[#f8e1da]/10 border border-[#d4845b]/30' : 'bg-white/5 hover:bg-white/10'
                    }`}>
                      <div className='flex items-center gap-4'>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          index === 0 ? 'bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-white' :
                          index === 1 ? 'bg-gradient-to-br from-[#9ca3af] to-[#6b7280] text-white' :
                          index === 2 ? 'bg-gradient-to-br from-[#d97706] to-[#b45309] text-white' :
                          'bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] text-[#7a3419]'
                        }`}>
                          {index + 1}
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-sm font-bold text-[#7a3419]'>
                            {user.avatar}
                          </div>
                          <div>
                            <p className='font-bold text-white'>{user.name}</p>
                            <p className='text-sm text-[#a1a1aa]'>{user.referrals} referrals</p>
                          </div>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-2xl font-bold text-[#d4845b]'>{user.points.toLocaleString()}</p>
                        <p className='text-sm text-[#a1a1aa]'>points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Ranking */}
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
                <h3 className='text-xl font-bold text-white mb-6'>Your Ranking</h3>
                <div className='flex items-center justify-between p-6 bg-gradient-to-r from-[#d4845b]/10 to-[#f8e1da]/5 rounded-xl border border-[#d4845b]/20'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#d4845b] to-[#b8734a] flex items-center justify-center text-lg font-bold text-white'>
                      12
                    </div>
                    <div>
                      <p className='font-bold text-white'>Your Position</p>
                      <p className='text-sm text-[#a1a1aa]'>You're in the top 15% of referrers!</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-2xl font-bold text-[#d4845b]'>{customerStats.totalPoints.toLocaleString()}</p>
                    <p className='text-sm text-[#a1a1aa]'>your points</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className='relative bg-[#18181b] border-t border-white/10 pt-16 pb-8 text-base backdrop-blur-lg shadow-2xl rounded-t-2xl mt-16'>
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
              <a href='#' className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z' />
                </svg>
              </a>
              <a href='#' className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M19.615 3.184c-1.72-.153-5.6-.153-7.32 0-1.72.153-2.89.63-3.6 1.34-.71.71-1.19 1.88-1.34 3.6-.153 1.72-.153 5.6 0 7.32.153 1.72.63 2.89 1.34 3.6.71.71 1.88 1.19 3.6 1.34 1.72.153 5.6.153 7.32 0 1.72-.153 2.89-.63 3.6-1.34.71-.71 1.19-1.88 1.34-3.6.153-1.72.153-5.6 0-7.32-.153-1.72-.63-2.89-1.34-3.6-.71-.71-1.88-1.19-3.6-1.34zm-7.615 1.816c1.67-.15 5.47-.15 7.14 0 1.52.14 2.35.6 2.7.95.35.35.81 1.18.95 2.7.15 1.67.15 5.47 0 7.14-.14 1.52-.6 2.35-.95 2.7-.35.35-1.18.81-2.7.95-1.67.15-5.47.15-7.14 0-1.52-.14-2.35-.6-2.7-.95-.35-.35-.81-1.18-.95-2.7-.15-1.67-.15-5.47 0-7.14.14-1.52.6-2.35.95-2.7.35-.35 1.18-.81 2.7-.95zm3.385 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                </svg>
              </a>
              <a href='#' className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM20.452 20.452h-3.56v-5.605c0-1.336-.025-3.057-1.865-3.057-1.867 0-2.153 1.46-2.153 2.97v5.692h-3.56V9h3.42v1.561h.05c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286z' />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className='font-semibold mb-3 text-white text-lg'>Marketplace</div>
            <ul className='space-y-2 text-[#a1a1aa]'>
              <li>Browse Products</li>
              <li>Categories</li>
              <li>Featured</li>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
            </ul>
          </div>
          <div>
            <div className='font-semibold mb-3 text-white text-lg'>Entrepreneurs</div>
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
            <a href='#' className='hover:text-[#d4845b] transition-colors'>Privacy Policy</a>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>Terms of Service</a>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>Cookie Policy</a>
            <a href='#' className='hover:text-[#d4845b] transition-colors'>Refund Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
