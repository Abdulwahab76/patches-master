import React from "react";

import { Link } from "react-router-dom";

import { useQuote } from "../context/QuoteContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteSidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const { items, increaseQty, decreaseQty, removeItem } = useQuote();

  const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[430px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Quote Builder
            </h2>

            <p className="text-sm text-slate-500">
              {items.length} style(s) · {totalQty} pcs
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-4">
                🧵
              </div>

              <h3 className="font-bold text-slate-900 text-lg">
                No styles selected
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Add patch styles to build your project.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest font-black text-orange-600 mb-1">
                      {item.category}
                    </div>

                    <h4 className="font-bold text-slate-900">{item.name}</h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white font-bold"
                      >
                        -
                      </button>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white font-bold"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-sm text-red-500 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6">
            <Link
              to="/quote"
              onClick={onClose}
              className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-4 rounded-2xl font-black text-center block shadow-lg"
            >
              Continue Project Quote
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default QuoteSidebar;
