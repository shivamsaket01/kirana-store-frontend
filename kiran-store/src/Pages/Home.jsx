import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dukan from "../assets/dukan.png";
import ProductCard from "../components/ProductCard";
import { groceryProducts } from "../data/products";

// Banners
import pharmacyBanner from "../assets/pharmacy_banner.png";
import petCareBanner from "../assets/pet_care_banner.png";
import babyCareBanner from "../assets/baby_care_banner.png";

export default function Home() {
  const categories = [
    { title: "Soft Drinks & Mixers", img: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&auto=format&fit=crop&q=60" },
    { title: "Dairy, Bread & Eggs", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&auto=format&fit=crop&q=60" },
    { title: "Salt, Sugar & Jaggery", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60" },
    { title: "Chips & Crisps", img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=60" },
    { title: "Juices & Healthy Drinks", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60" },
    { title: "Tea, Coffee & More", img: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&auto=format&fit=crop&q=60" },
    { title: "Paan Corner", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60" },
    { title: "Bakery & Biscuits", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60" },
    { title: "Sweet Tooth", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60" },
    { title: "Breakfast Food", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60" },
    { title: "Atta, Rice & Dal", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60" },
    { title: "Masala & Oil", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60" },
    { title: "Sauces & Spreads", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60" },
    { title: "Chicken & Meat", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60" },
    { title: "Organic Living", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60" },
    { title: "Baby Care", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=60" },
    { title: "Pharma & Wellness", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&auto=format&fit=crop&q=60" },
    { title: "Cleaning", img: "https://images.unsplash.com/photo-1584820927498-cafe2c1c9c9b?w=500&auto=format&fit=crop&q=60" },
    { title: "Home & Office", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60" },
    { title: "Pet Care", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=60" },
  ];

  // Dummy testimonials
  const testimonials = [
    {
      name: "Pritti Sharma", location: "Gali No 5", text: "Rajkumari Didi always gives fresh items. Kids love the biscuits!", rating: 5, img: "https://images.unsplash.com/photo-1494790108777-766fd68f7d21?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Rajesh Kumar", location: "Main Bazar", text: "Buying from here for 10 years. Prices are fair and no adulteration.", rating: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Sunita Devi", location: "Azad Nagar", text: "Order on phone, delivered in 2 hours to home. Very convenient.", rating: 5, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Manoj Sahani", location: "Station Road", text: "The spices here are very aromatic. Famous in the whole neighborhood.", rating: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  // Products grouped by the 12 requested categories
  const categorySections = [
    { title: "Soft Drinks & Mixers", products: groceryProducts.filter(p => p.category === "Soft Drinks & Mixers") },
    { title: "Dairy, Bread & Eggs", products: groceryProducts.filter(p => p.category === "Dairy, Bread & Eggs") },
    { title: "Salt, Sugar & Jaggery", products: groceryProducts.filter(p => p.category === "Salt, Sugar & Jaggery") },
    { title: "Chips & Crisps", products: groceryProducts.filter(p => p.category === "Chips & Crisps") },
    { title: "Juices & Healthy Drinks", products: groceryProducts.filter(p => p.category === "Juices & Healthy Drinks") },
    { title: "Tea, Coffee & More", products: groceryProducts.filter(p => p.category === "Tea, Coffee & More") },
    { title: "Snacks & Munchies", products: groceryProducts.filter(p => p.category === "Snacks & Munchies") },
    { title: "Bakery & Biscuits", products: groceryProducts.filter(p => p.category === "Bakery & Biscuits") },
    { title: "Breakfast & Instant Food", products: groceryProducts.filter(p => p.category === "Breakfast & Instant Food") },
    { title: "Sweet Tooth", products: groceryProducts.filter(p => p.category === "Sweet Tooth") },
    { title: "Atta, Rice & Dal", products: groceryProducts.filter(p => p.category === "Atta, Rice & Dal") },
    { title: "Masala & Oil", products: groceryProducts.filter(p => p.category === "Masala & Oil") },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section – Local Shop Feel */}
      <section className="relative pt-12 pb-20 px-4 bg-gradient-to-b from-[#14532d] to-[#14532d]/90 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 bg-[#facc15] text-[#14532d] px-4 py-2 rounded-full mb-6 font-bold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#facc15]"></span>
              </span>
              Your Local Supermarket, Online
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Lightning Fast <br />
              <span className="text-[#facc15]">Grocery Delivery</span>
            </h1>
            <p className="text-gray-100 text-lg mb-8 max-w-lg">
              Fresh produce, daily essentials, and trusted brands delivered to your doorstep in 10-30 minutes.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-[#facc15] text-[#14532d] hover:bg-yellow-400 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-black/20">
                Start Shopping →
              </Link>
            </div>
          </div>

          {/* Shop Image / Owner Photo */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-[#facc15]/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-[40px] border border-white/20 max-w-sm">
              <img
                src={dukan}
                className="rounded-[30px] w-full h-80 object-cover mb-4"
                alt="Our Shop"
              />
              <h3 className="text-2xl font-bold text-white">Always Fresh, Always Fast</h3>
              <p className="text-[#facc15] font-semibold italic">"Quality you can trust."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Promotional Banners - BIG SIZES */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-[32px] aspect-[16/9] shadow-lg hover:shadow-xl transition-all">
            <img src={pharmacyBanner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Pharmacy" />
            <div className="absolute bottom-6 left-6 z-10">
              <Link to="/products" className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-black text-sm shadow-md hover:bg-gray-50 transition-colors">Order Now</Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[32px] aspect-[16/9] shadow-lg hover:shadow-xl transition-all">
            <img src={petCareBanner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Pet Care" />
            <div className="absolute bottom-6 left-6 z-10">
              <Link to="/products" className="bg-[#2d2d2d] text-white px-6 py-2.5 rounded-full font-black text-sm shadow-md hover:bg-black transition-colors">Order Now</Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[32px] aspect-[16/9] shadow-lg hover:shadow-xl transition-all">
            <img src={babyCareBanner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Baby Care" />
            <div className="absolute bottom-6 left-6 z-10">
              <Link to="/products" className="bg-[#2d2d2d] text-white px-6 py-2.5 rounded-full font-black text-sm shadow-md hover:bg-black transition-colors">Order Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Smaller & Denser */}
      <section className="py-8 px-4 max-w-7xl mx-auto border-b border-gray-100">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 sm:gap-4 md:gap-4">
          {categories.map((cat, i) => (
            <Link to="/products" key={i} className="group flex flex-col items-center">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#f3f9f5] border border-green-50/50 transition-all hover:shadow-sm">
                <img src={cat.img} className="w-full h-full object-cover p-1.5 transition-transform duration-500 group-hover:scale-110" alt={cat.title} />
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-gray-600 text-center leading-tight mt-1.5 line-clamp-2 h-6">{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Dynamic Category Sections */}
      {categorySections.map((section, idx) => (
        <section key={idx} className="py-8 px-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{section.title}</h2>
            <Link to="/products" className="text-green-600 font-bold text-sm hover:underline">see all</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5">
            {section.products.map((product) => (
              <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} />
            ))}
          </div>
        </section>
      ))}

      {/* Simple Footer Disclaimer */}
      <footer className="py-12 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm font-medium">© 2026 Kirana Store. Fast Grocery Delivery to your doorstep.</p>
        </div>
      </footer>
    </div>
  );
}