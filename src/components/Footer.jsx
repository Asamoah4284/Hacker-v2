export default function Footer() {
  return (
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
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z' />
              </svg>
            </a>
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M19.615 3.184c-1.72-.153-5.6-.153-7.32 0-1.72.153-2.89.63-3.6 1.34-.71.71-1.19 1.88-1.34 3.6-.153 1.72-.153 5.6 0 7.32.153 1.72.63 2.89 1.34 3.6.71.71 1.88 1.19 3.6 1.34 1.72.153 5.6.153 7.32 0 1.72-.153 2.89-.63 3.6-1.34.71-.71 1.19-1.88 1.34-3.6.153-1.72.153-5.6 0-7.32-.153-1.72-.63-2.89-1.34-3.6-.71-.71-1.88-1.19-3.6-1.34zm-7.615 1.816c1.67-.15 5.47-.15 7.14 0 1.52.14 2.35.6 2.7.95.35.35.81 1.18.95 2.7.15 1.67.15 5.47 0 7.14-.14 1.52-.6 2.35-.95 2.7-.35.35-1.18.81-2.7.95-1.67.15-5.47.15-7.14 0-1.52-.14-2.35-.6-2.7-.95-.35-.35-.81-1.18-.95-2.7-.15-1.67-.15-5.47 0-7.14.14-1.52.6-2.35.95-2.7.35-.35 1.18-.81 2.7-.95zm3.385 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
              </svg>
            </a>
            <a
              href='#'
              className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4845b] text-[#a1a1aa] hover:text-white transition-colors'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
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
  );
}
