// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { User as UserIcon, Search, ShoppingCart, Heart, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import logoImg from "../assets/logo.png";
import { selectCartCount } from "../redux/cartReducer";
import { setUser } from "../redux/clientReducer";
import { logout } from "../redux/thunks";
import axiosInstance from "../api/axiosInstance";
import { verifyToken } from "../redux/thunks";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const whole = useSelector((s)=>s);
  console.log("STATE->", whole);
  const user = useSelector((s) => s.client.user);
  const cartCount = useSelector(selectCartCount) || 0;

  useEffect(() => {
  const token = localStorage.getItem("token");
  const raw = localStorage.getItem("user");

  if (token) axiosInstance.defaults.headers.common["Authorization"] = token;

  if (!user && raw) {                           
    try { dispatch(setUser(JSON.parse(raw))); } catch {}
  } else if (!user && token && !raw) {          
    dispatch(verifyToken());
  }
}, [user, dispatch]);

  const categories = [
    { name: "Fruits & Vegetables", slug: "fruits" },
    { name: "Meat & Chicken", slug: "meat" },
    { name: "Snacks", slug: "snacks" },
    { name: "Bakery & Patisserie", slug: "bakery" },
    { name: "Drinks", slug: "drinks" },
  ];

  const handleAuthClick = () => {
    if (!user) {
      const from = `${location.pathname}${location.search}${location.hash}`;
      navigate("/login", { state: { from } });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-yellow-300 relative">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoImg} alt="Sezerin Grocery Shop" className="w-[170px] object-contain" />
        </div>

        <div className="flex gap-10 text-[16px] font-semibold relative">
          <NavLink to="/" className="hover:text-blue-500 transition">Home</NavLink>

          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button onClick={() => navigate("/shop")} className="flex items-center gap-1 hover:text-blue-500 transition">
              Shop <ChevronDown size={18} />
            </button>

            {showDropdown && (
              <div className="absolute z-50 bg-white shadow-lg rounded-md p-4 top-full left-0">
                {categories.map((cat) => (
                  <div
                    key={cat.slug}
                    onClick={() => navigate(`/shop/category/${cat.slug}`)}
                    className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/about" className="hover:text-blue-500 transition">About</NavLink>
          <NavLink to="/contact" className="hover:text-blue-500 transition">Contact</NavLink>
        </div>

        <div className="flex items-center gap-6">
          <Search className="text-blue-500 cursor-pointer hover:text-blue-600 transition" />
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart className="text-blue-500 hover:text-blue-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <Heart className="text-blue-500 cursor-pointer hover:text-blue-600 transition" />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-medium">
                Welcome, {user.name || user.email}
              </span>
              <button
                onClick={() => dispatch(logout(navigate))}
                className="text-blue-500 hover:underline flex items-center gap-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={handleAuthClick}
            >
              <UserIcon className="w-5 h-5" />
              <span className="font-semibold">Login / Register</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
