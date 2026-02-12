
import { PatchProduct } from './types';

export const PRODUCTS: PatchProduct[] = [
  {
    id: 'emb-01',
    name: 'Premium Embroidered Patches',
    description: 'The industry standard. High-density stitching for classic brand representation.',
    image: 'https://images.unsplash.com/photo-1598300046647-53c899fef40c?auto=format&fit=crop&q=80&w=800',
    category: 'Embroidered',
    priceStart: 0.85
  },
  {
    id: 'che-01',
    name: 'Varsity Chenille Patches',
    description: 'Fuzzy, textured patches perfect for sports teams, school jackets, and vintage aesthetics.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Chenille',
    priceStart: 1.20
  },
  {
    id: 'pvc-01',
    name: '3D PVC Rubber Patches',
    description: 'Waterproof and durable. Ideal for outdoor gear, uniforms, and tactical equipment.',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800',
    category: 'PVC',
    priceStart: 1.45
  },
  {
    id: 'sil-01',
    name: 'Soft Silicone Patches',
    description: 'Ultra-flexible with a premium matte finish. Perfect for activewear and luxury brands.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    category: 'Silicone',
    priceStart: 1.60
  },
  {
    id: 'lea-01',
    name: 'Genuine Leather Patches',
    description: 'Laser-etched or debossed for a rugged, sophisticated look. Great for hats and denim.',
    image: 'https://images.unsplash.com/photo-1524383537042-5a500093d562?auto=format&fit=crop&q=80&w=800',
    category: 'Leather',
    priceStart: 2.10
  },
  {
    id: 'wov-01',
    name: 'High-Definition Woven Patches',
    description: 'Thinner threads allow for extreme detail and legibility of small text.',
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800',
    category: 'Woven',
    priceStart: 0.75
  },
  {
    id: 'sub-01',
    name: 'Sublimated Printed Patches',
    description: 'Photo-realistic quality with unlimited colors and gradients via dye sublimation.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1f?auto=format&fit=crop&q=80&w=800',
    category: 'Sublimated',
    priceStart: 1.10
  },
  {
    id: 'met-01',
    name: 'Metflex Metallic Patches',
    description: '3D metallic effects that offer a modern, high-tech aesthetic for premium branding.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    category: 'Metflex',
    priceStart: 2.50
  }
];

export const CATEGORIES: { name: string; slug: string }[] = [
  { name: 'Embroidered', slug: 'embroidered' },
  { name: 'Chenille', slug: 'chenille' },
  { name: 'PVC', slug: 'pvc' },
  { name: 'Silicone', slug: 'silicone' },
  { name: 'Leather', slug: 'leather' },
  { name: 'Woven', slug: 'woven' },
  { name: 'Sublimated', slug: 'sublimated' },
  { name: 'Metflex', slug: 'metflex' }
];

// Exporting PROCESS_STEPS for use in ProcessSection component
export const PROCESS_STEPS = [
  { 
    title: 'Consultation', 
    desc: 'Share your ideas and artwork with our specialists to define your project requirements.' 
  },
  { 
    title: 'Digital Proof', 
    desc: 'Receive and approve a high-resolution mockup of your custom design within 2 hours.' 
  },
  { 
    title: 'Precision Crafting', 
    desc: 'Our artisans use state-of-the-art machinery to create your high-quality custom patches.' 
  },
  { 
    title: 'Fast Shipping', 
    desc: 'Your finished order is shipped globally with tracked express delivery directly to you.' 
  }
];
