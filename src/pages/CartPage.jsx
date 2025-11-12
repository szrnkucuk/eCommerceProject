
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartQty,
  removeFromCart,
  clearCart,
} from "../redux/cartReducer";
import { useNavigate } from "react-router-dom";

const fmt = (n) => `$${n.toFixed(2)}`;

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping = items.length ? 2.99 : 0; 
  const grandTotal = subtotal + shipping;

  if (!items.length) {
    return (
      <div className="max-w-[1000px] mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6">Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold">Shopping Cart</h1>
        <button className="text-red-600 text-xl" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 space-y-6">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow"
            >
              <img
                src={i.image}
                alt={i.name}
                className="w-28 h-28 object-contain rounded-lg"
              />

              <div className="flex-1">
                <div className="text-2xl font-semibold">{i.name}</div>
                <div className="text-green-600 font-bold text-xl">
                  {fmt(i.price)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => dispatch(setCartQty(i.id, i.quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={i.quantity}
                  onChange={(e) =>
                    dispatch(setCartQty(i.id, Number(e.target.value) || 1))
                  }
                  className="w-16 text-center border rounded py-2"
                />
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => dispatch(setCartQty(i.id, i.quantity + 1))}
                >
                  +
                </button>
              </div>

              <div className="w-28 text-right text-2xl font-semibold">
                {fmt(i.price * i.quantity)}
              </div>

              <button
                className="text-red-600 text-lg ml-2"
                onClick={() => dispatch(removeFromCart(i.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="p-6 bg-white rounded-2xl shadow h-fit">
          <h2 className="font-bold text-xl mb-4">Order Summary</h2>

          <div className="flex justify-between py-2">
            <span>Products</span>
            <span className="font-semibold">{fmt(subtotal)}</span>
          </div>

          <div className="flex justify-between py-2">
            <span>Shipping</span>
            <span className="font-semibold">{fmt(shipping)}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between py-1">
            <span className="font-semibold">Grand Total</span>
            <span className="text-2xl font-extrabold">{fmt(grandTotal)}</span>
          </div>

          <button  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3"
            onClick={() => navigate("/checkout")}>   Checkout
             </button>
        </aside>
      </div>
    </div>
  );
}
