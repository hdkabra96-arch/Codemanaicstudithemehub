export interface Theme {
  id: string;
  title: string;
  description: string;
  category: 'Blogging' | 'E-commerce' | 'Portfolio' | 'Corporate' | 'Creative' | 'Educational' | 'Coffee Shop' | 'Jewellery' | 'News' | 'SaaS';
  tech: string[];
  price: number;
  rating: number;
  sales: number;
  image: string;
  author: string;
  tier: 'Basic' | 'Standard' | 'Premium';
}

export const CATEGORIES = ['All', 'Blogging', 'E-commerce', 'Portfolio', 'Corporate', 'Creative', 'Educational', 'Coffee Shop', 'Jewellery', 'News', 'SaaS'] as const;
export const TECH_STACKS = ['All', 'HTML', 'React', 'Vue', 'PHP', 'WordPress', 'Tailwind', 'Next.js', 'Angular', 'Svelte'] as const;

const ADJECTIVES = ['Modern', 'Clean', 'Minimal', 'Bold', 'Creative', 'Professional', 'Elegant', 'Dynamic', 'Sleek', 'Vibrant', 'Urban', 'Rustic', 'Futuristic', 'Classic', 'Luxury', 'Swift', 'Prime', 'Elite', 'Nova', 'Zen'];
const NOUNS: Record<string, string[]> = {
  'Blogging': ['Journal', 'Chronicle', 'Voice', 'Story', 'Insight', 'Post', 'Daily', 'Notes', 'Gazette', 'Review', 'Log', 'Press', 'Times', 'Wire', 'Feed'],
  'E-commerce': ['Mart', 'Shop', 'Store', 'Market', 'Boutique', 'Outlet', 'Mall', 'Trade', 'Commerce', 'Retail', 'Cart', 'Bazaar', 'Exchange', 'Hub', 'Plaza'],
  'Portfolio': ['Showcase', 'Folio', 'Gallery', 'Work', 'Studio', 'Canvas', 'Exhibit', 'Profile', 'Vision', 'Lens', 'Space', 'Room', 'Display', 'Collection', 'Set'],
  'Corporate': ['Agency', 'Biz', 'Corp', 'Enterprise', 'Solutions', 'Ventures', 'Group', 'Partners', 'Consult', 'Firm', 'Global', 'Systems', 'Inc', 'Ltd', 'Co'],
  'Creative': ['Artistry', 'Design', 'Spark', 'Flow', 'Pulse', 'Wave', 'Spectrum', 'Mosaic', 'Fusion', 'Craft', 'Lab', 'Mind', 'Soul', 'Vibe', 'Aura'],
  'Educational': ['Academy', 'Learn', 'School', 'Class', 'Course', 'Study', 'Tutor', 'Mentor', 'Campus', 'Institute', 'Lesson', 'Skill', 'Mastery', 'Brain', 'Hub'],
  'Coffee Shop': ['Brew', 'Roast', 'Bean', 'Cafe', 'Espresso', 'Latte', 'Mug', 'Grind', 'Aroma', 'Perk', 'Java', 'Mocha', 'Sip', 'Cup', 'Barista'],
  'Jewellery': ['Gem', 'Sparkle', 'Gold', 'Silver', 'Diamond', 'Luxe', 'Carat', 'Shine', 'Bijoux', 'Orna', 'Crystal', 'Pearl', 'Elite', 'Crown', 'Tiara'],
  'News': ['Gazette', 'Tribune', 'Times', 'Daily', 'Post', 'Herald', 'Chronicle', 'Journal', 'Report', 'Wire', 'Voice', 'Observer', 'Guardian', 'Standard', 'Press'],
  'SaaS': ['App', 'Soft', 'Cloud', 'Desk', 'Flow', 'Sync', 'Stack', 'Hub', 'Base', 'Core', 'Link', 'Net', 'Sys', 'Ware', 'Bot']
};

const AUTHORS = ['DesignFlow', 'PixelPerfect', 'CodeMaster', 'WebWizard', 'ThemeForest_Fan', 'CreativeLabs', 'StudioX', 'DevPro', 'ArtisanUI', 'TechNinja', 'LayoutKing', 'CSS_Hero', 'ReactGuru', 'NextLevel', 'ModernUI'];

const generateThemes = (): Theme[] => {
  const themes: Theme[] = [];
  let idCounter = 1;

  const categories = CATEGORIES.filter(c => c !== 'All') as Array<Theme['category']>;

  categories.forEach(category => {
    for (let i = 0; i < 50; i++) {
      const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
      const noun = NOUNS[category][Math.floor(Math.random() * NOUNS[category].length)];
      const title = `${adj} ${noun} ${Math.floor(Math.random() * 100) + 2024}`;
      
      const isBasic = i % 3 === 0;
      const isPremium = i % 3 === 2;
      const tier = isBasic ? 'Basic' : (isPremium ? 'Premium' : 'Standard');
      
      let price;
      if (tier === 'Basic') price = Math.floor(Math.random() * 20) + 10; // 10-29
      else if (tier === 'Standard') price = Math.floor(Math.random() * 30) + 30; // 30-59
      else price = Math.floor(Math.random() * 100) + 60; // 60-159

      const techOptions = TECH_STACKS.filter(t => t !== 'All');
      const techCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 techs
      const selectedTech: string[] = [];
      while (selectedTech.length < techCount) {
        const t = techOptions[Math.floor(Math.random() * techOptions.length)];
        if (!selectedTech.includes(t)) selectedTech.push(t);
      }

      themes.push({
        id: String(idCounter++),
        title,
        description: `A fully responsive ${tier.toLowerCase()} ${category.toLowerCase()} theme. Includes mobile-ready layouts, SEO optimization, and easy customization. Perfect for ${noun.toLowerCase()}s.`,
        category,
        tech: selectedTech,
        price,
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
        sales: Math.floor(Math.random() * 5000) + 50,
        image: `https://picsum.photos/seed/${category}${i}/800/600`,
        author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
        tier
      });
    }
  });

  return themes;
};

export const MOCK_THEMES: Theme[] = generateThemes();
