import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, CheckCircle2, Lock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const trustPoints = [
    {
      icon: CheckCircle2,
      title: 'Carefully Selected Catalog',
      description: 'Every product is evaluated for high daily utility, durable materials, and exceptional $15–$50 price-to-performance value.',
    },
    {
      icon: Truck,
      title: 'Reliable U.S. Shipping',
      description: 'Dispatched through trusted domestic carriers (USPS & UPS Ground). Free shipping on all qualifying U.S. orders over $45.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Hassle-Free Returns',
      description: 'Shop with complete peace of mind. We provide straightforward 30-day return windows for unworn, unused merchandise.',
    },
    {
      icon: Lock,
      title: 'PCI-Compliant Secure Checkout',
      description: 'Your payment data is processed using industry-standard tokenized 256-bit encryption. We never store raw card numbers.',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">
            Our Commitment
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Why Shop With ASH Global Commerce
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            A customer-first online retail experience founded on transparent pricing, verified product standards, and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
