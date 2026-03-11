import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../store/cartSlice";

export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id, amount) => {
    dispatch(updateQuantity({ id, amount }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-3xl font-black text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any products to your cart yet. Discover fresh groceries and daily essentials now.</p>
        <Link to="/products" className="bg-[#14532d] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0f4021] transition-colors shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-[#14532d] mb-8 flex items-center gap-3">
          Your Cart 
          <span className="bg-[#facc15] text-[#14532d] text-sm px-3 py-1 rounded-full">{cartItems.length} items</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flow-root">
                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 p-2 bg-gray-50">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>

                      <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                            <Link to={`/product/${item.id}`} className="hover:text-[#14532d]">{item.name}</Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                        </div>
                        
                        <div className="flex flex-col items-center sm:items-end justify-between gap-4">
                          <p className="text-lg font-black text-[#14532d]">₹{item.totalPrice}</p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                              <button onClick={() => handleUpdateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-gray-50 font-bold">-</button>
                              <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                              <button onClick={() => handleUpdateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-gray-50 font-bold">+</button>
                            </div>
                            <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
              <h2 className="text-xl font-black text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Platform Fee</span>
                  <span className="font-medium text-gray-900">₹5</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-[#14532d]">₹{totalAmount + 5}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#facc15] hover:bg-yellow-400 text-[#14532d] font-black py-4 px-4 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                Proceed to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Safe & Secure Payments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
