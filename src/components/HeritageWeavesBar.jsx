import React from 'react';
import { ShieldCheck, Award, Truck, Video, Sparkles } from 'lucide-react';

export const HeritageWeavesBar = () => {
  return (
    <section className="bg-burgundy-deep text-ivory py-10 border-y border-gold/30 relative overflow-hidden">
      {/* Background Shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="p-4 rounded-2xl bg-burgundy/40 border border-gold/20 flex flex-col items-center">
            <Award className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif font-bold text-base text-gold-gradient">Honest Pricing</h4>
            <p className="text-xs text-ivory/70 mt-1">Direct from master weavers</p>
          </div>

          <div className="p-4 rounded-2xl bg-burgundy/40 border border-gold/20 flex flex-col items-center">
            <Video className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif font-bold text-base text-gold-gradient">360° Unboxing Trust</h4>
            <p className="text-xs text-ivory/70 mt-1">100% verified video guarantee</p>
          </div>

          <div className="p-4 rounded-2xl bg-burgundy/40 border border-gold/20 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif font-bold text-base text-gold-gradient">Heritage Weaves</h4>
            <p className="text-xs text-ivory/70 mt-1">Gadwal, Kanchi Pattu & Banarasi</p>
          </div>

          <div className="p-4 rounded-2xl bg-burgundy/40 border border-gold/20 flex flex-col items-center">
            <Truck className="w-8 h-8 text-gold mb-2" />
            <h4 className="font-serif font-bold text-base text-gold-gradient">Express Delivery</h4>
            <p className="text-xs text-ivory/70 mt-1">Insured Pan-India & Global shipping</p>
          </div>

        </div>
      </div>
    </section>
  );
};
