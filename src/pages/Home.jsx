import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { HeritageWeavesBar } from '../components/HeritageWeavesBar';
import { WeaveShowcase } from '../components/WeaveShowcase';
import { ShopByCollection } from '../components/ShopByCollection';
import { OfferSection } from '../components/OfferSection';
import { BestSellersSection } from '../components/BestSellersSection';
import { NewArrivals } from '../components/NewArrivals';
import { ShopByPrice } from '../components/ShopByPrice';
import { VastraaEdit } from '../components/VastraaEdit';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <HeritageWeavesBar />
      <WeaveShowcase />
      <ShopByCollection />
      <OfferSection />
      <BestSellersSection />
      <NewArrivals />
      <ShopByPrice />
      <VastraaEdit />
      <AboutSection />
      <Footer />
    </motion.div>
  );
};
