// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./Pages/Home";
// import Products from "./Pages/Products";
// import ProductDetails from "./Pages/ProductDetails";
// import Categories from "./Pages/Categories";
// import Cart from "./Pages/Cart";
// import Checkout from "./Pages/Checkout";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";

// import MyOrders from "./Pages/MyOrders";

// // Context
// import AuthProvider from "./context/AuthContext";

// export default function App() {
//   return (
//     <AuthProvider>
//       <Navbar />

//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Auth Pages */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* User Protected Pages */}
//         <Route path="/profile" element={<UserProfile />} />
//         <Route path="/my-orders" element={<MyOrders />} />

//         {/* Dashboards */}
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
//       </Routes>

//       <Footer />
//     </AuthProvider>
//   );
// }


import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyOrders from "./Pages/MyOrders";

// Auth Pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import UserProfile from "./Pages/UserProfile";
import AdminDashboard from "./Pages/AdminDashboard";
import ShopkeeperDashboard from "./Pages/ShopkeeperDashboard";

// Context
import AuthProvider from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Navbar />

        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User Protected Pages */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
        </Routes>

        <Footer />
      </ErrorBoundary>
    </AuthProvider>
  );
}