
import React from 'react';
import { PROCESS_STEPS } from '../constants';

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold">Simple 4-Step Process</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">We've streamlined the custom ordering experience from concept to creation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="relative z-10 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg shadow-orange-500/20">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.desc}</p>
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-slate-800"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
