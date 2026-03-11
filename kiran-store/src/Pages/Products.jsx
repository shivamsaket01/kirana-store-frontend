import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

export default function Products() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");

  const categories = ["All", "Rice", "Vegetables", "Cold Drinks", "Snacks", "Oil", "Atta", "Dal", "Spices"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = new URL("http://localhost:5000/api/products");
        if (debouncedKeyword) url.searchParams.append("keyword", debouncedKeyword);
        if (activeCategory !== "All") url.searchParams.append("category", activeCategory);

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedKeyword, activeCategory]);

  // Apply filters locally for now (can be moved to API query params later if needed)
  let filteredProducts = products.filter(product => {
    if (activeCategory !== "All" && product.category !== activeCategory) return false;
    if (product.price > priceRange) return false;
    // Mock stock filter
    if (inStockOnly && product.countInStock === 0) return false;
    return true;
  });

  // Apply sorting
  if (sortBy === "price_low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14532d]"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
      Error: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">

      {/* Sidebar Filters Panel */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-between">
            Filters
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </h2>

          <div className="mb-8">
            <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest">Categories</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-full checked:border-green-600 transition-all cursor-pointer"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className={`text-sm transition-colors ${activeCategory === cat ? 'font-bold text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest">Max Price</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-green-700">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          <button
            onClick={() => { setActiveCategory("All"); setPriceRange(1000); setInStockOnly(false); setSortBy("popularity"); }}
            className="w-full py-3 text-xs font-black text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors uppercase tracking-widest"
          >
            Reset All
          </button>
        </div>
      </aside>

      {/* Main Product Grid */}
      <main className="flex-1">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for essentials (e.g. Rice, Milk, Oil)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-green-50 focus:border-[#14532d] transition-all text-lg"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {keyword && (
            <button
              onClick={() => setKeyword("")}
              className="absolute right-4 top-4.5 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-medium text-sm">
            Showing <span className="font-bold text-[#14532d]">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-gray-200 rounded-xl text-sm focus:ring-[#facc15] focus:border-[#facc15] py-2 px-3 bg-gray-50 font-bold text-[#14532d]"
            >
              <option value="popularity">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mb-6">Try adjusting your filters or search criteria to find what you're looking for.</p>
            <button
              onClick={() => { setActiveCategory("All"); setPriceRange(1000); }}
              className="bg-[#14532d] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#0f4021]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
