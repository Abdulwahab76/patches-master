
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center cursor-pointer">
            <span className="text-2xl font-black tracking-tighter">
              PATCH<span className="text-orange-600">MASTER</span><span className="text-slate-400 font-light">PRO</span>
            </span>
          </Link>

          <div className="hidden lg:flex space-x-8 items-center">
            <Link to="/" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition">Home</Link>

            <div className="relative group">
              <button
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="text-sm font-bold text-slate-600 hover:text-orange-600 transition flex items-center"
              >
                Categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute left-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/shop/${cat.slug}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-6 py-3 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    {cat.name} Patches
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/shop" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition">Shop All</Link>
            <a href="/#process" className="text-sm font-bold text-slate-600 hover:text-orange-600 transition">Process</a>
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative p-2 text-slate-600 hover:text-orange-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/quote"
              className="hidden sm:block bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-orange-700 transition shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
