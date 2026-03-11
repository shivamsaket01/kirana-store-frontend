import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dailySales, setDailySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [cityStats, setCityStats] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch Stats
        const statsRes = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const statsData = await statsRes.json();

        if (statsRes.ok) {
          setStats([
            { title: "Total Revenue", value: `₹${statsData.totalRevenue || 0}`, trend: "+12%", color: "text-green-600" },
            { title: "Total Orders", value: statsData.totalOrders || 0, trend: "+5%", color: "text-blue-600" },
            { title: "Active Users", value: statsData.totalUsers || 0, trend: "+8%", color: "text-purple-600" },
            { title: "Total Products", value: statsData.totalProducts || 0, trend: "+2%", color: "text-gray-600" },
          ]);
          setDailySales(statsData.dailySales || []);
        }

        // Fetch Top Products
        const topRes = await fetch("http://localhost:5000/api/admin/top-products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (topRes.ok) setTopProducts(await topRes.json());

        // Fetch City Stats
        const cityRes = await fetch("http://localhost:5000/api/admin/orders-by-city", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (cityRes.ok) setCityStats(await cityRes.json());

        // Fetch Recent Orders
        const ordersRes = await fetch("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersData = await ordersRes.json();

        if (ordersRes.ok) {
          setRecentOrders(ordersData.map(order => ({
            id: `#${order._id.substring(order._id.length - 8).toUpperCase()}`,
            customer: order.user?.name || "Guest",
            amount: `₹${order.totalAmount}`,
            status: order.orderStatus,
            date: new Date(order.createdAt).toLocaleDateString()
          })));
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "admin") {
      fetchAdminData();
    } else if (user) {
      setLoading(false);
      setError("Unauthorized access. Admin only.");
    }
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14532d]"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-600 font-bold p-8 text-center bg-white rounded-3xl m-8 border border-red-100 shadow-xl">
      <div className="max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-black mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={() => window.location.href = "/"} className="bg-[#14532d] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-100 hover:scale-105 transition-transform">
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-3xl shadow-sm border border-gray-100 hidden md:flex flex-col h-[calc(100vh-8rem)] sticky top-24 mr-6">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#14532d]">Admin Panel</h2>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {["overview", "analytics", "orders", "products", "users", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold capitalize transition-colors ${activeTab === tab ? "bg-[#14532d] text-white shadow-md cursor-default" : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 capitalize">{activeTab} Panel</h1>
          <p className="text-gray-500">Manage your Kirana Store {activeTab} and operations.</p>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.title}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black text-gray-800">{stat.value}</h3>
                    <span className={`text-sm font-bold ${stat.color} bg-gray-50 px-2 py-1 rounded-lg`}>{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-gray-800">Recent Platform Orders</h3>
                <button className="text-sm font-bold text-[#14532d] hover:underline">View All →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                      <th className="p-4 font-bold border-b border-gray-100">Order ID</th>
                      <th className="p-4 font-bold border-b border-gray-100">Customer</th>
                      <th className="p-4 font-bold border-b border-gray-100">Value</th>
                      <th className="p-4 font-bold border-b border-gray-100">Status</th>
                      <th className="p-4 font-bold border-b border-gray-100">Time / Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-bold text-gray-800">{order.id}</td>
                        <td className="p-4 text-gray-600">{order.customer}</td>
                        <td className="p-4 font-bold text-[#14532d]">{order.amount}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{order.date}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500 italic">No orders found yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Daily Revenue Chart */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-800 mb-6">Revenue Trend (Last 7 Days)</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailySales}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <Tooltip
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                      />
                      <Line type="monotone" dataKey="total" stroke="#14532d" strokeWidth={4} dot={{ r: 6, fill: '#14532d' }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* City Distribution */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-800 mb-6">Orders by City</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cityStats}>
                      <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="orderCount" fill="#facc15" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                🔥 Top Selling Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#facc15] transition-colors">
                    <img src={product.image} className="w-20 h-20 object-contain mb-3 rounded-lg bg-white p-2" alt={product.name} />
                    <h4 className="font-bold text-gray-800 line-clamp-1">{product.name}</h4>
                    <p className="text-sm text-gray-500 font-bold mb-2">₹{product.price}</p>
                    <div className="bg-[#14532d] text-white text-[10px] font-black px-2 py-1 rounded-full">
                      {product.totalSold} SOLD
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Product Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-6">Add New Product</h3>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const productData = {
                name: formData.get("name"),
                price: Number(formData.get("price")),
                category: formData.get("category"),
                image: formData.get("image"),
                brand: formData.get("brand"),
                countInStock: Number(formData.get("stock")),
                description: formData.get("description")
              };

              try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/products", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify(productData)
                });
                if (res.ok) {
                  alert("Product added successfully!");
                  e.target.reset();
                } else {
                  const data = await res.json();
                  alert(`Error: ${data.message}`);
                }
              } catch (err) {
                alert(`Error: ${err.message}`);
              }
            }}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                <input name="name" required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]" placeholder="e.g. Basmati Rice" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input name="price" type="number" required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]" placeholder="450" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                  <input name="stock" type="number" required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]" placeholder="100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select name="category" required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]">
                  <option value="Rice">Rice</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Cold Drinks">Cold Drinks</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Oil">Oil</option>
                  <option value="Atta">Atta</option>
                  <option value="Dal">Dal</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                <input name="image" required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]" placeholder="https://example.com/image.jpg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Brand</label>
                <input name="brand" required className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]" placeholder="e.g. Fortune" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="3" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-[#facc15] focus:border-[#facc15]" placeholder="Product details..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#14532d] text-white py-3 rounded-xl font-bold hover:bg-[#0f3a22] transition-colors shadow-lg shadow-green-100">
                Save Product
              </button>
            </form>
          </div>

          {/* Product Quick List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-6">Existing Products</h3>
            <p className="text-gray-500 italic">Product list management coming soon...</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
