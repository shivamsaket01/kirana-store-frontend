import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ id, name, price, image }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ id, name, price, image, quantity: 1 }));
  };

  // Helper to extract weight/quantity from name (e.g., "Basmati Rice 1kg" -> "1kg")
  const weightMatch = name.match(/(\d+\s*(kg|g|ml|l|pcs|pc|units|unit|pack|pk))/i);
  const weight = weightMatch ? weightMatch[0] : "1 unit";
  const displayName = name.replace(weight, "").trim();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full relative p-2">
      {/* Invisible link for navigating to details */}
      <Link to={`/product/${id}`} className="absolute inset-0 z-0"></Link>

      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center mb-1">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400?text=Product";
          }}
        />
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col flex-1 relative z-10 pointer-events-none">
        {/* Delivery Badge - Blinkit Style */}
        <div className="bg-gray-50 flex items-center gap-1 w-fit px-1 py-0.5 rounded mb-1.5 border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">16 MINS</span>
        </div>

        <div className="mb-1.5">
          <h3 className="font-bold text-gray-900 text-[11px] leading-tight mb-0.5 line-clamp-2 min-h-[30px]" title={name}>
            {displayName}
          </h3>
          <p className="text-[10px] text-gray-400 font-medium">{weight}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pointer-events-auto gap-1">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-900">₹{price}</span>
            <span className="text-[9px] text-gray-400 line-through">₹{Math.round(price * 1.2)}</span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); handleAdd(); }}
            className="bg-white hover:bg-green-600 hover:text-white text-green-700 border border-green-200 font-black text-[10px] py-1 px-3 rounded-lg transition-all duration-200"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
