import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          // Fetch similar products if needed, or filter from general list
          const allRes = await fetch("http://localhost:5000/api/products");
          const allData = await allRes.json();
          if (allRes.ok) {
            setSimilarProducts(allData.products
              .filter(p => p.category === data.category && p._id !== data._id)
              .slice(0, 5)
            );
          }
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14532d]"></div>
    </div>
  );

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || "Product Not Found"}</h2>
        <button onClick={() => navigate("/products")} className="bg-[#14532d] text-white px-6 py-2 rounded-xl font-bold">
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    }));
  };

  const dummyReviews = [
    { name: "Rahul Singh", date: "2 days ago", rating: 5, comment: "Very fresh and delivered exactly in 10 minutes. Will buy again!" },
    { name: "Priya Sharma", date: "1 week ago", rating: 4, comment: "Good quality, packaging was neat." },
    { name: "Amit Kumar", date: "2 weeks ago", rating: 5, comment: "Best daily essential you can get for this price, loved the service." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-12">

          {/* Breadcrumb */}
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap">
            <button onClick={() => navigate("/")} className="text-gray-500 hover:text-[#14532d] transition-colors">Home</button>
            <span className="text-gray-400">/</span>
            <button onClick={() => navigate("/products")} className="text-gray-500 hover:text-[#14532d] transition-colors">Products</button>
            <span className="text-gray-400">/</span>
            <span className="text-[#14532d] font-bold">{product.category}</span>
          </div>

          <div className="grid md:grid-cols-2 p-8 gap-12">

            {/* Product Image */}
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center relative min-h-[400px]">
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                In Stock
              </div>
              <img src={product.image} alt={product.name} className="w-full max-w-md object-contain rounded-xl hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">

              <div className="mb-2">
                <span className="bg-[#facc15]/20 text-[#14532d] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#facc15] text-xl">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-500 font-medium">(120 Reviews)</span>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <p className="text-4xl font-black text-[#14532d]">₹{product.price}</p>
                <p className="text-xl text-gray-400 line-through mb-1">₹{product.price + 20}</p>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Super quality, fresh {product.name.toLowerCase()} sourced directly for your daily needs. Packaged cleanly and delivered to your door in 10-30 minutes. Order now and enjoy the best prices in town!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-b border-gray-100 py-6 mb-8">

                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1 w-full sm:w-auto h-14">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:bg-gray-200 transition-colors font-bold text-xl shadow-sm"
                  >-</button>
                  <span className="w-14 text-center font-bold text-lg text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:bg-gray-200 transition-colors font-bold text-xl shadow-sm"
                  >+</button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full h-14 bg-[#14532d] hover:bg-[#0f4021] text-[#facc15] font-black py-2 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-[#14532d]/40 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xl tracking-wide">Add to Cart</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl drop-shadow-sm">⚡</span>
                  <p className="font-bold text-gray-800 text-lg">10 Min Delivery</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl drop-shadow-sm">🌱</span>
                  <p className="font-bold text-gray-800 text-lg">100% Fresh</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black text-[#14532d] tracking-tight">Similar Products</h2>
                <div className="h-1 w-20 bg-[#facc15] mt-2 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4">Customer Reviews</h2>

          <div className="grid md:grid-cols-1 gap-8">
            {dummyReviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#14532d] text-[#facc15] rounded-full flex items-center justify-center font-bold text-xl uppercase shadow-md">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-[#facc15] mb-3 text-lg">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
