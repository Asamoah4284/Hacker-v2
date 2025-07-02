import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Dummy team data
const team = [
  {
    name: 'Dieu-Donne Eddy',
    role: 'Founder & CEO',
    img: '',
    bio: 'Visionary leader passionate about empowering African entrepreneurs.',
  },
  {
    name: 'Kwame Mensah',
    role: 'CTO',
    img: '',
    bio: 'Tech innovator building scalable, inclusive platforms.',
  },
  {
    name: 'Fatima Bello',
    role: 'Head of Community',
    img: '',
    bio: 'Community builder connecting creators and customers.',
  },
];

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#18181b] text-white'>
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className='relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#18181b] dark:via-[#232326] dark:to-[#18181b]'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Blurred Accent Shape */}
        <div className='absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d4845b] opacity-20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='container mx-auto px-8 md:px-16 xl:px-32 text-center relative z-10'>
          <h1 className='text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_32px_rgba(212,132,91,0.15)]'>
            About Kola
          </h1>
          <p className='text-2xl text-[#a1a1aa] max-w-2xl mx-auto mb-10'>
            Kola is on a mission to empower Africa's most innovative
            entrepreneurs and connect them with the world through a marketplace
            that celebrates creativity, authenticity, and impact.
          </p>
        </div>
      </motion.section>

      {/* Mission & Team Section */}
      <motion.section
        className='py-20'
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <div className='container mx-auto px-8 md:px-16 xl:px-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start animate-fade-in-up'>
          {/* Mission Statement */}
          <div className='space-y-8'>
            <h2 className='text-4xl font-bold text-white mb-4'>Our Mission</h2>
            <p className='text-xl text-[#a1a1aa] mb-6'>
              To create meaningful connections between African entrepreneurs and
              global customers, fostering economic growth, cultural exchange,
              and community impact.
            </p>
            <h3 className='text-2xl font-semibold text-white mb-2'>
              Our Values
            </h3>
            <ul className='space-y-3 text-lg text-[#fdf3f0] list-disc list-inside'>
              <li>Empowerment & Opportunity</li>
              <li>Authenticity & Quality</li>
              <li>Community & Collaboration</li>
              <li>Innovation & Growth</li>
            </ul>
          </div>
          {/* Team Card */}
          <div className='bg-white/80 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/10 p-10 flex flex-col gap-8'>
            <h3 className='text-2xl font-bold text-white mb-2 text-center'>
              Meet Our Team
            </h3>
            <div className='flex flex-col gap-8'>
              {team.map((member, i) => (
                <div key={i} className='flex items-center gap-5'>
                  {/* Avatar */}
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#f8e1da] via-[#f1c3b5] to-[#d4845b] flex items-center justify-center text-2xl font-bold text-[#7a3419] shadow'>
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className='w-full h-full object-cover rounded-full'
                      />
                    ) : (
                      member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    )}
                  </div>
                  <div>
                    <div className='font-bold text-lg text-white'>
                      {member.name}
                    </div>
                    <div className='text-[#d4845b] font-semibold'>
                      {member.role}
                    </div>
                    <div className='text-[#a1a1aa] text-base'>{member.bio}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
