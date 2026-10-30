import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CategoryGrid } from './components/CategoryGrid.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { WhatsAppButton } from './components/WhatsAppButton.tsx';
import { AppBottomNav } from './components/AppBottomNav.tsx';
import { Footer } from './components/Footer.tsx';
import { OfflineIndicator } from './components/ErrorPages.tsx';
import { Category, Product } from './types.ts';
import { fetchCategories, fetchProducts } from './services/api.ts';

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  // Load catalog data
  const loadData = useCallback(async () => {
    try {
      const [cats, prods] = await Promise.all([fetchCategories(), fetchProducts()]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load static catalog data:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white pb-16 lg:pb-0">
      <OfflineIndicator />

      {/* Navigation Header (Responsive with unified layout for Desktop, Tablet, and Mobile) */}
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <main className="flex-1">
        {/* Full-View Cinematic Hero Section */}
        <HeroSection
          onExploreRack={() => {
            const el = document.getElementById('category-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBrowseCatalog={() => {
            const el = document.getElementById('product-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Display Rack Category Grid: Interior, Exterior, and Car Care */}
        <CategoryGrid
          categories={categories}
          onSelectCategory={handleCategorySelect}
          isLocked={false}
        />

        {/* Product Catalog with Scrolling Rack Tool & Reduced Footprint Cards */}
        <ProductCatalog
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuickView={prod => setActiveProductModal(prod)}
          isLocked={false}
        />

        {/* Technical Consultation & Kumbakonam Workshop Desk */}
        <ContactSection />
      </main>

      {/* Workshop Footer */}
      <Footer
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />

      {/* Floating WhatsApp Quick Consultation Launcher */}
      <WhatsAppButton />

      {/* Native-style App Bottom Navigation Bar for Mobile and Tablet Views */}
      <AppBottomNav onSelectCategory={handleCategorySelect} />

      {/* Product Detail & Fitment Modal */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />
    </div>
  );
}
