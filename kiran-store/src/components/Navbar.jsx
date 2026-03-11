// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import logo from "../assets/raj.png";

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <nav className="bg-[#14532d] text-white sticky top-0 z-50 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">

//           {/* Left: Logo */}
//           <NavLink to="/" className="flex items-center flex-shrink-0">
//             <img
//               src={logo}
//               alt="Rajkumari Kirana Store"
//               className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
//             />
//           </NavLink>

//           {/* Center: Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="ढूंढें आटा, चावल, बिस्कुट, तेल..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white/10 backdrop-blur-sm border border-[#facc15]/30 rounded-full py-2.5 pl-5 pr-12 text-white placeholder-gray-300 focus:outline-none focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 transition-all"
//               />
//               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#facc15] text-[#14532d] p-2 rounded-full hover:bg-yellow-400 transition-colors">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Right: Navigation Icons & Links */}
//           <div className="flex items-center gap-1 md:gap-3">
//             {/* Desktop Navigation Links (hidden on mobile) */}
//             <div className="hidden lg:flex items-center gap-1 mr-2">
//               <NavLink to="/" className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#facc15] text-[#14532d]' : 'hover:bg-white/10'}`}>
//                 Home
//               </NavLink>
//               <NavLink to="/products" className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#facc15] text-[#14532d]' : 'hover:bg-white/10'}`}>
//                 Products
//               </NavLink>
//               <NavLink to="/categories" className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#facc15] text-[#14532d]' : 'hover:bg-white/10'}`}>
//                 Categories
//               </NavLink>
//             </div>

//             {/* Icons */}
//             <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </button>

//             <NavLink to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               <span className="absolute -top-1 -right-1 bg-[#facc15] text-[#14532d] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
//             </NavLink>

//             {/* Mobile menu button (visible on small screens) */}
//             <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar (visible only on mobile) */}
//         <div className="md:hidden pb-3">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="ढूंढें..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-white/10 backdrop-blur-sm border border-[#facc15]/30 rounded-full py-2 pl-5 pr-12 text-white placeholder-gray-300 focus:outline-none focus:border-[#facc15] text-sm"
//             />
//             <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#facc15] text-[#14532d] p-1.5 rounded-full">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Optional: Simple underline animation for active links */}
//       <style jsx>{`
//         .nav-link-active {
//           position: relative;
//         }
//         .nav-link-active::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background-color: #facc15;
//           border-radius: 2px;
//         }
//       `}</style>
//     </nav>
//   );
// }




import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import logo from "../assets/raj.png";
import Fuse from "fuse.js";
import { groceryProducts } from "../data/products";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Debounce ref
  const searchTimeoutRef = useRef(null);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
          if (res.ok) {
            const results = await res.json();
            setSearchResults(results);
          }
        } catch (error) {
          console.error("Search failed:", error);
        }
      }, 300); // Debounce for 300ms
    } else {
      setSearchResults([]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#14532d] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="Rajkumari Kirana Store"
              className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </NavLink>

          {/* Location Selector */}
          <div className="hidden lg:flex flex-col justify-center ml-4 cursor-pointer hover:bg-white/10 px-3 py-1.5 rounded-xl transition-colors">
            <span className="text-xs font-bold text-gray-300">Delivery in 10 min</span>
            <div className="flex items-center gap-1 text-sm font-bold">
              <span>Flat 402, Sunshine Apts...</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#facc15]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ढूंढें आटा, चावल, बिस्कुट, तेल..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-white/10 backdrop-blur-sm border border-[#facc15]/30 rounded-full py-2.5 pl-5 pr-12 text-white placeholder-gray-300 focus:outline-none focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 transition-all font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#facc15] text-[#14532d] p-2 rounded-full hover:bg-yellow-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* View Smart Search Results Dropdown */}
            {isSearchFocused && searchQuery.trim() !== "" && (
              <div className="absolute top-14 left-0 w-full bg-white text-black rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-96 overflow-y-auto">
                <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2">Smart Search Results</span>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                        navigate("/products");
                        // In a real app we might navigate to `/product/${product.id}`
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <div className="flex-1">
                        <p className="font-bold text-[#14532d]">{product.name}</p>
                        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      </div>
                      <div className="text-right pr-2">
                        <p className="font-bold text-[#14532d]">₹{product.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p className="font-medium">No products found for "{searchQuery}"</p>
                    <p className="text-sm mt-1">Try searching for keywords like "rice", "dal", or "oil"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">

            <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-[#facc15] text-[#14532d]" : "hover:bg-white/10"}`}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-[#facc15] text-[#14532d]" : "hover:bg-white/10"}`}>Products</NavLink>
            <NavLink to="/categories" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-[#facc15] text-[#14532d]" : "hover:bg-white/10"}`}>Categories</NavLink>

            {/* Cart Icon */}
            <NavLink to="/cart" className="relative p-2 ml-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#facc15] text-[#14532d] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#14532d] animate-bounce-once">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* If Logged In */}
            {user ? (
              <div className="flex items-center gap-2 relative group">
                <button className="px-3 py-2 ml-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 flex items-center gap-1">
                  Hi, {user.name ? user.name.split(" ")[0] : "User"}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-50 border border-gray-100">
                  <NavLink to="/profile" className="block px-4 py-3 text-sm font-bold hover:bg-gray-50 border-b border-gray-100">
                    👤 My Profile
                  </NavLink>
                  <NavLink to="/my-orders" className="block px-4 py-3 text-sm font-bold hover:bg-gray-50 border-b border-gray-100">
                    📦 My Orders
                  </NavLink>
                  <NavLink to="/admin" className="block px-4 py-3 text-sm font-bold hover:bg-gray-50 border-b border-gray-100">
                    👑 Admin Panel
                  </NavLink>
                  <NavLink to="/shopkeeper" className="block px-4 py-3 text-sm font-bold hover:bg-gray-50">
                    🏪 Partner Panel
                  </NavLink>
                </div>

                <button onClick={logout} className="px-3 py-2 rounded-xl text-sm font-medium bg-red-600/80 hover:bg-red-500 transition-colors backdrop-blur-sm ml-2">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={({ isActive }) => `px-4 py-2 ml-2 rounded-xl text-sm font-bold transition-colors bg-white/10 hover:bg-white/20 hover:text-[#facc15]`}>
                Login
              </NavLink>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}
