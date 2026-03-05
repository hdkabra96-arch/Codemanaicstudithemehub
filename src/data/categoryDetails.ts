import { Theme } from '../types';

export interface CategoryDetail {
  menuStructure: string[];
  characteristics: string[];
  recommendedStack: string[];
  plugins: string[];
}

export const CATEGORY_DETAILS: Record<Theme['category'], CategoryDetail> = {
  'Corporate': {
    menuStructure: ['Home', 'About Us', 'Services', 'Case Studies', 'Testimonials', 'Blog', 'Contact'],
    characteristics: [
      'Minimal & professional',
      'Neutral base + brand colors',
      'Clean typography',
      'Lead generation focus'
    ],
    recommendedStack: ['WordPress + Elementor', 'Next.js + Tailwind'],
    plugins: ['Contact Form', 'Appointment Booking', 'SEO Optimization', 'Analytics', 'SSL Security']
  },
  'E-commerce': {
    menuStructure: ['Home', 'Shop', 'Product Details', 'Cart', 'Checkout', 'Account', 'Track Order'],
    characteristics: [
      'Product-focused layout',
      'Bold CTA buttons',
      'Mega menu navigation',
      'High-conversion design'
    ],
    recommendedStack: ['Shopify', 'WooCommerce', 'MERN Stack'],
    plugins: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Wishlist', 'Coupon System']
  },
  'Blogging': {
    menuStructure: ['Home', 'Categories', 'Popular Posts', 'About', 'Contact', 'Subscribe'],
    characteristics: [
      'Clean reading layout',
      'Good spacing',
      'Featured images',
      'Table of contents',
      'Social share buttons'
    ],
    recommendedStack: ['WordPress + Astra', 'Ghost', 'Next.js + MDX'],
    plugins: ['SEO Plugin', 'Schema Markup', 'Table of Contents', 'Newsletter Integration']
  },
  'Portfolio': {
    menuStructure: ['Home', 'About Me', 'Skills', 'Projects', 'Resume', 'Contact'],
    characteristics: [
      'Bold hero section',
      'Animated scroll',
      'Dark + modern theme',
      'Visual project showcase'
    ],
    recommendedStack: ['React + Tailwind', 'Framer Motion'],
    plugins: ['Image Optimization', 'Lazy Loading', 'Contact Form', 'Social Feeds']
  },
  'Educational': {
    menuStructure: ['Home', 'Courses', 'Categories', 'Instructors', 'Blog', 'Login', 'Dashboard'],
    characteristics: [
      'LMS system',
      'Video hosting',
      'Quizzes & Certificates',
      'Payment gateway'
    ],
    recommendedStack: ['LearnDash (WordPress)', 'Teachable', 'Laravel / MERN LMS'],
    plugins: ['LMS Plugin', 'Video Player', 'Quiz Maker', 'Membership Manager']
  },
  'Creative': {
    menuStructure: ['Home', 'Work', 'Studio', 'Journal', 'Contact'],
    characteristics: [
      'Unique layouts',
      'Interactive elements',
      'High-quality imagery',
      'Experimental typography'
    ],
    recommendedStack: ['React + Three.js', 'Vue + Nuxt', 'Webflow'],
    plugins: ['GSAP Animations', 'Custom Cursor', 'Smooth Scroll', 'WebGL Effects']
  },
  'Coffee Shop': {
    menuStructure: ['Home', 'Menu', 'Locations', 'Our Story', 'Shop', 'Cart', 'Contact'],
    characteristics: [
      'Cozy & warm aesthetic',
      'Menu visualization',
      'Online ordering',
      'Subscription options'
    ],
    recommendedStack: ['Square Online', 'WordPress + WooCommerce', 'Shopify'],
    plugins: ['Menu Plugin', 'Delivery Integration', 'Loyalty Program', 'Table Reservation']
  },
  'Jewellery': {
    menuStructure: ['Home', 'Collections', 'Rings', 'Necklaces', 'Earrings', 'Gifts', 'About', 'Contact'],
    characteristics: [
      'Luxury & minimalist',
      'High-res imagery',
      'Elegant typography',
      'Trust signals'
    ],
    recommendedStack: ['Shopify Plus', 'Magento', 'WooCommerce'],
    plugins: ['360 Product View', 'Virtual Try-On', 'Wishlist', 'Secure Checkout']
  },
  'News': {
    menuStructure: ['Home', 'World', 'Politics', 'Tech', 'Sports', 'Opinion', 'Contact'],
    characteristics: [
      'Grid layout',
      'Breaking news ticker',
      'Multi-column',
      'Ad management'
    ],
    recommendedStack: ['WordPress Newspaper Theme', 'Custom CMS', 'Next.js + Headless CMS'],
    plugins: ['Ad Manager', 'Social Sharing', 'Trending Posts', 'AMP Support']
  },
  'SaaS': {
    menuStructure: ['Home', 'Features', 'Pricing', 'Docs', 'Login', 'Dashboard'],
    characteristics: [
      'Modern gradient',
      'Feature comparison tables',
      'Authentication',
      'Subscription billing',
      'API integration'
    ],
    recommendedStack: ['Next.js', 'Node.js', 'Stripe'],
    plugins: ['Auth0', 'Stripe', 'Intercom', 'Segment']
  }
};

export const UNIVERSAL_BEST_PRACTICES = {
  navigation: ['Max 7 main menu items', 'Use dropdowns', 'Sticky header', 'Clear CTA'],
  design: ['8px spacing system', 'Consistent buttons', 'Same border radius', 'Proper white space'],
  performance: ['Lazy loading images', 'Use WebP', 'CDN (Cloudflare)', 'Compress CSS/JS'],
  seo: ['Proper H1–H6 hierarchy', 'Schema markup', 'Fast load (<2.5s)', 'Mobile responsive'],
  security: ['SSL', 'Firewall', 'Regular backup', '2FA admin login']
};
