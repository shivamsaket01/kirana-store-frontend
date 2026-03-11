import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form states
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("Now (10-30 mins)");
  const [payment, setPayment] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, send back
  if (cartItems.length === 0 && step !== 4) {
    navigate("/cart");
    return null;
  }

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const isOnline = payment === "UPI" || payment === "Card Payment";

      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          priceAtPurchase: item.price
        })),
        totalAmount: totalAmount + 5,
        paymentMethod: isOnline ? "Online" : "COD",
        deliveryAddress: {
          street: address,
          city: "User City",
          zip: "000000"
        }
      };

      // 1. Create DB Order (Status: Pending)
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const createdOrder = await res.json();
      if (!res.ok) throw new Error(createdOrder.message);

      if (isOnline) {
        // 2. Load Razorpay
        const isLoaded = await loadRazorpay();
        if (!isLoaded) throw new Error("Razorpay SDK failed to load");

        // 3. Create Razorpay Order in Backend
        const payRes = await fetch("http://localhost:5000/api/payment/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ amount: orderData.totalAmount })
        });
        const rzpOrder = await payRes.json();

        // 4. Open Razorpay Checkout
        const options = {
          key: "rzp_test_placeholder", // In prod, use process.env.REACT_APP_RAZORPAY_KEY
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          name: "Kirana Store",
          description: "Payment for Order #" + createdOrder._id,
          order_id: rzpOrder.id,
          handler: async (response) => {
            // 5. Verify Payment
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                ...response,
                orderId: createdOrder._id
              })
            });

            if (verifyRes.ok) {
              setStep(4);
              dispatch(clearCart());
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            contact: phone,
          },
          theme: { color: "#14532d" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Cash on Delivery Success
        setStep(4);
        dispatch(clearCart());
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 1: Address
  const renderStep1 = () => (
    <form onSubmit={handleNext} className="space-y-6">
      <h2 className="text-2xl font-black text-gray-800 mb-4">Delivery Details</h2>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter 10-digit mobile number"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Complete Address</label>
        <textarea
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House No, Building, Street, Area, Landmark"
          rows="3"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none transition-all"
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-[#14532d] hover:bg-[#0f4021] text-white font-bold py-4 rounded-xl transition-colors">
        Continue to Delivery Slot
      </button>
    </form>
  );

  // Step 2: Slot
  const renderStep2 = () => (
    <form onSubmit={handleNext} className="space-y-6">
      <h2 className="text-2xl font-black text-gray-800 mb-4">Select Delivery Slot</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["Now (10-30 mins)", "Today (2 PM - 4 PM)", "Today (5 PM - 7 PM)", "Tomorrow Morning"].map(s => (
          <label key={s} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${slot === s ? 'border-[#14532d] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="slot"
                value={s}
                checked={slot === s}
                onChange={() => setSlot(s)}
                className="w-5 h-5 text-[#14532d] focus:ring-[#14532d] rounded-full"
              />
              <div>
                <span className="block font-bold text-gray-800">{s}</span>
                {s.includes("Now") && <span className="text-xs font-bold text-green-600">Fastest Delivery</span>}
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-xl transition-colors">
          Back
        </button>
        <button type="submit" className="w-2/3 bg-[#14532d] hover:bg-[#0f4021] text-white font-bold py-4 rounded-xl transition-colors">
          Continue to Payment
        </button>
      </div>
    </form>
  );

  // Step 3: Payment
  const renderStep3 = () => (
    <form onSubmit={handlePlaceOrder} className="space-y-6">
      <h2 className="text-2xl font-black text-gray-800 mb-4">Payment Method</h2>
      <div className="space-y-4">
        {["UPI", "Card Payment", "Cash on Delivery"].map((p, idx) => (
          <label key={p} className={`block border-2 rounded-xl p-4 cursor-pointer transition-all ${payment === p || (p === "Cash on Delivery" && payment === "COD") ? 'border-[#14532d] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value={p === "Cash on Delivery" ? "COD" : p}
                checked={payment === p || payment === (p === "Cash on Delivery" ? "COD" : "")}
                onChange={() => setPayment(p === "Cash on Delivery" ? "COD" : p)}
                className="w-5 h-5 text-[#14532d] focus:ring-[#14532d] rounded-full"
              />
              <span className="block font-bold text-gray-800">{p}</span>
              {p === "UPI" && <span className="ml-auto text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">Recommended</span>}
            </div>
            {(payment === p && p !== "Cash on Delivery") && (
              <div className="mt-4 pl-8">
                <p className="text-sm text-gray-500 italic">You will be redirected securely to Razorpay checkout...</p>
              </div>
            )}
          </label>
        ))}
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={() => setStep(2)} className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-xl transition-colors" disabled={isProcessing}>
          Back
        </button>
        <button type="submit" disabled={isProcessing} className="w-2/3 bg-[#facc15] hover:bg-yellow-400 text-[#14532d] font-black py-4 rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center">
          {isProcessing ? 'Processing secure payment...' : `Pay ₹${totalAmount + 5}`}
        </button>
      </div>
    </form>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
        🎉
      </div>
      <h2 className="text-3xl font-black text-[#14532d] mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">Your order has been successfully placed. It will be delivered in {slot}. Order ID: #KIR-{Math.floor(Math.random() * 10000)}</p>
      <button onClick={() => navigate("/")} className="bg-[#14532d] hover:bg-[#0f4021] text-white font-bold py-3 px-8 rounded-xl transition-colors">
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Main Checkout Area */}
        <div className="flex-1">
          {step < 4 && (
            <div className="mb-8 flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full hidden sm:block"></div>
              <div className="absolute top-1/2 left-0 h-1 bg-[#14532d] -z-10 -translate-y-1/2 rounded-full transition-all duration-500 hidden sm:block" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
              {[1, 2, 3].map(s => (
                <div key={s} className={`flex items-center gap-2 bg-gray-50 px-2 relative sm:static ${step === s ? 'text-[#14532d]' : step > s ? 'text-[#14532d]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === s ? 'bg-[#14532d] text-white ring-4 ring-green-100' : step > s ? 'bg-[#14532d] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > s ? '✓' : s}
                  </div>
                  <span className="font-bold text-sm hidden sm:block">{s === 1 ? 'Address' : s === 2 ? 'Slot' : 'Payment'}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        {step < 4 && (
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-black text-gray-800 mb-4">Summary</h3>
              <div className="divide-y divide-gray-100 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="py-2 flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">{item.quantity} x {item.name}</span>
                    <span className="font-bold text-gray-800">₹{item.totalPrice}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item Total</span>
                  <span className="font-medium text-gray-800">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Platform Fee</span>
                  <span className="font-medium text-gray-800">₹5</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center bg-green-50 rounded-xl p-3">
                <span className="font-bold text-gray-800">To Pay</span>
                <span className="text-xl font-black text-[#14532d]">₹{totalAmount + 5}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
