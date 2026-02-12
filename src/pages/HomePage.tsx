import React from 'react';
import Hero from '../../components/Hero';
import ProductGrid from '../../components/ProductGrid';
import ProcessSection from '../../components/ProcessSection';
import AIAssistant from '../../components/AIAssistant';
import SEO from '../components/SEO';
import { OrganizationSchema } from '../components/Schema';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <>
            <SEO
                title="Custom Patches & Embroidered Designs | PatchMaster Pro"
                description="Get high-quality custom patches with no minimum order. Free worldwide shipping and 24h design proofs."
                canonical="https://patchmaster.pro/"
            />
            <OrganizationSchema />

            <Hero />
            <section className="bg-white py-12 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Trusted Global Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale contrast-125">
                        {['MARVEL', 'NIKE', 'ADIDAS', 'NASA', 'BMW'].map((brand) => (
                            <span key={brand} className="text-2xl font-black italic tracking-tighter">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>
            <ProductGrid />
            <ProcessSection />
            <AIAssistant />
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to create something legendary?</h2>
                <Link
                    to="/quote"
                    className="inline-block bg-orange-600 text-white px-12 py-5 rounded-2xl text-xl font-black shadow-2xl shadow-orange-500/40 hover:scale-105 transition-transform"
                >
                    Get a Quote in 2 Hours
                </Link>
            </div>
        </>
    );
};

export default HomePage;
