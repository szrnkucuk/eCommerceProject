import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/clientReducer";
import axiosInstance from "./api/axiosInstance";



import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import CategoryProducts from "./pages/CategoryProducts";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

function App() {
  const dispatch = useDispatch();
   useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token) axiosInstance.defaults.headers.common["Authorization"] = token;
    if (userStr) {
      try { dispatch(setUser(JSON.parse(userStr))); } catch {}
    }
  }, [dispatch]);


  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop/category/:slug" element={<CategoryProducts />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ProtectedRoute><CreateOrderPage /></ProtectedRoute>} /> 
          <Route path="/order/success/:id" element={<OrderSuccessPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
