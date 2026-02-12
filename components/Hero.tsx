
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Wear Your Story With <span className="gradient-text">Custom Patches</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Premium embroidered, PVC, and leather patches for brands, teams, and artists. No minimum order, free worldwide shipping, and 24-hour design support.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href="#quote" className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-700 transition shadow-xl shadow-orange-500/30">
                Start Your Quote
              </a>
              <a href="#products" className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:border-orange-500 hover:text-orange-600 transition">
                View Gallery
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6 text-sm text-slate-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                Fast Turnaround
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                Free Digital Proof
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
            <div className="bg-gradient-to-tr from-orange-100 to-red-100 rounded-3xl p-4 rotate-3 transform transition-transform hover:rotate-0">
               <img 
                 src="https://picsum.photos/seed/hero/800/600" 
                 alt="Custom Patches Hero" 
                 className="rounded-2xl shadow-2xl border-4 border-white"
               />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 hidden md:block animate-bounce">
                <p className="font-bold text-orange-600 text-sm">★★★★★</p>
                <p className="text-xs text-slate-500">5000+ Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
