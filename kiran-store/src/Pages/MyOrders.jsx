import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function MyOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/orders/my-orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchMyOrders();
    }, [user]);

    const getStatusProgress = (status) => {
        const statuses = ["Processing", "Preparing", "Packed", "Out for Delivery", "Delivered"];
        const index = statuses.indexOf(status);
        return ((index + 1) / statuses.length) * 100;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14532d]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-800">My Orders</h1>
                    <p className="text-gray-500">History and live tracking of your purchases.</p>
                </div>

                <div className="space-y-6">
                    {orders.length > 0 ? orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="font-black text-gray-800">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="font-black text-[#14532d] text-xl">₹{order.totalAmount}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Timeline Progress */}
                                <div className="mb-8 mt-4">
                                    <div className="flex justify-between mb-2">
                                        {["Processing", "Packed", "Out for Delivery", "Delivered"].map((s, i) => (
                                            <span key={i} className={`text-[10px] sm:text-xs font-black uppercase tracking-tighter ${getStatusProgress(order.orderStatus) >= getStatusProgress(s) ? 'text-[#14532d]' : 'text-gray-300'
                                                }`}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#14532d] transition-all duration-1000 shadow-[0_0_10px_rgba(20,83,45,0.3)]"
                                            style={{ width: `${getStatusProgress(order.orderStatus)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-800 mb-3">Items</h4>
                                        <ul className="space-y-3">
                                            {order.items.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.quantity} x ₹{item.price}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800 mb-3">Delivery To</h4>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                {order.deliveryAddress.houseNo}, {order.deliveryAddress.street}<br />
                                                {order.deliveryAddress.city}, {order.deliveryAddress.pinCode}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                                            <span className="text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className={`px-3 py-1 rounded-full font-black ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-2">No orders found</h3>
                            <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't placed any orders yet. Start shopping to see them here!</p>
                            <button onClick={() => window.location.href = '/products'} className="bg-[#14532d] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-green-100">
                                Go to Shop
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
