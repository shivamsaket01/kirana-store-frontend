import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OrderTracking() {
  const [progress, setProgress] = useState(0); // 0, 1, 2, 3
  
  // Simulate tracking progress over time for demo purposes
  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(1), 2000);
    const timer2 = setTimeout(() => setProgress(2), 5000);
    const timer3 = setTimeout(() => setProgress(3), 8000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  const steps = [
    { title: "Order Accepted", desc: "Your order is confirmed", icon: "✓", color: "bg-blue-500" },
    { title: "Packed", desc: "Items packed at store", icon: "📦", color: "bg-yellow-500" },
    { title: "On the way", desc: "Arriving in 8 mins", icon: "🚲", color: "bg-orange-500" },
    { title: "Delivered", desc: "Successfully delivered", icon: "🎉", color: "bg-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-2xl w-full">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Track Order</h1>
            <p className="text-gray-500 font-medium">Order ID: #ORD-8821</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Estimated Arrival</p>
            <p className="text-4xl font-black text-[#14532d]">
              {progress === 3 ? "Delivered" : "10-14 Min"}
            </p>
          </div>
        </div>

        {/* Tracking Map / Map Placeholder */}
        <div className="bg-gray-200 rounded-3xl h-64 mb-6 relative overflow-hidden border border-gray-100 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=24.26,80.75&zoom=14&size=800x400&maptype=roadmap&markers=color:green%7C24.26,80.75&style=feature:poi|visibility:off')] opacity-40 mix-blend-multiply rounded-3xl"></div>
          
          <div className="relative z-10 bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white text-center">
            <span className="text-3xl mb-2 block animate-bounce">{steps[progress].icon}</span>
            <p className="font-black text-gray-800">{steps[progress].title}</p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-6">
          <h2 className="text-xl font-black text-gray-800 mb-8">Delivery Status</h2>
          
          <div className="relative">
            {/* The line connecting nodes */}
            <div className="absolute left-6 top-8 bottom-8 w-1 bg-gray-100 rounded-full z-0"></div>
            <div 
              className="absolute left-6 top-8 w-1 bg-[#14532d] rounded-full z-0 transition-all duration-1000"
              style={{ height: progress === 0 ? '0%' : progress === 3 ? '100%' : `${(progress / 3) * 100}%`, transform: 'translateY(16px)' }}
            ></div>

            <div className="space-y-12 relative z-10">
              {steps.map((step, idx) => {
                const isCompleted = progress >= idx;
                const isCurrent = progress === idx;
                
                return (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-md ${
                      isCompleted ? 'bg-[#14532d] text-white ring-4 ring-[#facc15]/30' : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? '✓' : idx + 1}
                    </div>
                    <div className={`mt-2 transition-all duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                      <h3 className={`text-lg font-black ${isCurrent ? 'text-[#14532d]' : 'text-gray-800'}`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details Mini */}
        <div className="bg-[#14532d] text-white rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-xs text-green-200 font-bold uppercase tracking-wider mb-1">Delivering to</p>
            <p className="font-bold">Home: Flat 402, Sunshine Apts, Maihar</p>
          </div>
          <Link to="/profile" className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#14532d] font-black py-3 px-6 rounded-xl transition-colors shadow-lg text-center">
            View Order
          </Link>
        </div>

      </div>
    </div>
  );
}
