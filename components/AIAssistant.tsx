
import React, { useState } from 'react';
import { generateDesignIdeas } from '../services/geminiService';
import { DesignIdea } from '../types';

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [ideas, setIdeas] = useState<DesignIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateDesignIdeas(prompt);
    setIdeas(result);
    setLoading(false);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-orange-50 border-y border-orange-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">AI Innovation</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4">Stuck on a design?</h2>
          <p className="mt-4 text-slate-600">Our AI Design Assistant can suggest concepts for your brand in seconds.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-orange-200/50 border border-white">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g. A futuristic cyber-punk logo for a coffee shop"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-lg"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center min-w-[180px]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Generate Ideas'}
            </button>
          </form>

          {ideas.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {ideas.map((idea, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-orange-300 transition group">
                  <h4 className="font-bold text-lg mb-2 text-slate-900">{idea.title}</h4>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">{idea.concept}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs font-medium text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-orange-400 mr-2"></span>
                      Style: {idea.style}
                    </div>
                    <div className="flex items-center text-xs font-medium text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      Backing: {idea.recommendedBacking}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                        const target = document.getElementById('quote-details');
                        if (target) {
                            (target as HTMLTextAreaElement).value = `Based on AI Idea: ${idea.title}\nConcept: ${idea.concept}\nStyle: ${idea.style}`;
                            window.location.hash = 'quote';
                        }
                    }}
                    className="mt-6 w-full text-center text-xs font-bold text-orange-600 py-2 border border-orange-200 rounded-lg hover:bg-orange-100 transition"
                  >
                    Use This Concept
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
