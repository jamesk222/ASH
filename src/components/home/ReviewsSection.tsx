import React from 'react';
import { DEMO_REVIEWS } from '../../data/products';
import { Star, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#faf9f6] border-t border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">
              Customer Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Verified Buyer Experiences
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>4.85 / 5.0 Average Rating across 1,800+ U.S. Orders</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400">{review.date}</span>
                </div>

                <h4 className="font-semibold text-xs text-neutral-900 mb-1.5 leading-snug">
                  "{review.title}"
                </h4>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {review.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="font-medium text-neutral-800">{review.author}</span>
                {review.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
