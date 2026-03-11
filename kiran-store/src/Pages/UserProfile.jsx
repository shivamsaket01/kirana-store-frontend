import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const orders = [
    { id: "ORD-8821", date: "Oct 24, 2024", total: "₹450", status: "Delivered", items: "Aashirvaad Atta (5kg), Amul Butter..." },
    { id: "ORD-8710", date: "Oct 18, 2024", total: "₹1,200", status: "Delivered", items: "Maggi (4x), Surf Excel (1kg)..." },
    { id: "ORD-8655", date: "Oct 10, 2024", total: "₹320", status: "Cancelled", items: "Fortune Oil (1L)" },
  ];

  const addresses = [
    { id: 1, type: "Home", text: "Flat 402, Sunshine Apartments, Gali No 5, Maihar, MP", isDefault: true },
    { id: 2, type: "Work", text: "Tech Park Phase 1, Office Block A, Maihar, MP", isDefault: false },
  ];

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        <button onClick={() => navigate("/login")} className="bg-[#14532d] text-white px-6 py-2 rounded-xl font-bold">Login Now</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-6 bg-[#14532d] text-white text-center">
              <div className="w-20 h-20 bg-white text-[#14532d] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h2 className="text-xl font-black">{user.name || "User"}</h2>
              <p className="text-green-200 text-sm mt-1">+91 9876543210</p>
            </div>
            <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'orders' ? 'bg-gray-100 text-[#14532d]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Order History
              </button>
              <button 
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'addresses' ? 'bg-gray-100 text-[#14532d]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'profile' ? 'bg-gray-100 text-[#14532d]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Profile Details
              </button>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
            {activeTab === "orders" && (
              <div>
                <h3 className="text-2xl font-black text-gray-800 mb-6">Order History</h3>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-800">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-1">{order.items}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <p className="font-black text-[#14532d]">{order.total}</p>
                        <button onClick={()=>navigate('/track-order')} className="text-sm font-bold text-[#facc15] bg-[#14532d] px-4 py-2 rounded-lg hover:bg-[#0f4021] transition-colors">
                          Track / Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-gray-800">Saved Addresses</h3>
                  <button className="text-sm font-bold text-[#14532d] hover:underline">+ Add New</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="border border-gray-200 rounded-2xl p-4 relative">
                      {addr.isDefault && <span className="absolute top-4 right-4 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Default</span>}
                      <h4 className="font-bold text-gray-800 mb-2">{addr.type}</h4>
                      <p className="text-sm text-gray-600 mb-4">{addr.text}</p>
                      <div className="flex gap-2">
                        <button className="text-xs font-bold text-[#14532d] hover:underline">Edit</button>
                        <button className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h3 className="text-2xl font-black text-gray-800 mb-6">Profile Details</h3>
                <form className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue={user.name || ""} className="w-full border-gray-300 rounded-xl px-4 py-2 focus:ring-[#facc15] focus:border-[#facc15]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email || ""} className="w-full border-gray-300 rounded-xl px-4 py-2 focus:ring-[#facc15] focus:border-[#facc15]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+91 9876543210" className="w-full border-gray-300 rounded-xl px-4 py-2 focus:ring-[#facc15] focus:border-[#facc15]" />
                  </div>
                  <button type="button" className="bg-[#facc15] hover:bg-yellow-400 text-[#14532d] font-black py-3 px-6 rounded-xl transition-colors mt-4">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
