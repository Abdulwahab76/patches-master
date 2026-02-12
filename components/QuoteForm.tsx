
import React, { useState, useEffect } from 'react';
import { QuoteFormData, PatchProduct } from '../types';
import { submitQuoteRequest } from '../services/formService';

interface QuoteFormProps {
  selectedProduct?: PatchProduct;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ selectedProduct }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    patchType: selectedProduct?.category || 'Embroidered',
    quantity: '50',
    width: '',
    height: '',
    designInspiration: '',
    details: selectedProduct ? `I am interested in the ${selectedProduct.name}. ` : ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        patchType: selectedProduct.category,
        details: `I am interested in the ${selectedProduct.name}. `
      }));
    }
  }, [selectedProduct]);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitQuoteRequest(formData);
    setLoading(false);
    if (result.success) setSubmitted(true);
    else alert(result.message);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center mt-20">
        <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-2xl">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Request Sent!</h2>
          <p className="text-slate-600 mb-10 text-xl font-medium leading-relaxed">
            Thanks, <strong>{formData.fullName}</strong>. Our digital proofs team is already reviewing your details. Expect a mockup and pricing in your inbox within 2 hours.
          </p>
          <button onClick={() => window.location.reload()} className="bg-orange-600 text-white px-10 py-4 rounded-xl font-black hover:bg-orange-700 transition shadow-lg">Back to Homepage</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 mb-12 lg:mb-0">
          <div className="sticky top-32">
            <h1 className="text-5xl font-black text-slate-900 leading-tight mb-8">
              Let's Build Your <br /><span className="gradient-text">Masterpiece</span>
            </h1>

            {selectedProduct && (
              <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xl mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-4">
                  <img src={selectedProduct.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt={selectedProduct.name} />
                  <div>
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Inquiry Context</p>
                    <h4 className="font-bold text-slate-900">{selectedProduct.name}</h4>
                    <p className="text-xs text-slate-500">Starting at ${selectedProduct.priceStart} / unit</p>
                  </div>
                </div>
              </div>
            )}

            <ul className="space-y-6">
              {[
                { label: 'Free Worldwide Express Shipping', desc: 'No hidden fees at checkout.' },
                { label: 'Unlimited Design Revisions', desc: 'We iterate until it is perfect.' },
                { label: 'Dedicated Account Manager', desc: 'Direct access to your patch pro.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">✓</div>
                  <div>
                    <h5 className="font-bold text-slate-900">{item.label}</h5>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
            {/* Steps Progress */}
            <div className="flex justify-between items-center mb-12">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex-1 text-center relative">
                  <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-black text-sm z-10 relative transition-all duration-300 ${step >= s ? 'bg-slate-900 text-white scale-110 shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`absolute top-5 left-1/2 w-full h-1 transition-all duration-500 ${step > s ? 'bg-slate-900' : 'bg-slate-100'}`}></div>}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Project Fundamentals</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Product Category</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['Embroidered', 'Chenille', 'PVC', 'Silicone', 'Leather', 'Woven', 'Sublimated', 'Metflex'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, patchType: type })}
                            className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all ${formData.patchType === type ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm' : 'border-slate-100 text-slate-500 hover:border-slate-300'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Height (inches)</label>
                        <input
                          type="text"
                          placeholder="3.5"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50"
                          value={formData.height}
                          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Width (inches)</label>
                        <input
                          type="text"
                          placeholder="3.5"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50"
                          value={formData.width}
                          onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Design Inspiration (Optional)</label>
                      <input
                        type="text"
                        placeholder="Link to image/design or short description"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50"
                        value={formData.designInspiration}
                        onChange={(e) => setFormData({ ...formData, designInspiration: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Estimated Quantity</label>
                      <div className="flex items-center gap-4">
                        <input
                          required
                          type="range"
                          min="1"
                          max="1000"
                          step="10"
                          className="flex-1 accent-orange-600"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                        <span className="bg-slate-900 text-white px-5 py-2 rounded-xl font-black text-lg w-24 text-center">{formData.quantity}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Unit price decreases as quantity increases</p>
                    </div>
                    <button type="button" onClick={handleNextStep} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition shadow-xl">Continue →</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Design & Proofing</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Tell us about your design</label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-slate-50 outline-none font-medium"
                        placeholder="Mention colors, sizes, and specific requirements like 'Velcro backing' or 'Iron-on'..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">Upload Design (Optional)</label>
                      <input
                        type="file"
                        accept="image/*,.pdf,.ai,.eps"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData({ ...formData, designFile: e.target.files[0] });
                          }
                        }}
                      />
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Supports JPG, PNG, PDF, AI</p>
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={handlePrevStep} className="flex-1 py-5 border border-slate-200 rounded-2xl font-black text-slate-400">Back</button>
                      <button type="button" onClick={handleNextStep} className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black text-lg">Almost Done!</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Final Details</h3>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Full Name</label>
                        <input required type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50" placeholder="John Wick" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Email Address</label>
                        <input required type="email" className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50" placeholder="john@continental.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Phone Number (Optional)</label>
                      <input type="tel" className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:border-orange-500 outline-none font-medium bg-slate-50" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={handlePrevStep} className="flex-1 py-5 border border-slate-200 rounded-2xl font-black text-slate-400">Back</button>
                      <button
                        disabled={loading}
                        type="submit"
                        className="flex-[3] bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition shadow-2xl shadow-orange-500/40 active:scale-95 flex items-center justify-center"
                      >
                        {loading ? 'Processing...' : 'Send Request Now'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
