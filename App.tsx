
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './src/pages/HomePage';
import ShopPage from './src/pages/ShopPage';
import QuotePage from './src/pages/QuotePage';
import { PatchProduct } from './types';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleAddToCart = (product: PatchProduct) => {
    setCartCount(prev => prev + 1);
    console.log(`Added ${product.name} sample kit to cart`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
          <Route path="/shop/:categorySlug" element={<ShopPage onAddToCart={handleAddToCart} />} />
          <Route path="/quote" element={<QuotePage />} />
        </Routes>

        {/* Dynamic FAQ for E-commerce Feel - Visible on all pages except quote? Or maybe just Home/Shop */}
        {location.pathname !== '/quote' && (
          <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-black text-center text-slate-900 mb-16 tracking-tight">Order Support & FAQs</h2>
              <div className="space-y-4">
                {[
                  { q: "Is there a limit on colors for Embroidered patches?", a: "We offer up to 12 thread colors per design at no extra charge. Additional colors can be added for a small premium." },
                  { q: "What's the difference between PVC and Silicone?", a: "PVC is stiffer and more durable for exterior gear. Silicone is softer, eco-friendly, and offers a more luxury 'fashion' hand-feel." },
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
                    <h4 className="font-black text-slate-900 mb-3 text-lg">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Scroll to Top Lead Magnet for Shop View */}
      {location.pathname.startsWith('/shop') && cartCount > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <Link to="/quote" className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl font-black flex items-center gap-3">
            <span className="bg-orange-600 px-2 py-1 rounded text-[10px]">{cartCount}</span>
            Finalize My Quote
          </Link>
        </div>
      )}
    </div>
  );
};

export default App;
