
import React from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { PatchProduct } from '../types';

interface ShopProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onAddToCart: (p: PatchProduct) => void;
  onRequestQuote: (p: PatchProduct) => void;
}

const Shop: React.FC<ShopProps> = ({ activeCategory, onCategoryChange, onAddToCart, onRequestQuote }) => {
  // Removed internal state to allow parent control (URL syncing)

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Our Patch Gallery</h1>
            <p className="mt-4 text-slate-600 max-w-xl">Choose a style to get started. Every patch is fully customizable with your logo and colors.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-500 hover:text-orange-600'}`}
            >
              All Styles
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => onCategoryChange(cat.name)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.name ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-500 hover:text-orange-600'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    From ${product.priceStart} ea
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2">{product.description}</p>

                <div className="space-y-3">
                  <button
                    onClick={() => onRequestQuote(product)}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                  >
                    Custom Quote
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl text-sm font-bold hover:border-orange-500 hover:text-orange-600 transition"
                  >
                    Samples Kit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
