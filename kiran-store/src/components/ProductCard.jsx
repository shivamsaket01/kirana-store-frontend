export default function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400?text=Product";
          }}
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          ₹ {price}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-1 truncate" title={name}>
          {name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">Pack of 1</p>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
          <span>Add</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
