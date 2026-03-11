import { useState } from "react";

export default function ShopkeeperDashboard() {
  const [activeTab, setActiveTab] = useState("new_orders");

  // Mock Data
  const orders = {
    new_orders: [
      { id: "#205", items: "Basmati Rice (2kg), Fortune Oil (1L)", time: "2 Mins Ago", address: "Gali No 5, Maihar", total: "₹330", status: "Pending" },
      { id: "#206", items: "Maggi (4), Tata Salt (1kg)", time: "5 Mins Ago", address: "Station Road", total: "₹85", status: "Pending" },
    ],
    processing: [
      { id: "#202", items: "Aashirvaad Atta (5kg)", time: "15 Mins Ago", address: "Azad Nagar", total: "₹240", status: "Packing" },
    ],
    completed: [
      { id: "#201", items: "Sprite (2L), Lays (2)", time: "1 Hour Ago", address: "Main Market", total: "₹110", status: "Delivered" },
    ]
  };

  const handleAction = (orderId, newStatus) => {
    // Mock action - would typically trigger API call and state update
    alert(`Order ${orderId} marked as ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-3xl shadow-sm border border-gray-100 hidden md:flex flex-col h-[calc(100vh-8rem)] sticky top-24 mr-6">
        <div className="p-6 border-b border-gray-100 bg-[#facc15]/20 rounded-t-3xl">
          <h2 className="text-xl font-black text-[#14532d]">Rajkumari Kirana</h2>
          <p className="text-xs text-[#14532d] font-bold">Partner Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {["new_orders", "processing", "completed", "inventory"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold capitalize transition-colors flex justify-between items-center ${
                activeTab === tab ? "bg-[#14532d] text-white shadow-md cursor-default" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{tab.replace("_", " ")}</span>
              {tab === "new_orders" && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">2</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-800 capitalize">{activeTab.replace("_", " ")}</h1>
            <p className="text-gray-500">Manage incoming requests and deliveries.</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase">Today's Sales</p>
            <p className="text-xl font-black text-[#14532d]">₹1,240</p>
          </div>
        </div>

        {/* Order Cards grid */}
        {activeTab !== "inventory" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders[activeTab]?.map((order, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black text-gray-800">Order {order.id}</h3>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{order.time}</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-1">Items:</p>
                    <p className="text-sm text-gray-600">{order.items}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Delivery Address:</p>
                    <p className="text-sm font-bold text-gray-800">{order.address}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                    <p className="text-lg font-black text-[#14532d]">{order.total}</p>
                  </div>
                  
                  {activeTab === "new_orders" && (
                    <div className="flex gap-2">
                      <button onClick={()=>handleAction(order.id, "Rejected")} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors">Reject</button>
                      <button onClick={()=>handleAction(order.id, "Accepted")} className="bg-[#14532d] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#0f4021] shadow-lg transition-colors">Accept</button>
                    </div>
                  )}

                  {activeTab === "processing" && (
                    <button onClick={()=>handleAction(order.id, "Out for Delivery")} className="bg-[#facc15] text-[#14532d] px-6 py-2 rounded-xl font-bold hover:bg-yellow-400 shadow-lg transition-colors">Dispatch</button>
                  )}

                  {activeTab === "completed" && (
                     <span className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl">✓ Delivered</span>
                  )}
                </div>
              </div>
            ))}
            
            {(!orders[activeTab] || orders[activeTab].length === 0) && (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
                <p className="text-4xl mb-4">📭</p>
                <h3 className="text-lg font-bold text-gray-800">No orders here</h3>
                <p className="text-gray-500 text-sm">You are all caught up.</p>
              </div>
            )}
          </div>
        ) : (
           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 p-12 text-center text-gray-500 italic">
               Inventory Management features coming soon.
           </div>
        )}

      </div>
    </div>
  );
}
