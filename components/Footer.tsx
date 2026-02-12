
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-extrabold tracking-tighter text-white mb-6 block">
              PATCH<span className="text-orange-500">MASTER</span>
            </span>
            <p className="text-sm leading-relaxed">
              Helping brands stand out through high-quality custom merchandise since 2012. Trusted by over 500k customers worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Products</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Embroidered Patches</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">PVC Patches</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Leather Patches</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Chenille Patches</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Our Portfolio</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <span className="mr-3">📧</span> info@patchmaster.pro
              </li>
              <li className="flex items-center">
                <span className="mr-3">📞</span> +1 (800) 555-PATCH
              </li>
              <li className="flex items-center">
                <span className="mr-3">📍</span> 123 Artisan Way, Austin, TX
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 PatchMaster Pro. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
