import React, { useState, useEffect } from 'react';
import { X, Monitor, Smartphone, Tablet, ShoppingCart, Info, CheckCircle, Shield, Zap, Search, Menu, ArrowRight, User, Mail, MapPin, Phone, Calendar, BookOpen, Briefcase, Image as ImageIcon, Layout, Star, CreditCard, Users, FileText, LogIn, Settings, List, Grid, Hexagon, Heart, Truck, RefreshCw, Download, Github, Linkedin, Twitter, Instagram, ExternalLink, ChevronRight, Clock, ChevronDown, Play, Video, Award, Server, Database, Code, Terminal, BarChart, PieChart, Globe, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '../types';
import { cn } from '../lib/utils';
import { CATEGORY_DETAILS, UNIVERSAL_BEST_PRACTICES } from '../data/categoryDetails';

interface LivePreviewProps {
  theme: Theme;
  onClose: () => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ theme, onClose }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showDetails, setShowDetails] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR'>('USD');
  const [showLocationToast, setShowLocationToast] = useState(false);
  const [detectedRegion, setDetectedRegion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const details = CATEGORY_DETAILS[theme.category];

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActivePage('Dashboard');
    }, 2000);
  };

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let region = '';
    
    if (timeZone === 'Asia/Kolkata' || timeZone === 'Asia/Calcutta') {
      setCurrency('INR');
      region = 'India';
    } else if (timeZone === 'Europe/London') {
      setCurrency('GBP');
      region = 'UK';
    } else if (timeZone.startsWith('Europe/')) {
      setCurrency('EUR');
      region = 'Europe';
    }

    if (region) {
      setDetectedRegion(region);
      setShowLocationToast(true);
      const timer = setTimeout(() => setShowLocationToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const formatPrice = (amount: number) => {
    switch (currency) {
      case 'EUR': return `€${(amount * 0.92).toFixed(0)}`;
      case 'GBP': return `£${(amount * 0.79).toFixed(0)}`;
      case 'INR': return `₹${(amount * 83).toFixed(0)}`;
      default: return `$${amount}`;
    }
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'Home':
        if (theme.category === 'Blogging') {
          return (
            <div className="bg-white min-h-screen font-serif">
              {/* Minimal Header */}
              <header className="py-12 px-6 border-b border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                  <span className="text-sm font-sans font-bold tracking-widest text-slate-500 uppercase mb-4 block">The Journal</span>
                  <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">{theme.title}</h1>
                  <p className="text-xl text-slate-600 font-light italic max-w-2xl mx-auto">
                    Exploring the intersection of design, technology, and culture.
                  </p>
                </div>
              </header>

              {/* Featured Post */}
              <section className="py-16 px-6 max-w-6xl mx-auto">
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8 group cursor-pointer" onClick={() => setActivePage('Single Post Page')}>
                  <img src="https://picsum.photos/seed/blog_hero/1600/900" alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-3xl">
                    <span className="bg-white text-slate-900 px-3 py-1 text-xs font-sans font-bold uppercase tracking-wider mb-4 inline-block">Featured</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">The Art of Minimalist Living in a Digital Age</h2>
                    <div className="flex items-center gap-4 text-sm font-sans opacity-90">
                      <span>By Sarah Jenkins</span>
                      <span>•</span>
                      <span>Oct 24, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Posts Grid */}
              <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 font-sans border-b border-slate-200 pb-4">Latest Stories</h3>
                    <div className="space-y-12">
                      {[1, 2, 3, 4].map((post) => (
                        <article key={post} className="flex flex-col md:flex-row gap-8 group cursor-pointer" onClick={() => setActivePage('Single Post Page')}>
                          <div className="w-full md:w-1/3 aspect-[4/3] overflow-hidden rounded-lg">
                            <img src={`https://picsum.photos/seed/blog_post${post}/800/600`} alt="Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <div className="flex-1">
                            <span className="text-brand-600 text-xs font-sans font-bold uppercase tracking-wider mb-2 block">Design</span>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">Understanding Typography in Modern Web Design</h2>
                            <p className="text-slate-600 mb-4 line-clamp-3 font-light leading-relaxed">
                              Typography is more than just choosing a font. It's about hierarchy, spacing, and creating a rhythm that guides the reader through your content.
                            </p>
                            <span className="text-sm text-slate-400 font-sans">Read Story →</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <aside className="w-full md:w-80 space-y-12">
                    <div>
                      <h4 className="font-sans font-bold text-slate-900 uppercase tracking-wider text-sm mb-6 border-b border-slate-200 pb-2">About</h4>
                      <img src="https://picsum.photos/seed/author/400/400" alt="Author" className="w-full aspect-square object-cover rounded-lg mb-4" />
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Hi, I'm Alex. I write about design, code, and the future of the web. Welcome to my digital garden.
                      </p>
                      <button className="text-brand-600 font-sans text-sm font-bold" onClick={() => setActivePage('About')}>More about me →</button>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-slate-900 uppercase tracking-wider text-sm mb-6 border-b border-slate-200 pb-2">Categories</h4>
                      <ul className="space-y-3">
                        {['Design', 'Development', 'Lifestyle', 'Technology', 'Travel'].map(cat => (
                          <li key={cat} className="flex justify-between items-center text-slate-600 hover:text-brand-600 cursor-pointer transition-colors font-sans text-sm">
                            <span>{cat}</span>
                            <span className="text-slate-400 text-xs">({Math.floor(Math.random() * 20) + 5})</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl">
                      <h4 className="font-sans font-bold text-slate-900 uppercase tracking-wider text-sm mb-4">Newsletter</h4>
                      <p className="text-slate-600 text-sm mb-4">Get the latest stories delivered to your inbox weekly.</p>
                      <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-lg border border-slate-200 mb-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                      <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold font-sans hover:bg-slate-800 transition-colors">Subscribe</button>
                    </div>
                  </aside>
                </div>
              </section>
            </div>
          );
        }

        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white font-sans selection:bg-indigo-500 selection:text-white">
              {/* Hero Section */}
              <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900"></div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="order-2 md:order-1">
                    <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Hello, I'm</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      Your Digital <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Vision</span> Realized.
                    </h1>
                    <p className="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
                      I create custom websites that blend creativity and functionality, using modern tech to craft unique digital experiences.
                    </p>
                    <div className="flex gap-4">
                      <button onClick={() => setActivePage('Projects')} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
                        View Work
                      </button>
                      <button onClick={() => setActivePage('Contact')} className="border border-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all">
                        Contact Me
                      </button>
                    </div>
                    <div className="flex gap-6 mt-12 text-slate-500">
                      <Github className="hover:text-white cursor-pointer transition-colors" size={24} />
                      <Linkedin className="hover:text-white cursor-pointer transition-colors" size={24} />
                      <Twitter className="hover:text-white cursor-pointer transition-colors" size={24} />
                      <Instagram className="hover:text-white cursor-pointer transition-colors" size={24} />
                    </div>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="relative w-80 h-80 md:w-96 md:h-96">
                      <div className="absolute inset-0 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                      <img src="https://picsum.photos/seed/portfolio_hero/800/800" alt="Profile" className="relative z-10 w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl" />
                      
                      {/* Floating Badges */}
                      <div className="absolute -top-4 -right-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl animate-bounce duration-[3000ms]">
                        <span className="text-2xl">✨</span>
                      </div>
                      <div className="absolute bottom-8 -left-8 bg-slate-800 px-6 py-3 rounded-full border border-slate-700 shadow-xl flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-sm">Available for work</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Selected Work Preview */}
              <section className="py-20 px-6 bg-slate-900">
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">Selected Work</h2>
                      <p className="text-slate-400">A selection of my recent projects.</p>
                    </div>
                    <button onClick={() => setActivePage('Projects')} className="text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-2">
                      View All <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2].map((item) => (
                      <div key={item} className="group relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => setActivePage('Projects')}>
                        <div className="aspect-[4/3]">
                          <img src={`https://picsum.photos/seed/portfolio_project${item}/800/600`} alt="Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                          <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">Web Design</span>
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">Project Title {item}</h3>
                          <p className="text-slate-300 text-sm line-clamp-2">A brief description of the project and the role played in its creation.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          );
        }

        if (theme.category === 'Educational') {
          return (
            <>
              {/* Educational Hero */}
              <div className="relative bg-slate-50 min-h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10"></div>
                  <img src="https://picsum.photos/seed/edu_hero/1920/1080" alt="Education" className="w-full h-full object-cover" />
                </div>
                
                <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white space-y-8">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-100 font-bold text-sm uppercase tracking-wider">
                      Online Learning Platform
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                      Unlock Your Potential with Online Courses
                    </h1>
                    <p className="text-xl text-blue-100 max-w-lg">
                      Learn from industry experts and enhance your skills. Join millions of learners worldwide.
                    </p>
                    
                    <div className="bg-white p-2 rounded-lg shadow-lg max-w-md flex">
                      <input 
                        type="text" 
                        placeholder="What do you want to learn?" 
                        className="flex-grow px-4 py-3 text-slate-900 outline-none rounded-l-md"
                      />
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">
                        Search
                      </button>
                    </div>
                    
                    <div className="flex gap-8 text-sm font-medium text-blue-200 pt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-400" /> 10k+ Courses
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-400" /> Expert Instructors
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-400" /> Lifetime Access
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block relative">
                    <div className="absolute -inset-4 bg-white/10 rounded-2xl transform rotate-3"></div>
                    <img src="https://picsum.photos/seed/edu_student/600/700" alt="Student" className="relative rounded-2xl shadow-2xl border-4 border-white/20" />
                    
                    {/* Floating Stats Card */}
                    <div className="absolute bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                      <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Active Students</p>
                        <p className="text-slate-900 font-bold text-xl">50k+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <section className="py-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { label: 'Students', value: '50k+' },
                    { label: 'Courses', value: '1,200+' },
                    { label: 'Instructors', value: '300+' },
                    { label: 'Countries', value: '100+' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <h3 className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</h3>
                      <p className="text-slate-500 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Popular Courses */}
              <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Courses</h2>
                      <p className="text-slate-500">Explore our highest-rated courses.</p>
                    </div>
                    <button onClick={() => setActivePage('Courses')} className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2">
                      View All Courses <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-slate-100" onClick={() => setActivePage('Course Detail')}>
                        <div className="aspect-video relative overflow-hidden">
                          <img src={`https://picsum.photos/seed/edu_course${item}/600/400`} alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                            Best Seller
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-blue-600 uppercase tracking-wider">
                            <span className="bg-blue-50 px-2 py-1 rounded">Development</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /> 4.8</span>
                          </div>
                          <h3 className="font-bold text-xl text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">Complete Web Development Bootcamp 2024</h3>
                          <div className="flex items-center gap-3 mb-4">
                            <img src={`https://picsum.photos/seed/instructor${item}/100/100`} alt="Instructor" className="w-8 h-8 rounded-full" />
                            <span className="text-sm text-slate-500 font-medium">Dr. Angela Yu</span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className="font-bold text-xl text-slate-900">$19.99</span>
                            <span className="text-slate-400 line-through text-sm">$99.99</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Become Instructor CTA */}
              <section className="py-20 px-6 bg-blue-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-800/50 transform skew-x-12 translate-x-20"></div>
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6">Become an Instructor</h2>
                    <p className="text-blue-100 text-lg mb-8">
                      Teach what you love. Instructor from around the world teach millions of students on our platform. We provide the tools and skills to teach what you love.
                    </p>
                    <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">
                      Start Teaching Today
                    </button>
                  </div>
                  <div className="relative">
                    <img src="https://picsum.photos/seed/edu_instructor/600/400" alt="Instructor" className="rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
              </section>
            </>
          );
        }

        if (theme.category === 'News') {
          return (
            <div className="bg-white min-h-screen font-serif text-slate-900">
              {/* Breaking News Ticker */}
              <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold flex items-center gap-4 overflow-hidden">
                <span className="uppercase tracking-wider flex-shrink-0 bg-red-800 px-2 py-0.5 rounded text-xs">Breaking</span>
                <div className="whitespace-nowrap animate-marquee">
                  Global markets rally as tech stocks hit new highs • Climate summit reaches historic agreement • New electric vehicle battery technology promises 1000km range • Local sports team wins championship after 20 years
                </div>
              </div>

              {/* Date & Top Bar */}
              <div className="border-b border-slate-100 py-2 px-6 hidden md:flex justify-between items-center text-xs text-slate-500 font-sans">
                <div>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="flex gap-4">
                  <span className="hover:text-red-600 cursor-pointer">Sign In</span>
                  <span className="hover:text-red-600 cursor-pointer">Subscribe</span>
                </div>
              </div>

              {/* Main Header Logo */}
              <div className="py-8 text-center border-b border-slate-900 mx-6 mb-8">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-display">{theme.title}</h1>
                <p className="text-sm font-sans font-bold tracking-[0.2em] text-slate-400 uppercase mt-2">Truth • Integrity • Perspective</p>
              </div>

              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-12">
                  {/* Hero Article */}
                  <article className="group cursor-pointer" onClick={() => setActivePage('Article')}>
                    <div className="relative aspect-[16/9] overflow-hidden mb-4">
                      <img src="https://picsum.photos/seed/news_hero/1200/800" alt="Hero" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute bottom-4 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1">Politics</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-3 group-hover:text-red-700 transition-colors">
                      The Global Shift: How New Policies Are Reshaping International Trade
                    </h2>
                    <p className="text-lg text-slate-600 font-sans leading-relaxed mb-4">
                      As nations gather for the annual economic summit, tensions rise over new trade tariffs and their potential impact on global supply chains. Experts weigh in on what this means for the consumer.
                    </p>
                    <div className="flex items-center gap-3 text-xs font-sans text-slate-400 font-bold uppercase">
                      <span className="text-slate-900">By James Anderson</span>
                      <span>•</span>
                      <span>4 Hours Ago</span>
                    </div>
                  </article>

                  {/* Sub-Hero Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                    {[1, 2].map((item) => (
                      <article key={item} className="group cursor-pointer" onClick={() => setActivePage('Article')}>
                        <div className="aspect-[3/2] overflow-hidden mb-3 bg-slate-100">
                          <img src={`https://picsum.photos/seed/news_sub${item}/600/400`} alt="News" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <span className="text-red-600 text-xs font-bold uppercase mb-2 block font-sans">Technology</span>
                        <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-red-700 transition-colors">
                          The Rise of AI in Everyday Life: What You Need to Know
                        </h3>
                        <p className="text-slate-600 text-sm font-sans line-clamp-3">
                          From smart homes to autonomous vehicles, artificial intelligence is becoming increasingly integrated into our daily routines.
                        </p>
                      </article>
                    ))}
                  </div>

                  {/* Ad Banner */}
                  <div className="bg-slate-100 py-8 text-center border border-slate-200 my-8">
                    <span className="text-xs font-sans text-slate-400 uppercase tracking-widest block mb-2">Advertisement</span>
                    <div className="w-[728px] h-[90px] bg-slate-200 mx-auto flex items-center justify-center text-slate-400 font-sans text-sm">
                      728x90 Leaderboard Ad
                    </div>
                  </div>

                  {/* Category Section: World */}
                  <div>
                    <div className="flex justify-between items-end border-b-2 border-black mb-6 pb-2">
                      <h3 className="text-2xl font-black uppercase">World News</h3>
                      <span className="text-xs font-sans font-bold text-red-600 cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="space-y-6">
                      {[1, 2, 3].map((item) => (
                        <article key={item} className="flex gap-6 group cursor-pointer" onClick={() => setActivePage('Article')}>
                          <div className="w-1/3 aspect-[3/2] overflow-hidden bg-slate-100 flex-shrink-0">
                            <img src={`https://picsum.photos/seed/news_world${item}/400/300`} alt="News" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <div>
                            <span className="text-red-600 text-xs font-bold uppercase mb-1 block font-sans">Europe</span>
                            <h4 className="text-lg font-bold leading-tight mb-2 group-hover:text-red-700 transition-colors">
                              Historic Landmarks Under Renovation: Preserving Heritage for Future Generations
                            </h4>
                            <p className="text-slate-600 text-sm font-sans line-clamp-2 hidden md:block">
                              A look into the massive restoration projects currently underway across major European capitals.
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-12">
                  {/* Trending Widget */}
                  <div>
                    <h3 className="text-lg font-black uppercase border-b-2 border-red-600 mb-6 pb-2 inline-block">Trending Now</h3>
                    <div className="space-y-0">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex gap-4 items-start py-4 border-b border-slate-100 group cursor-pointer" onClick={() => setActivePage('Article')}>
                          <span className="text-3xl font-black text-slate-200 group-hover:text-red-600 transition-colors font-sans">{item}</span>
                          <div>
                            <span className="text-xs font-bold text-red-600 uppercase mb-1 block font-sans">Opinion</span>
                            <h4 className="font-bold leading-snug group-hover:text-red-700 transition-colors">
                              Why Remote Work is Here to Stay: A Comprehensive Analysis
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Widget */}
                  <div className="bg-slate-50 p-6 border border-slate-100">
                    <h3 className="text-lg font-black uppercase mb-4">Follow Us</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white py-2 px-4 text-sm font-bold font-sans hover:opacity-90">
                        <Twitter size={16} /> Twitter
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-[#4267B2] text-white py-2 px-4 text-sm font-bold font-sans hover:opacity-90">
                        <Linkedin size={16} /> Facebook
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-[#C13584] text-white py-2 px-4 text-sm font-bold font-sans hover:opacity-90">
                        <Instagram size={16} /> Instagram
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-[#FF0000] text-white py-2 px-4 text-sm font-bold font-sans hover:opacity-90">
                        <Video size={16} /> YouTube
                      </button>
                    </div>
                  </div>

                  {/* Ad Widget */}
                  <div className="bg-slate-100 aspect-square flex items-center justify-center text-slate-400 font-sans text-sm border border-slate-200">
                    300x250 Ad Space
                  </div>

                  {/* Newsletter Widget */}
                  <div className="bg-slate-900 text-white p-8 text-center">
                    <Mail size={32} className="mx-auto mb-4 text-red-500" />
                    <h3 className="text-xl font-bold mb-2 font-display uppercase">Daily Briefing</h3>
                    <p className="text-slate-400 text-sm mb-6 font-sans">Get the most important news delivered to your inbox every morning.</p>
                    <input type="email" placeholder="Your email address" className="w-full px-4 py-3 text-slate-900 mb-3 text-sm font-sans outline-none" />
                    <button className="w-full bg-red-600 text-white py-3 font-bold text-sm font-sans uppercase tracking-wider hover:bg-red-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          );
        }

        if (theme.category === 'SaaS') {
          return (
            <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
              {/* Hero Section */}
              <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 z-0"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1 mb-8 shadow-sm animate-fade-in-up">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>
                    <span className="text-sm font-medium text-slate-600">v2.0 is now available</span>
                    <ArrowRight size={14} className="text-slate-400" />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                    Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">entire workflow</span> in one place.
                  </h1>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    The all-in-one platform for modern teams. Streamline your operations, automate tasks, and scale your business with enterprise-grade tools.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1">
                      Start Free Trial
                    </button>
                    <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2">
                      <Play size={20} className="fill-slate-700" /> Watch Demo
                    </button>
                  </div>
                  <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img src="https://picsum.photos/seed/saas_dashboard/1200/800" alt="Dashboard Preview" className="w-full mt-12" />
                  </div>
                </div>
              </section>

              {/* Logos */}
              <section className="py-12 border-y border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
                  <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-8 w-32 bg-slate-800 rounded opacity-20"></div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Features Grid */}
              <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
                    <p className="text-lg text-slate-600">Powerful features built for modern teams. We've thought of everything so you don't have to.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed and performance across all devices.' },
                      { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption and security protocols standard.' },
                      { icon: BarChart, title: 'Real-time Analytics', desc: 'Track your growth with detailed, real-time insights.' },
                      { icon: Users, title: 'Team Collaboration', desc: 'Built-in tools for seamless team communication.' },
                      { icon: Globe, title: 'Global Infrastructure', desc: 'Deployed on edge networks for low latency worldwide.' },
                      { icon: Code, title: 'Developer API', desc: 'Robust API for custom integrations and extensions.' }
                    ].map((feature, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                          <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
                    <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">Join thousands of teams who have already switched to our platform. Start your 14-day free trial today.</p>
                    <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg">
                      Get Started for Free
                    </button>
                    <p className="mt-6 text-sm text-indigo-200 opacity-80">No credit card required • Cancel anytime</p>
                  </div>
                </div>
              </section>
            </div>
          );
        }

        if (theme.category === 'Coffee Shop') {
          return (
            <>
              {/* Coffee Shop Hero */}
              <div className="relative h-[600px] flex items-center justify-center text-center text-white">
                <img src="https://picsum.photos/seed/coffee_hero/1920/1080" alt="Coffee Hero" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
                <div className="relative z-10 max-w-3xl px-6">
                  <span className="text-amber-400 font-serif italic text-xl mb-4 block">Est. 2024</span>
                  <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                    Experience the <br/> Perfect Brew
                  </h1>
                  <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto font-light">
                    Artisanal coffee roasted daily. Taste the passion in every cup.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => setActivePage('Menu')} className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-500 transition-colors">
                      View Menu
                    </button>
                    <button onClick={() => setActivePage('Shop')} className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
                      Order Online
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Blends */}
              <section className="py-20 px-6 bg-[#f8f5f2]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Signature Blends</h2>
                    <p className="text-slate-600">Sourced from the world's best coffee regions.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer" onClick={() => setActivePage('Product Details')}>
                        <div className="aspect-square relative overflow-hidden">
                          <img src={`https://picsum.photos/seed/coffee_bag${item}/500/500`} alt="Coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-bold text-xl text-slate-900 mb-2">House Blend No. {item}</h3>
                          <p className="text-amber-600 font-medium mb-4">$18.00 / 12oz</p>
                          <button className="text-slate-900 font-bold border-b-2 border-amber-400 hover:text-amber-600 transition-colors">Add to Cart</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                    <img src="https://picsum.photos/seed/coffee_shop_interior/600/800" alt="Interior" className="rounded-2xl shadow-xl" />
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                      <p className="font-serif italic text-slate-600">"The best coffee in the city, hands down."</p>
                      <p className="text-sm font-bold mt-2">- Local Guide</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-amber-600 font-bold uppercase tracking-wider text-sm mb-2 block">Our Story</span>
                    <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">More Than Just Coffee</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      We believe in sustainable sourcing and expert roasting. Every bean tells a story of its origin, and we're here to share that story with you.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {['Ethically Sourced', 'Expertly Roasted', 'Community Focused'].map(item => (
                        <li key={item} className="flex items-center gap-3 font-medium text-slate-900">
                          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                            <CheckCircle size={14} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setActivePage('About')} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
                      Read Our Story
                    </button>
                  </div>
                </div>
              </section>
            </>
          );
        }

        if (theme.category === 'Jewellery') {
          return (
            <>
              {/* Jewellery Hero */}
              <div className="relative h-[800px] flex items-center justify-start text-left">
                <img src="https://picsum.photos/seed/jewelry_model/1920/1080" alt="Jewelry Hero" className="absolute inset-0 w-full h-full object-cover brightness-[0.7]" />
                <div className="relative z-10 max-w-2xl px-12 md:px-24">
                  <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                    Timeless <br/> Elegance
                  </h1>
                  <p className="text-xl text-white/90 mb-10 font-light tracking-wide">
                    Handcrafted pieces designed to be cherished forever.
                  </p>
                  <button onClick={() => setActivePage('Shop')} className="bg-white text-slate-900 px-10 py-4 font-serif italic text-lg hover:bg-slate-100 transition-colors min-w-[200px]">
                    Explore Collection
                  </button>
                </div>
              </div>

              {/* Collections Grid */}
              <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative h-[600px] group cursor-pointer overflow-hidden" onClick={() => setActivePage('Shop')}>
                    <img src="https://picsum.photos/seed/rings/600/800" alt="Rings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <h3 className="text-3xl font-serif italic mb-2">Engagement Rings</h3>
                      <span className="uppercase tracking-widest text-sm border-b border-white pb-1">View Collection</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="relative h-[284px] group cursor-pointer overflow-hidden" onClick={() => setActivePage('Shop')}>
                      <img src="https://picsum.photos/seed/necklace/600/400" alt="Necklaces" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute bottom-8 left-8 text-white">
                        <h3 className="text-2xl font-serif italic mb-2">Necklaces</h3>
                        <span className="uppercase tracking-widest text-xs border-b border-white pb-1">View Collection</span>
                      </div>
                    </div>
                    <div className="relative h-[284px] group cursor-pointer overflow-hidden" onClick={() => setActivePage('Shop')}>
                      <img src="https://picsum.photos/seed/earrings/600/400" alt="Earrings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute bottom-8 left-8 text-white">
                        <h3 className="text-2xl font-serif italic mb-2">Earrings</h3>
                        <span className="uppercase tracking-widest text-xs border-b border-white pb-1">View Collection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Product */}
              <section className="py-24 bg-[#f9f9f9] px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                  <div className="flex-1 order-2 md:order-1">
                    <span className="text-slate-500 uppercase tracking-widest text-sm mb-4 block">New Arrival</span>
                    <h2 className="text-4xl font-serif text-slate-900 mb-6">The Celestial Collection</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed font-light text-lg">
                      Inspired by the night sky, our newest collection features ethically sourced diamonds set in 18k recycled gold. Each piece is unique, just like the stars above.
                    </p>
                    <button onClick={() => setActivePage('Product Details')} className="bg-slate-900 text-white px-8 py-3 font-serif italic hover:bg-slate-800 transition-colors">
                      Shop Now
                    </button>
                  </div>
                  <div className="flex-1 order-1 md:order-2">
                    <img src="https://picsum.photos/seed/diamond_ring/800/800" alt="Featured" className="w-full shadow-2xl" />
                  </div>
                </div>
              </section>
            </>
          );
        }

        if (theme.category === 'E-commerce') {
          return (
            <>
              {/* Elegant Hero */}
              <div className="relative h-[700px] flex items-center justify-center text-center text-white">
                <img src="https://picsum.photos/seed/fashion_hero/1920/1080" alt="Hero" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
                <div className="relative z-10 max-w-4xl px-6 animate-fade-in-up">
                  <span className="inline-block py-1 px-4 border border-white/30 rounded-full text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
                    New Collection 2025
                  </span>
                  <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
                    Elevate Your <br/> Everyday Style
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 font-light text-white/90 max-w-2xl mx-auto">
                    Discover the latest collection of premium essentials designed for the modern individual.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-slate-100 transition-all transform hover:scale-105 shadow-xl" 
                      onClick={() => setActivePage('Shop')}
                    >
                      Shop Collection
                    </button>
                    <button 
                      className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                      View Lookbook
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Featured Categories */}
              <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Shop by Category</h2>
                  <div className="w-20 h-1 bg-brand-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['Women', 'Men', 'Accessories'].map((cat) => (
                    <div key={cat} className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                      <img src={`https://picsum.photos/seed/${cat}_cat/600/800`} alt={cat} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute bottom-10 left-10 text-white">
                        <h3 className="text-3xl font-bold mb-3">{cat}</h3>
                        <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                          Explore Collection <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Products */}
              <section className="py-24 bg-slate-50 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Trending Now</h2>
                      <p className="text-slate-500">Curated picks for this season</p>
                    </div>
                    <button className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-brand-600 hover:border-brand-600 transition-colors" onClick={() => setActivePage('Shop')}>View All Products</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => setActivePage('Product Details')}>
                        <div className="aspect-[3/4] relative overflow-hidden bg-slate-200">
                          <img src={`https://picsum.photos/seed/trend${item}/500/700`} alt="Product" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            New
                          </div>
                          <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-20 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-600 hover:text-white">
                            <ShoppingCart size={20} />
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-slate-900 mb-1 text-lg">Premium Item {item}</h3>
                          <p className="text-slate-500 text-sm mb-3">Luxury Collection</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-slate-900 text-lg">$129.00</p>
                            <div className="flex text-yellow-400">
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Newsletter */}
              <section className="py-24 bg-slate-900 text-white px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Join Our Newsletter</h2>
                  <p className="text-slate-400 mb-10 text-lg">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50" />
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </section>
            </>
          );
        }
        return (
          <>
            {/* Mock Hero */}
            <header className="relative min-h-[500px] flex items-center justify-center text-center px-4 bg-slate-50">
              <img src={theme.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-10" />
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-600 font-bold text-xs uppercase tracking-wider mb-6">
                  {theme.category} Theme
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
                  {theme.description.split('.')[0]}
                </h1>
                <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                  Built with {theme.tech.join(' + ')}. {details.characteristics[0]}.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-brand-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-500 transition-all">
                    Get Started
                  </button>
                  <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-all">
                    View Portfolio
                  </button>
                </div>
              </div>
            </header>

            {/* Category Specific Features Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Key Features</h2>
                <p className="text-slate-500">Designed specifically for {theme.category} websites</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {details.characteristics.map((char, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4 text-brand-600">
                      <CheckCircle size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{char}</h3>
                    <p className="text-slate-500 text-sm">Optimized for performance and conversion.</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 bg-slate-900 text-white px-6">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-display font-bold mb-12">Powered by Modern Tech</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {details.recommendedStack.map((stack) => (
                    <span key={stack} className="px-6 py-3 rounded-full bg-white/10 border border-white/10 font-mono text-sm">
                      {stack}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <Zap className="text-yellow-400 mb-4" size={24} />
                    <h3 className="font-bold mb-2">Lightning Fast</h3>
                    <p className="text-slate-400 text-sm">Optimized for Core Web Vitals with lazy loading and code splitting.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <Shield className="text-green-400 mb-4" size={24} />
                    <h3 className="font-bold mb-2">Secure & Reliable</h3>
                    <p className="text-slate-400 text-sm">Built with security best practices including SSL and firewall compatibility.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <Search className="text-blue-400 mb-4" size={24} />
                    <h3 className="font-bold mb-2">SEO Ready</h3>
                    <p className="text-slate-400 text-sm">Schema markup and semantic HTML structure out of the box.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      
      case 'Features':
        if (theme.category === 'SaaS') {
          return (
            <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pt-20">
              <div className="bg-white border-b border-slate-200 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block">Platform Features</span>
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Tools built for scale</h1>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Everything you need to manage your business, all in one powerful platform.
                  </p>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                {[
                  {
                    title: 'Real-time Analytics',
                    desc: 'Get detailed insights into your business performance with our advanced analytics dashboard. Track key metrics, visualize trends, and make data-driven decisions.',
                    image: 'https://picsum.photos/seed/saas_analytics/800/600',
                    features: ['Customizable dashboards', 'Export to PDF/CSV', 'Real-time data updates']
                  },
                  {
                    title: 'Team Collaboration',
                    desc: 'Work together seamlessly with built-in collaboration tools. Share files, comment on tasks, and keep everyone in the loop with real-time notifications.',
                    image: 'https://picsum.photos/seed/saas_collab/800/600',
                    features: ['Shared workspaces', 'Role-based access', 'Activity logs']
                  },
                  {
                    title: 'Automated Workflows',
                    desc: 'Save time and reduce errors by automating repetitive tasks. Create custom workflows to handle everything from lead generation to customer support.',
                    image: 'https://picsum.photos/seed/saas_automation/800/600',
                    features: ['Visual workflow builder', '300+ integrations', 'Conditional logic']
                  }
                ].map((feature, i) => (
                  <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                    <div className="flex-1 space-y-8">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <Zap size={24} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{feature.title}</h2>
                      <p className="text-lg text-slate-600 leading-relaxed">{feature.desc}</p>
                      <ul className="space-y-4">
                        {feature.features.map((item, j) => (
                          <li key={j} className="flex items-center gap-3 text-slate-700 font-medium">
                            <CheckCircle size={20} className="text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2 group">
                        Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <img src={feature.image} alt={feature.title} className="rounded-2xl shadow-2xl border border-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
              
              <section className="bg-indigo-900 text-white py-24 px-6 mt-20">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to experience the power?</h2>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">Get Started</button>
                    <button className="border border-indigo-400 text-indigo-100 px-8 py-3 rounded-lg font-bold hover:bg-indigo-800 transition-colors">Contact Sales</button>
                  </div>
                </div>
              </section>
            </div>
          );
        }
        break;

      case 'Pricing':
        if (theme.category === 'SaaS') {
          return (
            <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pt-20">
              <div className="bg-white border-b border-slate-200 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block">Simple Pricing</span>
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Choose the plan that fits your needs</h1>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                    Transparent pricing with no hidden fees. Start with a free trial and upgrade as you grow.
                  </p>
                  
                  {/* Currency Selector */}
                  <div className="inline-flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                    {['USD', 'EUR', 'GBP', 'INR'].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr as any)}
                        className={cn(
                          "px-4 py-2 rounded-md text-sm font-bold transition-all",
                          currency === curr ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: 'Starter', price: 29, desc: 'Perfect for small teams and startups.', features: ['Up to 5 users', 'Basic analytics', '24/7 Support', '1GB Storage'] },
                    { name: 'Pro', price: 99, desc: 'For growing businesses that need more power.', features: ['Up to 20 users', 'Advanced analytics', 'Priority Support', '10GB Storage', 'Custom integrations'], popular: true },
                    { name: 'Enterprise', price: 299, desc: 'Enterprise-grade security and control.', features: ['Unlimited users', 'Custom reporting', 'Dedicated account manager', 'Unlimited Storage', 'SSO & Audit logs', 'SLA Guarantee'] }
                  ].map((plan, i) => (
                    <div key={i} className={cn(
                      "bg-white rounded-2xl p-8 border transition-all relative",
                      plan.popular ? "border-indigo-600 shadow-xl scale-105 z-10" : "border-slate-200 shadow-sm hover:shadow-md"
                    )}>
                      {plan.popular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Most Popular
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-slate-500 mb-6 text-sm">{plan.desc}</p>
                      <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-4xl font-bold text-slate-900">{formatPrice(plan.price)}</span>
                        <span className="text-slate-500">/month</span>
                      </div>
                      <button 
                        onClick={() => setActivePage('Checkout')}
                        className={cn(
                        "w-full py-3 rounded-xl font-bold mb-8 transition-colors",
                        plan.popular ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      )}>
                        Choose {plan.name}
                      </button>
                      <ul className="space-y-4">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-slate-700">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Comparison Table */}
                <div className="mt-24">
                  <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className="p-4 border-b-2 border-slate-100 w-1/3">Feature</th>
                          <th className="p-4 border-b-2 border-slate-100 text-center font-bold text-slate-900">Starter</th>
                          <th className="p-4 border-b-2 border-indigo-100 text-center font-bold text-indigo-600 bg-indigo-50/50">Pro</th>
                          <th className="p-4 border-b-2 border-slate-100 text-center font-bold text-slate-900">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Users', s: '5', p: '20', e: 'Unlimited' },
                          { name: 'Storage', s: '1GB', p: '10GB', e: 'Unlimited' },
                          { name: 'Support', s: 'Email', p: 'Priority Email', e: '24/7 Phone' },
                          { name: 'Analytics', s: 'Basic', p: 'Advanced', e: 'Custom' },
                          { name: 'API Access', s: false, p: true, e: true },
                          { name: 'SSO', s: false, p: false, e: true },
                          { name: 'Custom Domain', s: true, p: true, e: true },
                          { name: 'SLA', s: false, p: false, e: true }
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4 font-medium text-slate-700">{row.name}</td>
                            <td className="p-4 text-center text-slate-600">
                              {typeof row.s === 'boolean' ? (row.s ? <CheckCircle size={18} className="mx-auto text-green-500" /> : <X size={18} className="mx-auto text-slate-300" />) : row.s}
                            </td>
                            <td className="p-4 text-center text-slate-900 font-medium bg-indigo-50/30">
                              {typeof row.p === 'boolean' ? (row.p ? <CheckCircle size={18} className="mx-auto text-green-500" /> : <X size={18} className="mx-auto text-slate-300" />) : row.p}
                            </td>
                            <td className="p-4 text-center text-slate-600">
                              {typeof row.e === 'boolean' ? (row.e ? <CheckCircle size={18} className="mx-auto text-green-500" /> : <X size={18} className="mx-auto text-slate-300" />) : row.e}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        break;

      case 'About':
      case 'About Us':
      case 'About Me':
      case 'Studio':
        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-600 rounded-2xl blur-2xl opacity-20 transform rotate-6"></div>
                    <img src="https://picsum.photos/seed/portfolio_about/600/800" alt="About Me" className="relative rounded-2xl shadow-2xl border border-slate-800" />
                  </div>
                  <div>
                    <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">About Me</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Passionate about creating digital experiences.</h1>
                    <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                      I'm a multidisciplinary designer and developer with a focus on user experience and interaction design. I believe that great design is not just about how things look, but how they work.
                    </p>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                      With over 5 years of experience in the industry, I've had the privilege of working with startups and established brands to bring their visions to life.
                    </p>
                    <div className="flex gap-4">
                      <button onClick={() => setActivePage('Contact')} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-500 transition-colors">
                        Let's Talk
                      </button>
                      <button onClick={() => setActivePage('Resume')} className="border border-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
                        View Resume
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Design', desc: 'UI/UX, Branding, Interaction Design' },
                    { title: 'Development', desc: 'React, Next.js, Tailwind CSS, Node.js' },
                    { title: 'Strategy', desc: 'Product Strategy, User Research, Analytics' }
                  ].map((service, i) => (
                    <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-slate-400">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-8">{activePage}</h1>
            <div className="prose prose-lg text-slate-600">
              <p className="lead text-xl mb-6">We are a passionate team dedicated to delivering the best {theme.category.toLowerCase()} solutions.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
                <img src={`https://picsum.photos/seed/${theme.id}about/600/400`} alt="About" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                  <p className="mb-4">To empower creators and businesses with cutting-edge technology and stunning design.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-600"/> Quality First</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-600"/> Customer Focused</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-600"/> Innovation Driven</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Skills':
        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">Technical Skills</h1>
                  <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    My technical expertise and proficiency level in various technologies.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-indigo-400 mb-6">Frontend Development</h3>
                    {[
                      { name: 'React', level: 95 },
                      { name: 'TypeScript', level: 90 },
                      { name: 'Tailwind CSS', level: 95 },
                      { name: 'Next.js', level: 85 },
                      { name: 'Framer Motion', level: 80 }
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-bold">{skill.name}</span>
                          <span className="text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-6">Backend & Tools</h3>
                    {[
                      { name: 'Node.js', level: 80 },
                      { name: 'PostgreSQL', level: 75 },
                      { name: 'GraphQL', level: 70 },
                      { name: 'Docker', level: 65 },
                      { name: 'Figma', level: 85 }
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-bold">{skill.name}</span>
                          <span className="text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;

      case 'Contact':
      case 'Contact Us':
        if (theme.category === 'News') {
          return (
            <div className="bg-white min-h-screen font-serif text-slate-900 py-20 px-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black uppercase font-display mb-12 text-center">Contact Us</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="bg-slate-50 p-8 border border-slate-200">
                    <h3 className="text-xl font-bold uppercase mb-4 font-display">Editorial Team</h3>
                    <p className="text-slate-600 mb-4 font-sans text-sm">For news tips, corrections, and editorial inquiries.</p>
                    <a href="#" className="text-red-600 font-bold font-sans hover:underline">editor@news.com</a>
                  </div>
                  <div className="bg-slate-50 p-8 border border-slate-200">
                    <h3 className="text-xl font-bold uppercase mb-4 font-display">Advertising</h3>
                    <p className="text-slate-600 mb-4 font-sans text-sm">For advertising opportunities and partnerships.</p>
                    <a href="#" className="text-red-600 font-bold font-sans hover:underline">ads@news.com</a>
                  </div>
                </div>

                <form className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 font-sans">Name</label>
                      <input type="text" className="w-full border-b-2 border-slate-200 py-2 outline-none focus:border-red-600 transition-colors font-sans" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 font-sans">Email</label>
                      <input type="email" className="w-full border-b-2 border-slate-200 py-2 outline-none focus:border-red-600 transition-colors font-sans" placeholder="jane@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 font-sans">Subject</label>
                    <select className="w-full border-b-2 border-slate-200 py-2 outline-none focus:border-red-600 transition-colors font-sans bg-transparent">
                      <option>Letter to the Editor</option>
                      <option>News Tip</option>
                      <option>Correction</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 font-sans">Message</label>
                    <textarea className="w-full border-b-2 border-slate-200 py-2 outline-none focus:border-red-600 transition-colors font-sans h-32 resize-none" placeholder="Your message..."></textarea>
                  </div>
                  <button className="bg-red-600 text-white px-8 py-3 font-bold uppercase tracking-wider text-sm font-sans hover:bg-red-700 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          );
        }

        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h1>
                  <p className="text-slate-400 max-w-xl mx-auto text-lg">
                    Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                      <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                          <div className="bg-slate-900 p-3 rounded-lg text-indigo-400"><Mail size={20} /></div>
                          <div>
                            <p className="text-slate-400 text-sm mb-1">Email</p>
                            <p className="font-medium">hello@example.com</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="bg-slate-900 p-3 rounded-lg text-indigo-400"><Phone size={20} /></div>
                          <div>
                            <p className="text-slate-400 text-sm mb-1">Phone</p>
                            <p className="font-medium">+1 (555) 123-4567</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="bg-slate-900 p-3 rounded-lg text-indigo-400"><MapPin size={20} /></div>
                          <div>
                            <p className="text-slate-400 text-sm mb-1">Location</p>
                            <p className="font-medium">San Francisco, CA</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-6">Follow Me</h3>
                      <div className="flex gap-4">
                        {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                          <button key={i} className="bg-slate-900 p-3 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                            <Icon size={20} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Name</label>
                        <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Subject</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Project Inquiry" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Message</label>
                      <textarea className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-32 resize-none" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-600/20">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-display font-bold text-slate-900 mb-6">Get in Touch</h1>
                <p className="text-slate-600 mb-8">We'd love to hear from you. Fill out the form or reach us directly.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600"><Mail size={20} /></div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium text-slate-900">hello@{theme.title.toLowerCase().replace(/\s/g, '')}.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600"><Phone size={20} /></div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600"><MapPin size={20} /></div>
                    <div>
                      <p className="text-sm text-slate-500">Office</p>
                      <p className="font-medium text-slate-900">123 Design Street, Creative City</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="How can we help?"></textarea>
                  </div>
                  <button className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-500 transition-colors">Send Message</button>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500 mb-2">Prefer to talk directly?</p>
                    <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">Book a Consultation</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 'Courses':
        if (theme.category === 'Educational') {
          return (
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore Courses</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Discover a wide range of courses designed to help you master new skills.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-8">
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      {['Development', 'Business', 'Design', 'Marketing', 'Photography', 'Music'].map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-slate-600 text-sm">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Level</h3>
                    <div className="space-y-2">
                      {['Beginner', 'Intermediate', 'Expert'].map(level => (
                        <label key={level} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-slate-600 text-sm">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Price</h3>
                    <div className="space-y-2">
                      {['Free', 'Paid'].map(price => (
                        <label key={price} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-slate-600 text-sm">{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Course Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                      <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-slate-100" onClick={() => setActivePage('Course Detail')}>
                        <div className="aspect-video relative overflow-hidden">
                          <img src={`https://picsum.photos/seed/edu_course${item}/600/400`} alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold uppercase">Development</span>
                            <span className="text-slate-500 flex items-center gap-1 text-xs font-bold"><Star size={12} className="text-yellow-400 fill-yellow-400" /> 4.8</span>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">Complete Web Development Bootcamp 2024</h3>
                          <p className="text-slate-500 text-xs mb-4">By Dr. Angela Yu</p>
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <span className="font-bold text-lg text-slate-900">$19.99</span>
                            <button className="text-blue-600 font-bold text-sm hover:underline">Enroll Now</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 flex justify-center">
                    <div className="flex gap-2">
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors">1</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">2</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors">3</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"><ArrowRight size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        // Fallthrough if not Educational (though currently no other theme uses 'Courses' as a primary page, but good practice)
        return null;

      case 'Course Detail':
        return (
          <div className="bg-slate-50 min-h-screen pb-20">
            {/* Course Header */}
            <div className="bg-slate-900 text-white py-12 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-2 text-blue-300 text-sm font-bold uppercase tracking-wider">
                    <span>Development</span>
                    <ChevronRight size={14} />
                    <span>Web Development</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">The Complete 2024 Web Development Bootcamp</h1>
                  <p className="text-xl text-slate-300">Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps</p>
                  
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 font-bold">4.8</span>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <span className="text-blue-200">(12,345 ratings)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-400" />
                      <span>50,000+ students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-400" />
                      <span>Last updated 12/2024</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4">
                    <img src="https://picsum.photos/seed/instructor1/100/100" alt="Instructor" className="w-12 h-12 rounded-full border-2 border-white/20" />
                    <div>
                      <p className="text-sm text-slate-400">Created by</p>
                      <p className="font-bold text-blue-300 hover:text-white cursor-pointer transition-colors">Dr. Angela Yu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* What you'll learn */}
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mt-10 lg:mt-0">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">What you'll learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Build 16 web development projects for your portfolio',
                      'Learn the latest technologies, including Javascript ES6, Bootstrap 5, React',
                      'Master backend development with Node.js, Express and MongoDB',
                      'Build fully-fledged websites and web apps for your startup or business'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Curriculum */}
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Content</h2>
                  <div className="space-y-4">
                    {[
                      { title: 'Introduction to HTML', lessons: 5, time: '35m' },
                      { title: 'Intermediate HTML', lessons: 7, time: '55m' },
                      { title: 'Introduction to CSS', lessons: 12, time: '1h 20m' },
                      { title: 'Intermediate CSS', lessons: 10, time: '1h 10m' },
                      { title: 'Bootstrap 5', lessons: 8, time: '50m' }
                    ].map((section, i) => (
                      <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left">
                          <div className="flex items-center gap-3">
                            <ChevronDown size={20} className="text-slate-400" />
                            <span className="font-bold text-slate-900">{section.title}</span>
                          </div>
                          <span className="text-sm text-slate-500">{section.lessons} lectures • {section.time}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar Card */}
              <div className="relative z-10">
                <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
                  <div className="aspect-video relative group cursor-pointer">
                    <img src="https://picsum.photos/seed/edu_course1/600/400" alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Play size={24} className="text-slate-900 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-sm">Preview this course</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-end gap-3 mb-6">
                      <span className="text-3xl font-bold text-slate-900">$19.99</span>
                      <span className="text-slate-500 line-through mb-1">$99.99</span>
                      <span className="text-green-600 font-bold text-sm mb-1">80% off</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mb-3 shadow-lg shadow-blue-600/20">
                      Add to Cart
                    </button>
                    <button className="w-full bg-white text-slate-900 border border-slate-300 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors mb-6">
                      Buy Now
                    </button>
                    <p className="text-center text-xs text-slate-500 mb-6">30-Day Money-Back Guarantee</p>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-900 text-sm">This course includes:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-3"><Video size={16} className="text-slate-400" /> 65 hours on-demand video</li>
                        <li className="flex items-center gap-3"><FileText size={16} className="text-slate-400" /> 85 articles</li>
                        <li className="flex items-center gap-3"><Download size={16} className="text-slate-400" /> 50 downloadable resources</li>
                        <li className="flex items-center gap-3"><Monitor size={16} className="text-slate-400" /> Access on mobile and TV</li>
                        <li className="flex items-center gap-3"><Award size={16} className="text-slate-400" /> Certificate of completion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Shop':
        if (theme.category === 'Coffee Shop') {
          return (
            <div className="max-w-7xl mx-auto px-6 py-12">
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">Order Online</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-4 text-lg">Menu</h3>
                    <ul className="space-y-2 text-slate-600">
                      {['Hot Coffee', 'Iced Coffee', 'Tea', 'Pastries', 'Merchandise', 'Beans'].map(item => (
                        <li key={item} className="cursor-pointer hover:text-amber-600 transition-colors">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-4 text-lg">Roast Level</h3>
                    <div className="space-y-2">
                      {['Light', 'Medium', 'Dark', 'Espresso'].map(item => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500" />
                          <span className="text-slate-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="group cursor-pointer" onClick={() => setActivePage('Product Details')}>
                      <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4 relative">
                        <img src={`https://picsum.photos/seed/coffee_prod${item}/500/500`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg text-amber-600 hover:bg-amber-600 hover:text-white transition-colors">
                          <ShoppingCart size={20} />
                        </button>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg">Single Origin {item}</h3>
                      <p className="text-slate-500 text-sm mb-2">Ethiopia • Light Roast</p>
                      <span className="font-bold text-amber-600">$22.00</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (theme.category === 'Jewellery') {
          return (
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-serif text-slate-900 mb-4">The Collection</h1>
                <p className="text-slate-500 font-light">Discover our range of handcrafted jewellery.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-64 flex-shrink-0 space-y-12">
                  <div>
                    <h3 className="font-serif text-slate-900 mb-6 text-lg border-b border-slate-200 pb-2">Category</h3>
                    <ul className="space-y-3 text-slate-600 font-light">
                      {['All Jewellery', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Wedding'].map(c => (
                        <li key={c} className="cursor-pointer hover:text-slate-900 transition-colors">{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-slate-900 mb-6 text-lg border-b border-slate-200 pb-2">Metal</h3>
                    <ul className="space-y-3 text-slate-600 font-light">
                      {['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Silver'].map(c => (
                        <li key={c} className="cursor-pointer hover:text-slate-900 transition-colors">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="group cursor-pointer text-center" onClick={() => setActivePage('Product Details')}>
                      <div className="aspect-[4/5] bg-slate-50 overflow-hidden mb-6 relative">
                        <img src={`https://picsum.photos/seed/jewel_prod${item}/600/750`} alt="Product" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        <button className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur py-4 text-slate-900 font-serif italic opacity-0 group-hover:opacity-100 transition-all translate-y-full group-hover:translate-y-0 duration-500">
                          Quick View
                        </button>
                      </div>
                      <h3 className="font-serif text-slate-900 text-lg mb-1">Diamond Solitaire {item}</h3>
                      <p className="text-slate-500 text-sm font-light mb-2">18k Gold</p>
                      <span className="font-medium text-slate-900">$1,290.00</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (theme.category === 'E-commerce') {
          return (
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-10">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-6 text-lg">Categories</h3>
                    <ul className="space-y-3 text-slate-600">
                      {['All Products', 'New Arrivals', 'Best Sellers', 'Clothing', 'Accessories', 'Home', 'Sale'].map(c => (
                        <li key={c} className="cursor-pointer hover:text-brand-600 transition-colors flex items-center justify-between group">
                          <span>{c}</span>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-900 mb-6 text-lg">Filter by Price</h3>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-4">
                      <div className="w-2/3 h-full bg-slate-900 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 font-medium">
                      <span>$0</span>
                      <span>$500+</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 mb-6 text-lg">Colors</h3>
                    <div className="flex flex-wrap gap-3">
                      {['bg-slate-900', 'bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-500', 'bg-purple-600', 'bg-pink-500', 'bg-gray-400'].map((color, i) => (
                        <button key={i} className={`w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ring-transparent hover:ring-slate-300 transition-all shadow-sm`}></button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">All Products</h1>
                      <p className="text-slate-500">Showing 1-12 of 48 results</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600">Sort by:</span>
                      <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-brand-500">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest First</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                      <div key={item} className="group cursor-pointer" onClick={() => setActivePage('Product Details')}>
                        <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-slate-100 mb-4">
                          <img src={`https://picsum.photos/seed/shop_item${item}/600/800`} alt="Product" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-3 left-3">
                            {item % 4 === 0 && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Sale</span>}
                            {item % 4 === 1 && <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>}
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="w-full bg-white text-slate-900 py-3 rounded-lg font-bold shadow-lg hover:bg-slate-50 flex items-center justify-center gap-2">
                              <ShoppingCart size={18} /> Quick Add
                            </button>
                          </div>
                          <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300">
                            <Heart size={20} />
                          </button>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">Designer Piece {item}</h3>
                        <p className="text-slate-500 text-sm mb-2">Category Name</p>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 text-lg">$199.00</span>
                          {item % 4 === 0 && <span className="text-sm text-slate-400 line-through">$249.00</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-16 flex justify-center">
                    <div className="flex gap-2">
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-brand-600 hover:text-brand-600 transition-colors">1</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-600 text-white font-bold">2</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-brand-600 hover:text-brand-600 transition-colors">3</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-brand-600 hover:text-brand-600 transition-colors">...</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:border-brand-600 hover:text-brand-600 transition-colors"><ArrowRight size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      case 'Projects':
      case 'Work':
        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white px-6 py-20">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">My Work</h1>
                  <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A collection of projects that showcase my passion for design and development.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                  {['All', 'Web Design', 'Mobile Apps', 'Branding'].map((filter, i) => (
                    <button key={filter} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                  {[1, 2, 3, 4, 5, 6].map((item, i) => (
                    <div 
                      key={item} 
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-800 ${i === 0 || i === 3 ? 'md:col-span-2' : ''}`}
                    >
                      <img src={`https://picsum.photos/seed/portfolio_work${item}/800/600`} alt="Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40" />
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">Category</span>
                          <h3 className="text-2xl font-bold mb-2">Project Name {item}</h3>
                          <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            View Case Study <ArrowRight size={14} className="inline ml-1" />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        // Fallthrough to default
      case 'Projects':
      case 'Work':
        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white px-6 py-20">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">My Work</h1>
                  <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A collection of projects that showcase my passion for design and development.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                  {['All', 'Web Design', 'Mobile Apps', 'Branding'].map((filter, i) => (
                    <button key={filter} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                  {[1, 2, 3, 4, 5, 6].map((item, i) => (
                    <div 
                      key={item} 
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-800 ${i === 0 || i === 3 ? 'md:col-span-2' : ''}`}
                    >
                      <img src={`https://picsum.photos/seed/portfolio_work${item}/800/600`} alt="Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40" />
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">Category</span>
                          <h3 className="text-2xl font-bold mb-2">Project Name {item}</h3>
                          <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            View Case Study <ArrowRight size={14} className="inline ml-1" />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        // Fallthrough to default
      case 'Portfolio':
      case 'Work':
      case 'Courses':
      case 'Services':
      case 'Projects':
      case 'Deals':
      case 'New Arrivals':
      case 'Case Studies':
      case 'Product Details':
        if (activePage === 'Product Details') {
          if (theme.category === 'Coffee Shop') {
            return (
              <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="aspect-square bg-[#f8f5f2] rounded-2xl overflow-hidden flex items-center justify-center p-12">
                      <img src="https://picsum.photos/seed/coffee_bag_detail/600/600" alt="Coffee Bag" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-6">
                      <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Single Origin</span>
                      <h1 className="text-4xl font-display font-bold text-slate-900 mt-2 mb-4">Ethiopian Yirgacheffe</h1>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                        </div>
                        <span className="text-slate-500">(42 Reviews)</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">$24.00 <span className="text-lg font-normal text-slate-500">/ 12oz</span></p>
                    </div>
                    
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      A bright and complex coffee with floral notes of jasmine and a hint of citrus. Sourced directly from the Yirgacheffe region, this light roast is perfect for pour-over brewing.
                    </p>

                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Grind Option</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['Whole Bean', 'Drip', 'Espresso'].map((opt, i) => (
                            <button key={i} className={`py-3 px-4 rounded-lg border ${i === 0 ? 'border-amber-600 text-amber-600 bg-amber-50' : 'border-slate-200 text-slate-600 hover:border-amber-600'} font-medium transition-all`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="bg-white p-2 rounded-full shadow-sm text-amber-600"><Zap size={20} /></div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Subscribe & Save 10%</p>
                          <p className="text-xs text-slate-500">Get fresh beans delivered every 2 weeks.</p>
                        </div>
                        <div className="ml-auto">
                          <input type="checkbox" className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-32 flex items-center border border-slate-200 rounded-full">
                        <button className="w-10 h-full flex items-center justify-center hover:bg-slate-50 rounded-l-full">-</button>
                        <input type="text" value="1" className="w-full text-center outline-none bg-transparent font-bold" readOnly />
                        <button className="w-10 h-full flex items-center justify-center hover:bg-slate-50 rounded-r-full">+</button>
                      </div>
                      <button className="flex-1 bg-slate-900 text-white py-4 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (theme.category === 'Jewellery') {
            return (
              <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-4">
                    <div className="aspect-[4/5] bg-slate-50 overflow-hidden">
                      <img src="https://picsum.photos/seed/diamond_ring_detail/800/1000" alt="Ring" className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-square bg-slate-50 overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                          <img src={`https://picsum.photos/seed/ring_thumb${i}/200/200`} alt="Thumbnail" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-8 border-b border-slate-100 pb-8">
                      <h1 className="text-4xl font-serif text-slate-900 mb-2">Solitaire Diamond Ring</h1>
                      <p className="text-slate-500 font-light mb-6">The Engagement Collection</p>
                      <p className="text-3xl font-serif text-slate-900">$1,290.00</p>
                    </div>
                    
                    <p className="text-slate-600 mb-10 leading-relaxed font-light">
                      A classic solitaire setting featuring a brilliant round-cut diamond. Handcrafted in our London studio using 100% recycled gold. This timeless piece is designed to be cherished for generations.
                    </p>

                    <div className="space-y-8 mb-10">
                      <div>
                        <div className="flex justify-between mb-3">
                          <label className="text-sm font-medium text-slate-900 uppercase tracking-widest">Metal</label>
                          <span className="text-xs text-slate-500 underline cursor-pointer">Metal Guide</span>
                        </div>
                        <div className="flex gap-4">
                          {[
                            { name: '18k Gold', color: 'bg-yellow-200' },
                            { name: 'White Gold', color: 'bg-slate-200' },
                            { name: 'Rose Gold', color: 'bg-rose-200' },
                            { name: 'Platinum', color: 'bg-slate-300' }
                          ].map((metal, i) => (
                            <button key={i} className="group relative w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 hover:border-slate-900 transition-colors" title={metal.name}>
                              <div className={`w-8 h-8 rounded-full ${metal.color}`}></div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-3">
                          <label className="text-sm font-medium text-slate-900 uppercase tracking-widest">Ring Size</label>
                          <span className="text-xs text-slate-500 underline cursor-pointer">Size Guide</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {['5', '6', '7', '8', '9'].map(size => (
                            <button key={size} className="w-12 h-12 border border-slate-200 flex items-center justify-center font-serif text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all">
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 bg-slate-900 text-white py-4 font-serif italic hover:bg-slate-800 transition-colors">
                        Add to Bag
                      </button>
                      <button className="w-14 h-14 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                        <Heart size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Shield size={20} className="text-slate-400" />
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Lifetime Warranty</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Truck size={20} className="text-slate-400" />
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Free Shipping</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw size={20} className="text-slate-400" />
                        <span className="text-xs text-slate-500 uppercase tracking-wider">30-Day Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                    <img src={`https://picsum.photos/seed/${theme.id}product/600/600`} alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-brand-500">
                        <img src={`https://picsum.photos/seed/${theme.id}product${i}/200/200`} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <span className="text-brand-600 font-bold text-sm uppercase tracking-wider">New Arrival</span>
                    <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Premium Product Name</h1>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                      </div>
                      <span className="text-slate-500">(128 Reviews)</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">$199.00</p>
                  </div>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Experience the perfect blend of style and functionality. This premium product is crafted with high-quality materials to ensure durability and comfort. Perfect for everyday use or special occasions.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Color</label>
                      <div className="flex gap-3">
                        {['bg-slate-900', 'bg-blue-600', 'bg-green-600', 'bg-red-600'].map((color, i) => (
                          <button key={i} className={`w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ring-transparent hover:ring-slate-300 transition-all`}></button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Size</label>
                      <div className="flex gap-3">
                        {['S', 'M', 'L', 'XL'].map(size => (
                          <button key={size} className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 transition-all">
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-32 flex items-center border border-slate-200 rounded-xl">
                      <button className="w-10 h-full flex items-center justify-center hover:bg-slate-50">-</button>
                      <input type="text" value="1" className="w-full text-center outline-none" readOnly />
                      <button className="w-10 h-full flex items-center justify-center hover:bg-slate-50">+</button>
                    </div>
                    <button className="flex-1 bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-500 transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={20} /> Add to Cart
                    </button>
                    <button className="w-14 h-14 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all">
                      <Heart size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">{activePage}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <img src={`https://picsum.photos/seed/${theme.id}${activePage}${item}/400/300`} alt="Item" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2 block">Category</span>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">
                      {activePage === 'Shop' ? `Product Name ${item}` : 
                       activePage === 'Courses' ? `Masterclass Course ${item}` :
                       activePage === 'Case Studies' ? `Case Study: Client ${item}` :
                       `Project Title ${item}`}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">A brief description of this item goes here.</p>
                    <button className="text-brand-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      {activePage === 'Services' ? 'Book Now' : 'View Details'} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'Article':
        return (
          <div className="bg-white min-h-screen font-serif text-slate-900">
            {/* Article Header */}
            <header className="max-w-4xl mx-auto px-6 pt-12 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider font-sans">Politics</span>
                <span className="text-slate-500 text-xs font-sans uppercase font-bold">November 14, 2024</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 font-display">
                The Global Shift: How New Policies Are Reshaping International Trade
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light mb-8">
                As nations gather for the annual economic summit, tensions rise over new trade tariffs and their potential impact on global supply chains.
              </h2>
              
              <div className="flex items-center justify-between font-sans">
                <div className="flex items-center gap-4">
                  <img src="https://picsum.photos/seed/author_news/100/100" alt="Author" className="w-12 h-12 rounded-full border-2 border-slate-100" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm uppercase">James Anderson</span>
                    <span className="text-slate-500 text-xs font-bold uppercase">Senior Political Correspondent</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-slate-100 hover:bg-[#1DA1F2] hover:text-white transition-colors"><Twitter size={18} /></button>
                  <button className="p-2 rounded-full bg-slate-100 hover:bg-[#4267B2] hover:text-white transition-colors"><Linkedin size={18} /></button>
                  <button className="p-2 rounded-full bg-slate-100 hover:bg-[#C13584] hover:text-white transition-colors"><Instagram size={18} /></button>
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="aspect-[16/9] mb-12 bg-slate-100">
                  <img src="https://picsum.photos/seed/news_hero/1200/800" alt="Article Hero" className="w-full h-full object-cover" />
                  <p className="text-xs text-slate-500 mt-2 font-sans">Delegates arriving at the summit center in Geneva. (Photo: AP)</p>
                </div>

                <div className="prose prose-lg prose-slate max-w-none font-serif">
                  <p className="lead text-2xl font-bold text-slate-900 mb-8 border-l-4 border-red-600 pl-6">
                    "This is a pivotal moment for the global economy," says Dr. Elena Rostova, chief economist at the World Trade Institute.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  {/* In-Article Ad */}
                  <div className="my-12 bg-slate-50 border border-slate-200 p-8 text-center">
                    <span className="text-xs font-sans text-slate-400 uppercase tracking-widest block mb-2">Advertisement</span>
                    <div className="text-slate-400 font-sans text-sm">Responsive Ad Unit</div>
                  </div>

                  <h3 className="text-2xl font-black uppercase font-display mt-12 mb-6">A New Era of Cooperation?</h3>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2 font-sans">
                    {['Politics', 'Economy', 'Trade', 'Global Summit', 'Tariffs'].map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 text-xs font-bold uppercase hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 bg-slate-50 p-8 border border-slate-100 flex gap-6 items-start">
                  <img src="https://picsum.photos/seed/author_news/100/100" alt="Author" className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <h4 className="text-lg font-black uppercase font-display mb-2">About James Anderson</h4>
                    <p className="text-slate-600 text-sm mb-4 font-sans">
                      James Anderson is a Senior Political Correspondent covering international relations and global economic policy. He has reported from over 40 countries.
                    </p>
                    <button className="text-red-600 text-xs font-bold uppercase font-sans hover:underline">View all articles</button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-12">
                {/* Most Read */}
                <div>
                  <h3 className="text-lg font-black uppercase border-b-2 border-black mb-6 pb-2 inline-block font-display">Most Read</h3>
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((item) => (
                      <article key={item} className="flex gap-4 group cursor-pointer">
                        <span className="text-4xl font-black text-slate-200 font-display">{item}</span>
                        <div>
                          <h4 className="font-bold leading-snug group-hover:text-red-600 transition-colors font-display">
                            The Hidden Cost of Fast Fashion: An Investigative Report
                          </h4>
                          <span className="text-xs text-slate-400 mt-1 block font-sans uppercase font-bold">2 Hours Ago</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Ad Widget */}
                <div className="bg-slate-100 aspect-[3/4] flex items-center justify-center text-slate-400 font-sans text-sm border border-slate-200">
                  300x600 Half Page Ad
                </div>
              </aside>
            </div>
          </div>
        );

      case 'Author Profile':
        return (
          <div className="bg-white min-h-screen font-serif text-slate-900">
            <div className="bg-slate-50 py-20 px-6 border-b border-slate-200">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                <img src="https://picsum.photos/seed/author_news/200/200" alt="Author" className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg" />
                <div>
                  <h1 className="text-4xl font-black uppercase font-display mb-2">James Anderson</h1>
                  <p className="text-red-600 font-bold font-sans uppercase text-sm mb-4">Senior Political Correspondent</p>
                  <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
                    James Anderson is an award-winning journalist with over 15 years of experience covering international relations, global economic policy, and conflict zones. He has reported from over 40 countries and his work has been featured in major publications worldwide.
                  </p>
                  <div className="flex gap-4 mt-6 justify-center md:justify-start">
                    <button className="p-2 rounded-full bg-white border border-slate-200 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"><Twitter size={20} /></button>
                    <button className="p-2 rounded-full bg-white border border-slate-200 hover:bg-[#4267B2] hover:text-white hover:border-[#4267B2] transition-colors"><Linkedin size={20} /></button>
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm font-sans hover:bg-slate-800 transition-colors">Follow</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
              <h2 className="text-2xl font-black uppercase font-display mb-8 border-b-2 border-black pb-2 inline-block">Latest Articles</h2>
              <div className="space-y-8">
                {[1, 2, 3, 4, 5].map((item) => (
                  <article key={item} className="flex flex-col md:flex-row gap-8 group cursor-pointer border-b border-slate-100 pb-8 last:border-0" onClick={() => setActivePage('Article')}>
                    <div className="w-full md:w-1/3 aspect-[3/2] overflow-hidden bg-slate-100">
                      <img src={`https://picsum.photos/seed/news_author${item}/600/400`} alt="News" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-600 text-xs font-bold uppercase font-sans">Politics</span>
                        <span className="text-slate-400 text-xs font-bold uppercase font-sans">• 2 Days Ago</span>
                      </div>
                      <h3 className="text-2xl font-bold leading-tight mb-3 group-hover:text-red-700 transition-colors font-display">
                        Analysis: The Long-Term Implications of the New Trade Agreement
                      </h3>
                      <p className="text-slate-600 text-sm font-sans line-clamp-2 mb-4">
                        A deep dive into the specifics of the deal and what it means for the average consumer and small business owners.
                      </p>
                      <span className="text-xs font-bold text-slate-400 uppercase font-sans group-hover:text-red-600 transition-colors">Read Article →</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        );

      case 'World':
      case 'Politics':
      case 'Tech':
      case 'Sports':
      case 'Opinion':
        return (
          <div className="bg-white min-h-screen font-serif text-slate-900">
            <div className="bg-slate-900 text-white py-16 px-6 text-center">
              <h1 className="text-5xl md:text-7xl font-black uppercase font-display tracking-tight mb-4">{activePage}</h1>
              <p className="text-slate-400 font-sans font-bold uppercase tracking-widest text-sm">Latest News & Updates</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <article key={item} className="group cursor-pointer" onClick={() => setActivePage('Article')}>
                      <div className="aspect-[3/2] overflow-hidden mb-4 bg-slate-100">
                        <img src={`https://picsum.photos/seed/${activePage}${item}/600/400`} alt="News" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <span className="text-red-600 text-xs font-bold uppercase mb-2 block font-sans">{activePage}</span>
                      <h2 className="text-xl font-bold leading-tight mb-3 group-hover:text-red-700 transition-colors font-display">
                        Breaking Story Headline: Something Important Happened Today in {activePage}
                      </h2>
                      <p className="text-slate-600 text-sm font-sans line-clamp-3 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <span className="text-xs font-bold text-slate-400 uppercase font-sans">2 Hours Ago</span>
                    </article>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-12 font-sans font-bold">
                  <button className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded">1</button>
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">2</button>
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">3</button>
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">...</button>
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-12">
                {/* Sidebar Ad */}
                <div className="bg-slate-100 aspect-square flex items-center justify-center text-slate-400 font-sans text-sm border border-slate-200">
                  300x250 Ad Space
                </div>

                {/* Newsletter */}
                <div className="bg-slate-50 p-8 border border-slate-200 text-center">
                  <h3 className="text-xl font-black uppercase font-display mb-2">Don't Miss Out</h3>
                  <p className="text-slate-600 text-sm mb-6 font-sans">Get the latest {activePage} news delivered to your inbox.</p>
                  <input type="email" placeholder="Your email" className="w-full px-4 py-2 border border-slate-300 mb-3 text-sm font-sans" />
                  <button className="w-full bg-red-600 text-white py-2 font-bold text-sm font-sans uppercase hover:bg-red-700">Subscribe</button>
                </div>
              </aside>
            </div>
          </div>
        );

      case 'Categories':
        return (
          <div className="max-w-6xl mx-auto px-6 py-20 font-serif">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 text-center">Explore Topics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Design', 'Development', 'Lifestyle', 'Technology', 'Travel', 'Culture'].map((cat, i) => (
                <div key={cat} className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
                  <img src={`https://picsum.photos/seed/cat${i}/600/400`} alt={cat} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-3xl font-bold mb-2">{cat}</h3>
                    <span className="text-sm font-sans uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{Math.floor(Math.random() * 50) + 10} Articles</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Subscribe':
        return (
          <div className="min-h-[80vh] flex items-center justify-center px-6 bg-slate-50 font-serif">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <img src="https://picsum.photos/seed/newsletter/800/800" alt="Background" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-6">Join the Community</h2>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    Join 10,000+ readers who get our weekly digest of the best stories, tutorials, and insights.
                  </p>
                  <ul className="space-y-4">
                    {['Weekly Digest', 'Exclusive Content', 'No Spam Promise'].map(item => (
                      <li key={item} className="flex items-center gap-3 font-sans">
                        <CheckCircle size={20} className="text-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-sans">Sign up for free</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 font-sans">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 font-sans">Interests (Optional)</label>
                    <div className="flex flex-wrap gap-2">
                      {['Design', 'Tech', 'Lifestyle'].map(tag => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                          <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" />
                          <span className="text-sm text-slate-600 font-sans">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-brand-600 text-white py-4 rounded-lg font-bold font-sans hover:bg-brand-500 transition-colors shadow-lg shadow-brand-600/20">
                    Subscribe Now
                  </button>
                </form>
                <p className="text-center text-slate-400 text-xs mt-6 font-sans">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Blog':
      case 'Journal':
      case 'Popular Posts':
        return (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">Latest News</h1>
            <div className="space-y-12">
              {[1, 2, 3].map((post) => (
                <article key={post} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-64 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`https://picsum.photos/seed/${theme.id}blog${post}/400/300`} alt="Blog" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14} /> Oct 24, 2024</span>
                      <span className="flex items-center gap-1"><User size={14} /> Admin</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-brand-600 cursor-pointer">The Future of {theme.category} Design Trends</h2>
                    <p className="text-slate-600 mb-4 line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button className="text-brand-600 font-bold text-sm">Read More</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case 'Testimonials':
        return (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">What Our Clients Say</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-600 mb-6">"This theme transformed our business. The design is impeccable and the code is clean."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                      <img src={`https://picsum.photos/seed/${theme.id}user${i}/100/100`} alt="User" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Client Name {i}</h4>
                      <p className="text-slate-500 text-xs">CEO, Company</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Docs':
        if (theme.category === 'SaaS') {
          return (
            <div className="bg-white min-h-screen font-sans text-slate-900 flex">
              {/* Sidebar */}
              <aside className="w-64 border-r border-slate-200 h-screen sticky top-0 overflow-y-auto hidden lg:block">
                <div className="p-6">
                  <h2 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-wider">Documentation</h2>
                  <nav className="space-y-8">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3 text-sm">Getting Started</h3>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="text-indigo-600 font-medium cursor-pointer">Introduction</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Quick Start</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Installation</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3 text-sm">API Reference</h3>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="hover:text-indigo-600 cursor-pointer">Endpoints</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Error Codes</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Rate Limits</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3 text-sm">Guides</h3>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="hover:text-indigo-600 cursor-pointer">Webhooks</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Custom Domains</li>
                        <li className="hover:text-indigo-600 cursor-pointer">Security</li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <main className="flex-1 max-w-4xl mx-auto px-6 py-12 lg:px-12">
                <div className="prose prose-slate max-w-none">
                  <h1 className="text-4xl font-bold text-slate-900 mb-6">Introduction</h1>
                  <p className="lead text-xl text-slate-600 mb-8">
                    Welcome to the {theme.title} API documentation. This guide will help you get started with integrating our platform into your application.
                  </p>
                  
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mb-8 flex gap-4">
                    <Info className="text-indigo-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-indigo-900 mb-2">Prerequisites</h4>
                      <p className="text-indigo-800 text-sm">
                        Before you begin, make sure you have an active account and have generated your API keys from the dashboard.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Authentication</h2>
                  <p className="mb-4">
                    All API requests must be authenticated using your API key. You can pass the key in the header of your request.
                  </p>
                  
                  <div className="bg-slate-900 rounded-xl p-6 mb-8 overflow-x-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 text-xs font-mono">BASH</span>
                      <button className="text-slate-400 hover:text-white"><Download size={16} /></button>
                    </div>
                    <code className="text-green-400 font-mono text-sm">
                      curl -X GET https://api.example.com/v1/users \<br/>
                      &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
                    </code>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Response Format</h2>
                  <p className="mb-4">
                    All responses are returned in JSON format.
                  </p>
                  <div className="bg-slate-900 rounded-xl p-6 mb-8 overflow-x-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 text-xs font-mono">JSON</span>
                      <button className="text-slate-400 hover:text-white"><Download size={16} /></button>
                    </div>
                    <pre className="text-blue-300 font-mono text-sm">
{`{
  "data": {
    "id": "usr_1234567890",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "role": "admin"
  },
  "meta": {
    "timestamp": 1678901234
  }
}`}
                    </pre>
                  </div>
                </div>
              </main>
            </div>
          );
        }
        break;

      case 'Dashboard':
        if (theme.category === 'SaaS') {
          return (
            <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex">
              {/* Dashboard Sidebar */}
              <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Hexagon size={20} className="fill-white" />
                    </div>
                    <span className="font-bold text-lg">Nexus</span>
                  </div>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                  {[
                    { icon: Layout, label: 'Overview', active: true },
                    { icon: Users, label: 'Customers' },
                    { icon: BarChart, label: 'Analytics' },
                    { icon: CreditCard, label: 'Billing' },
                    { icon: Settings, label: 'Settings' }
                  ].map((item, i) => (
                    <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold">JD</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">John Doe</p>
                      <p className="text-xs text-slate-400 truncate">john@example.com</p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Dashboard Content */}
              <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                  <h1 className="text-xl font-bold text-slate-900">Overview</h1>
                  <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
                      <Search size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full relative">
                      <Mail size={20} />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                  </div>
                </header>

                <div className="p-8">
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
                      { label: 'Subscriptions', value: '+2350', change: '+180.1%', trend: 'up' },
                      { label: 'Active Now', value: '+573', change: '+201', trend: 'up' },
                      { label: 'Churn Rate', value: '2.4%', change: '-0.5%', trend: 'down' } // Good down trend
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            (stat.trend === 'up' && stat.label !== 'Churn Rate') || (stat.trend === 'down' && stat.label === 'Churn Rate') 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Charts Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900">Revenue Overview</h3>
                        <select className="text-sm border-slate-200 rounded-lg text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500">
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Last year</option>
                        </select>
                      </div>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                          <div key={i} className="w-full bg-indigo-50 rounded-t-sm relative group">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-sm transition-all duration-500 group-hover:bg-indigo-500"
                              style={{ height: `${h}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
                      <div className="space-y-6">
                        {[
                          { user: 'Alice Smith', action: 'subscribed to Pro', time: '2 min ago' },
                          { user: 'Bob Jones', action: 'upgraded to Enterprise', time: '1 hour ago' },
                          { user: 'Charlie Day', action: 'created a new project', time: '3 hours ago' },
                          { user: 'Diana Prince', action: 'invited 3 members', time: '5 hours ago' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                              {item.user.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm text-slate-900">
                                <span className="font-bold">{item.user}</span> {item.action}
                              </p>
                              <p className="text-xs text-slate-400">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          );
        }

        if (theme.category === 'Educational') {
          return (
            <div className="bg-slate-50 min-h-screen pb-20">
              {/* Dashboard Header */}
              <div className="bg-slate-900 text-white py-8 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">Welcome back, Student!</h1>
                    <p className="text-blue-200 text-sm">You've learned 80% more this week.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-bold">John Doe</p>
                      <p className="text-xs text-blue-300">Student</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white overflow-hidden">
                      <img src="https://picsum.photos/seed/student_avatar/100/100" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="max-w-7xl mx-auto px-6 -mt-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Enrolled Courses</p>
                      <p className="text-2xl font-bold text-slate-900">4</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Completed</p>
                      <p className="text-2xl font-bold text-slate-900">2</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                      <Award size={24} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Certificates</p>
                      <p className="text-2xl font-bold text-slate-900">2</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* In Progress */}
                  <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">In Progress</h2>
                    <div className="space-y-4">
                      {[1, 2].map((item) => (
                        <div key={item} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6">
                          <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={`https://picsum.photos/seed/edu_course${item}/300/200`} alt="Course" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-slate-900 mb-2">Complete Web Development Bootcamp</h3>
                              <p className="text-sm text-slate-500 mb-4">Lesson 45: Introduction to React Hooks</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-bold text-slate-600">
                                <span>65% Completed</span>
                                <span>45/120 Lessons</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                              </div>
                              <button className="text-blue-600 text-sm font-bold hover:underline pt-1">Continue Learning</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Schedule */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Upcoming Schedule</h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                      {[
                        { title: 'Live Q&A with Dr. Angela', time: 'Today, 4:00 PM', type: 'Live' },
                        { title: 'React Project Submission', time: 'Tomorrow, 11:59 PM', type: 'Assignment' },
                        { title: 'Weekly Quiz', time: 'Fri, 10:00 AM', type: 'Quiz' }
                      ].map((event, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-12 text-center">
                            <span className="block text-xs font-bold text-slate-400 uppercase">{event.time.split(',')[0]}</span>
                            <span className="block font-bold text-slate-900 text-lg">{i + 12}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{event.title}</h4>
                            <p className="text-xs text-slate-500 mb-2">{event.time}</p>
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                              event.type === 'Live' ? 'bg-red-100 text-red-600' : 
                              event.type === 'Assignment' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        // Fallthrough
      case 'Login':
      case 'Account':
      case 'Dashboard':
        if (theme.category === 'SaaS') {
          return (
            <div className="max-w-md mx-auto px-6 py-20">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex justify-center mb-8">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Hexagon size={28} className="fill-white text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Welcome back</h1>
                <p className="text-slate-500 text-center mb-8">Enter your credentials to access your account</p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="name@company.com" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Forgot password?</a>
                    </div>
                    <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" />
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Sign In</button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-center text-slate-500 text-sm">
                    Don't have an account? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Start free trial</span>
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Welcome Back</h1>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input type="password" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="••••••••" />
                </div>
                <button className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-500 transition-colors">Sign In</button>
              </form>
              <p className="text-center text-slate-500 text-sm mt-6">Don't have an account? <span className="text-brand-600 font-bold cursor-pointer">Sign up</span></p>
            </div>
          </div>
        );

      case 'Cart':
        return (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg"></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Premium Theme License</h3>
                    <p className="text-slate-500 text-sm">Extended Support</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900">$49.00</span>
              </div>
              <div className="p-6 bg-slate-50 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-brand-600">$49.00</span>
              </div>
            </div>
            <button className="mt-8 w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-500 transition-colors">Proceed to Checkout</button>
          </div>
        );

      case 'Checkout':
        if (theme.category === 'SaaS') {
          return (
            <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pt-20">
              <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">Complete your subscription</h1>
                  <p className="text-slate-600">You're one step away from unlocking the full power of {theme.title}.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">Pro Plan</h3>
                        <p className="text-sm text-slate-500">Billed monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{formatPrice(99)}</p>
                        <p className="text-xs text-slate-500">per month</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input type="text" placeholder="Company Name (Optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 mb-4">Payment Details</h3>
                      <div className="border border-slate-200 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <CreditCard size={20} className="text-indigo-600" />
                          <span className="font-medium">Credit or Debit Card</span>
                        </div>
                        <div className="space-y-4">
                          <input type="text" placeholder="Card Number" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handlePurchase}
                      disabled={isProcessing}
                      className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw size={20} className="animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          Confirm Subscription <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-400">
                      By subscribing, you agree to our Terms of Service and Privacy Policy.
                      <br/>Secure payment powered by Stripe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                      <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                    </div>
                    <input type="text" placeholder="Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                      <input type="text" placeholder="State" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                      <input type="text" placeholder="ZIP Code" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <div className="border border-brand-600 bg-brand-50 p-4 rounded-xl flex items-center gap-4 cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-4 border-brand-600 bg-white"></div>
                      <CreditCard size={24} className="text-brand-600" />
                      <span className="font-bold text-slate-900">Credit Card</span>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-slate-300">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                      <span className="font-bold text-slate-900">PayPal</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Card Number" className="col-span-2 w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                      <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden">
                        <img src={`https://picsum.photos/seed/${theme.id}cart1/100/100`} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-slate-900">Premium Product</h4>
                        <p className="text-xs text-slate-500">Qty: 1</p>
                      </div>
                      <span className="font-bold text-slate-900">$199.00</span>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal</span>
                      <span>$199.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-slate-900 pt-2">
                      <span>Total</span>
                      <span>$199.00</span>
                    </div>
                  </div>
                  <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-500 transition-colors shadow-lg shadow-brand-600/20">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Instructors':
      case 'Team':
        if (theme.category === 'Educational') {
          return (
            <div className="bg-slate-50 min-h-screen pb-20">
              <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src="https://picsum.photos/seed/instructor_profile/200/200" alt="Instructor" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Dr. Angela Yu</h1>
                    <p className="text-blue-600 font-medium mb-4">Lead Instructor & Developer</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2"><Users size={16} /> 500,000+ Students</div>
                      <div className="flex items-center gap-2"><Star size={16} className="text-yellow-400 fill-yellow-400" /> 4.7 Instructor Rating</div>
                      <div className="flex items-center gap-2"><Play size={16} /> 15 Courses</div>
                    </div>
                  </div>
                  <div className="md:ml-auto flex gap-3">
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors">Website</button>
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors">Twitter</button>
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors">YouTube</button>
                  </div>
                </div>
              </div>
              
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">About Me</h2>
                  <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-12">
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      My courses are designed to be comprehensive, easy to understand, and practical. I believe that anyone can learn to code if they have the right teacher and the right curriculum.
                    </p>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">My Courses</h2>
                  <div className="space-y-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActivePage('Course Detail')}>
                        <div className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                          <img src={`https://picsum.photos/seed/edu_course${item}/200/150`} alt="Course" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-slate-900 mb-1">The Complete Web Development Bootcamp</h3>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /> 4.8</span>
                            <span className="flex items-center gap-1"><Users size={12} /> 120k students</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> 60h total</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Total Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Students</span>
                        <span className="font-bold text-slate-900">534,210</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Reviews</span>
                        <span className="font-bold text-slate-900">124,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">Meet the Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group text-center">
                  <div className="w-48 h-48 mx-auto bg-slate-200 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
                    <img src={`https://picsum.photos/seed/${theme.id}team${i}/200/200`} alt="Team" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">Team Member {i}</h3>
                  <p className="text-brand-600 font-medium mb-2">Position Title</p>
                  <p className="text-slate-500 text-sm">Expert in their field with over 10 years of experience.</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Resume':
        if (theme.category === 'Portfolio') {
          return (
            <div className="bg-slate-900 min-h-screen text-white px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                  <h1 className="text-4xl font-bold">Resume</h1>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors">
                    <Download size={20} /> Download PDF
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Sidebar Info */}
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-6">Contact</h3>
                      <ul className="space-y-4 text-slate-300">
                        <li className="flex items-center gap-3"><Mail size={18} className="text-indigo-400" /> hello@example.com</li>
                        <li className="flex items-center gap-3"><Phone size={18} className="text-indigo-400" /> +1 (555) 123-4567</li>
                        <li className="flex items-center gap-3"><MapPin size={18} className="text-indigo-400" /> San Francisco, CA</li>
                        <li className="flex items-center gap-3"><ExternalLink size={18} className="text-indigo-400" /> www.example.com</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-6">Education</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-white">Master of Design</h4>
                          <p className="text-indigo-400 text-sm mb-1">University of Arts</p>
                          <p className="text-slate-500 text-xs">2018 - 2020</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Bachelor of CS</h4>
                          <p className="text-indigo-400 text-sm mb-1">Tech Institute</p>
                          <p className="text-slate-500 text-xs">2014 - 2018</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-6">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Node.js', 'Figma', 'UI/UX', 'Tailwind'].map(skill => (
                          <span key={skill} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-sm border border-slate-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="md:col-span-2 space-y-12">
                    <div>
                      <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-8 flex items-center gap-2">
                        <Briefcase size={20} className="text-indigo-400" /> Experience
                      </h3>
                      <div className="space-y-12 border-l-2 border-slate-800 pl-8 ml-3 relative">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-4 border-indigo-600"></div>
                            <span className="text-xs font-bold text-indigo-400 mb-1 block">202{i} - Present</span>
                            <h3 className="text-xl font-bold text-white mb-1">Senior Product Designer {i}</h3>
                            <p className="text-slate-400 text-sm mb-4">Tech Company Inc. • Remote</p>
                            <p className="text-slate-300 leading-relaxed">
                              Led the design direction for the main product line. Collaborated with cross-functional teams to deliver high-quality user experiences. Increased user engagement by 40% through iterative design improvements.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">My Resume</h1>
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative pl-8 border-l-2 border-slate-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-600 border-4 border-white shadow-sm"></div>
                  <span className="text-sm font-bold text-brand-600 mb-1 block">202{i} - Present</span>
                  <h3 className="text-xl font-bold text-slate-900">Senior Position {i}</h3>
                  <p className="text-slate-500 mb-2">Company Name • Location</p>
                  <p className="text-slate-600">Led a team of designers and developers to create award-winning digital products. Improved conversion rates by 200%.</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Skills':
        return (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">Technical Skills</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['UI Design', 'Frontend Dev', 'Backend Dev', 'SEO', 'Marketing', 'Strategy'].map((skill, i) => (
                <div key={skill}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-900">{skill}</span>
                    <span className="text-brand-600 font-bold">{90 - i * 5}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: `${90 - i * 5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Categories':
        return (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">Browse Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Technology', 'Lifestyle', 'Travel', 'Food', 'Fashion', 'Health', 'Business', 'Art'].map((cat, i) => (
                <div key={cat} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img src={`https://picsum.photos/seed/${theme.id}cat${i}/400/400`} alt={cat} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl">{cat}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Track Order':
        return (
          <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-6">Track Your Order</h1>
              <p className="text-slate-500 mb-6">Enter your order ID to see the current status.</p>
              <form className="space-y-4">
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Order ID (e.g., #12345)" />
                <button className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-500 transition-colors">Track Status</button>
              </form>
            </div>
          </div>
        );

      case 'Subscribe':
        return (
          <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
              <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
                <Mail size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Subscribe to Newsletter</h1>
              <p className="text-slate-500 mb-6">Get the latest updates and news delivered to your inbox.</p>
              <form className="space-y-4">
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="your@email.com" />
                <button className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-500 transition-colors">Subscribe Now</button>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
              <Layout size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{activePage} Page</h1>
            <p className="text-slate-500 max-w-md mx-auto">This is a placeholder for the {activePage} page. In the full version, this page would contain specific content relevant to the {theme.category} category.</p>
            <button 
              onClick={() => setActivePage('Home')}
              className="mt-8 bg-brand-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-500 transition-colors"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex flex-col">
      {/* Preview Header */}
      <div className="h-16 bg-slate-900 text-white flex items-center justify-between px-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="hidden sm:block">
            <h3 className="font-bold text-sm">{theme.title}</h3>
            <p className="text-xs text-slate-400">by {theme.author}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setDevice('desktop')}
            className={cn(
              "p-2 rounded-md transition-all",
              device === 'desktop' ? "bg-brand-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            <Monitor size={18} />
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={cn(
              "p-2 rounded-md transition-all",
              device === 'tablet' ? "bg-brand-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            <Tablet size={18} />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={cn(
              "p-2 rounded-md transition-all",
              device === 'mobile' ? "bg-brand-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            <Smartphone size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className={cn(
              "p-2 rounded-full transition-colors hidden sm:block",
              showDetails ? "bg-brand-600 text-white" : "hover:bg-slate-800 text-slate-400"
            )}
            title="Theme Details"
          >
            <Info size={20} />
          </button>
          <span className="font-bold text-lg">${theme.price}</span>
          <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors">
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Buy Now</span>
          </button>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Preview Area */}
        <div className="flex-grow bg-slate-100 overflow-hidden flex items-center justify-center p-4 relative">
          <motion.div 
            layout
            className={cn(
              "bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out flex flex-col relative",
              device === 'desktop' ? "w-full h-full rounded-none" : 
              device === 'tablet' ? "w-[768px] h-[90%] rounded-xl border-8 border-slate-800" : 
              "w-[375px] h-[90%] rounded-[2rem] border-8 border-slate-800"
            )}
          >
            {/* Mock Website Content */}
            <div className={cn("flex-grow overflow-y-auto custom-scrollbar", theme.category === 'Portfolio' ? "bg-slate-900" : "bg-white")}>
              {/* Dynamic Nav based on Category */}
              <nav className={cn(
                "sticky top-0 z-20 backdrop-blur border-b px-6 py-4 flex justify-between items-center transition-colors",
                theme.category === 'Portfolio' || theme.category === 'Educational' ? "bg-slate-900/90 border-slate-800 text-white" : 
                theme.category === 'News' ? "bg-white border-b-4 border-black text-slate-900 font-sans" :
                "bg-white/90 border-gray-100 text-slate-900"
              )}>
                <div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setActivePage('Home')}
                >
                  <div className="bg-brand-600 text-white p-2 rounded-lg group-hover:bg-brand-500 transition-colors">
                    <Hexagon size={24} fill="currentColor" className="transform rotate-90" />
                  </div>
                  <span className={cn(
                    "font-display font-bold text-xl transition-colors",
                    theme.category === 'Portfolio' ? "text-white group-hover:text-indigo-400" : "text-slate-900 group-hover:text-brand-600"
                  )}>
                    {theme.title}
                  </span>
                </div>
                
                {/* Desktop Menu */}
                <div className={cn(
                  "hidden md:flex gap-6 text-sm font-medium transition-colors",
                  theme.category === 'Portfolio' || theme.category === 'Educational' ? "text-slate-400" : 
                  theme.category === 'News' ? "text-slate-900 font-bold uppercase tracking-wider" :
                  "text-slate-600"
                )}>
                  {details.menuStructure.slice(0, 5).map((item) => (
                    <button 
                      key={item} 
                      onClick={() => setActivePage(item)}
                      className={cn(
                        "transition-colors",
                        theme.category === 'Portfolio' || theme.category === 'Educational'
                          ? (activePage === item ? (theme.category === 'Educational' ? "text-blue-400 font-bold" : "text-indigo-400 font-bold") : "hover:text-white")
                          : theme.category === 'News' ? (activePage === item ? "text-red-600" : "hover:text-red-600")
                          : (activePage === item ? "text-brand-600 font-bold" : "hover:text-brand-600")
                      )}
                    >
                      {item}
                    </button>
                  ))}
                  {details.menuStructure.length > 5 && (
                    <span className="text-slate-400 cursor-pointer hover:text-slate-600">More...</span>
                  )}
                </div>

                {/* Mobile Menu Icon */}
                <div className={cn("md:hidden", theme.category === 'Portfolio' ? "text-white" : "text-slate-600")}>
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <Menu size={24} />
                  </button>
                </div>

                <div className="hidden md:block">
                  {['E-commerce', 'Coffee Shop', 'Jewellery'].includes(theme.category) ? (
                    <div className="flex gap-4 text-slate-600">
                      <Search size={20} className="cursor-pointer hover:text-brand-600" />
                      <ShoppingCart size={20} className="cursor-pointer hover:text-brand-600" />
                    </div>
                  ) : theme.category === 'Blogging' ? (
                    <div className="flex gap-4 text-slate-600 items-center">
                      <Search size={20} className="cursor-pointer hover:text-brand-600" />
                      <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  ) : theme.category === 'Portfolio' ? (
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-3 text-slate-400 mr-2">
                        <Github size={18} className="cursor-pointer hover:text-indigo-400 transition-colors" />
                        <Linkedin size={18} className="cursor-pointer hover:text-indigo-400 transition-colors" />
                        <Twitter size={18} className="cursor-pointer hover:text-indigo-400 transition-colors" />
                      </div>
                      <button onClick={() => setActivePage('Contact')} className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
                        Contact Me
                      </button>
                    </div>
                  ) : theme.category === 'Educational' ? (
                    <div className="flex gap-4 items-center">
                      <Search size={20} className="text-blue-100 cursor-pointer hover:text-white" />
                      <button onClick={() => setActivePage('Login')} className="text-blue-100 font-bold text-sm hover:text-white">Log In</button>
                      <button onClick={() => setActivePage('Login')} className="bg-white text-blue-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                        Join for Free
                      </button>
                    </div>
                  ) : theme.category === 'News' ? (
                    <div className="flex gap-4 items-center font-sans">
                      <Search size={20} className="cursor-pointer hover:text-red-600" />
                      <button className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  ) : (
                    <button className="bg-slate-900 text-white px-4 py-2 rounded text-xs font-bold hover:bg-slate-800 transition-colors">
                      {theme.category === 'Corporate' ? 'Get Quote' : 'Contact Us'}
                    </button>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Dropdown */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                  >
                    <div className="flex flex-col p-4 space-y-4">
                      {details.menuStructure.map((item) => (
                        <button 
                          key={item}
                          onClick={() => {
                            setActivePage(item);
                            setMobileMenuOpen(false);
                          }}
                          className={cn(
                            "text-left font-medium",
                            activePage === item ? "text-brand-600" : "text-slate-600"
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content Area */}
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderPageContent()}
              </motion.div>

              {/* Mock Footer */}
              <footer className="bg-white border-t border-slate-100 py-12 px-6 mt-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li className="cursor-pointer hover:text-brand-600" onClick={() => setActivePage('About')}>About Us</li>
                      <li className="cursor-pointer hover:text-brand-600">Careers</li>
                      <li className="cursor-pointer hover:text-brand-600" onClick={() => setActivePage('Contact')}>Contact</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li className="cursor-pointer hover:text-brand-600" onClick={() => setActivePage('Blog')}>Blog</li>
                      <li className="cursor-pointer hover:text-brand-600">Documentation</li>
                      <li className="cursor-pointer hover:text-brand-600">Support</li>
                    </ul>
                  </div>
                  <div className="col-span-2">
                    <h4 className="font-bold text-slate-900 mb-4">Subscribe</h4>
                    <div className="flex gap-2">
                      <input type="email" placeholder="Enter your email" className="flex-grow bg-slate-100 rounded px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                      <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-slate-800 transition-colors">Subscribe</button>
                    </div>
                  </div>
                </div>
                <div className="text-center text-slate-400 text-sm pt-8 border-t border-slate-100">
                  © 2024 {theme.title}. All rights reserved.
                </div>
              </footer>
            </div>
          </motion.div>
        </div>

        {/* Details Sidebar */}
        <AnimatePresence>
          {showDetails && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white border-l border-slate-200 h-full overflow-y-auto flex-shrink-0 hidden lg:block"
            >
              <div className="p-6 space-y-8 w-80">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Theme Details</h3>
                  <p className="text-slate-500 text-xs">Specifics for {theme.category}</p>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Layout size={16} className="text-brand-600" />
                    Ideal Menu Structure
                  </h4>
                  <ul className="space-y-2">
                    {details.menuStructure.map((item) => (
                      <li key={item} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-brand-600" />
                    Essential Plugins
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {details.plugins.map((plugin) => (
                      <span key={plugin} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {plugin}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Shield size={16} className="text-brand-600" />
                    Universal Best Practices
                  </h4>
                  <ul className="space-y-3">
                    <li className="text-xs text-slate-600">
                      <strong className="block text-slate-900 mb-0.5">Navigation</strong>
                      {UNIVERSAL_BEST_PRACTICES.navigation.join(', ')}
                    </li>
                    <li className="text-xs text-slate-600">
                      <strong className="block text-slate-900 mb-0.5">Performance</strong>
                      {UNIVERSAL_BEST_PRACTICES.performance.join(', ')}
                    </li>
                    <li className="text-xs text-slate-600">
                      <strong className="block text-slate-900 mb-0.5">Security</strong>
                      {UNIVERSAL_BEST_PRACTICES.security.join(', ')}
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Location Toast */}
      <AnimatePresence>
        {showLocationToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl border border-slate-200 p-4 flex items-center gap-4 max-w-sm"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Location Detected</h4>
              <p className="text-xs text-slate-500">
                We've detected you're in <span className="font-bold text-slate-700">{detectedRegion}</span>. 
                Pricing has been updated to <span className="font-bold text-slate-700">{currency}</span>.
              </p>
            </div>
            <button 
              onClick={() => setShowLocationToast(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
