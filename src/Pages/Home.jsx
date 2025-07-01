import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Star,
  Users,
  Globe,
  Heart,
  ShoppingBag,
  Search,
  Filter,
  Sparkles,
  Award,
  Shield,
  Zap,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Replace Next.js Link with React Router Link
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Hero carousel images of African entrepreneurs
const heroImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'African woman entrepreneur working on traditional textiles',
    name: 'Aisha Textiles',
    location: 'Lagos, Nigeria',
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
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'African beauty entrepreneur with natural products',
    name: 'Fatima Beauty',
    location: 'Nairobi, Kenya',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'African jewelry maker crafting traditional beads',
    name: 'Mama Beads',
    location: 'Dakar, Senegal',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'African potter creating beautiful ceramics',
    name: 'Kofi Pottery',
    location: 'Kumasi, Ghana',
  },
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative py-12 lg:py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Left Column - Content */}
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='space-y-6'>
                <Badge className='bg-terracotta-100 text-terracotta-800 hover:bg-terracotta-200 text-sm px-3 py-1'>
                  <Sparkles className='h-3 w-3 mr-1' />
                  ENTREPRENEUR MARKETPLACE
                </Badge>

                <h1 className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight'>
                  Amplify Your{' '}
                  <span className='text-terracotta-500'>Hustle</span>.
                </h1>

                <p className='text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed'>
                  Kola connects Africa's most innovative entrepreneurs with the
                  world. Turn your customers into your marketing team.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link to='/marketplace'>
                  <Button
                    size='lg'
                    className='bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-3 text-lg rounded-full'
                  >
                    Explore Marketplace
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Button>
                </Link>
                <Link to='/entrepreneurs'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='px-8 py-3 text-lg border-terracotta-200 hover:bg-terracotta-50 rounded-full'
                  >
                    Meet Entrepreneurs
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Image Carousel */}
            <motion.div
              className='relative'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className='relative min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-3xl shadow-2xl'>
                <img
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  className='w-full h-full object-cover transition-opacity duration-700 ease-in-out'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-3xl'>
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
