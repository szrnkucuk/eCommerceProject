
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../routes/ProtectedRoute";
import {
  fetchAddresses, addAddress, updateAddress, deleteAddress,
  selectAddresses, selectAddrLoading, selectAddrError,
  selectShippingId, selectBillingId, selectSameAsShipping,
  selectShipping, selectBilling, setSameAsShipping,
} from "../redux/addressReducer";
import AddressForm from "../components/checkout/AddressForm";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/orderReducer";


const fmt = (n) => `$${n.toFixed(2)}`;
const luhnCheck = (num) => {
  const s = (num || "").replace(/\s+/g, "");
  if (process.env.NODE_ENV !== "production") return /^\d{12,19}$/.test(s);
  let sum = 0, dbl = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s[i], 10);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d; dbl = !dbl;
  }
  return sum % 10 === 0;
};

function CreateOrderInner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // address state from store
  const addresses   = useSelector(selectAddresses);
  const loading     = useSelector(selectAddrLoading);
  const error       = useSelector(selectAddrError);
  const shippingId  = useSelector(selectShippingId);
  const billingId   = useSelector(selectBillingId);
  const same        = useSelector(selectSameAsShipping);

  // cart state
  const cartItems   = useSelector((s) => s.cart.items);
  const subtotal    = useMemo(() => cartItems.reduce((a, i) => a + i.price * i.quantity, 0), [cartItems]);
  const shippingFee = cartItems.length ? 2.99 : 0;
  const grandTotal  = subtotal + shippingFee;

  // ui state
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [step, setStep]         = useState(1); 

  // payment state
  const [payMethod, setPayMethod] = useState("card"); 
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [agree, setAgree] = useState(false);
  const [payError, setPayError] = useState("");

  useEffect(() => { dispatch(fetchAddresses()); }, [dispatch]);

  const onSave = async (data) => {
    if (editItem) await dispatch(updateAddress(data));
    else          await dispatch(addAddress(data));
    setShowForm(false); setEditItem(null);
  };

  const canGoPayment = !!shippingId && (same || (!!billingId));

  // ---- validation for payment
  const isCardValid = useMemo(() => {
    if (payMethod !== "card") return true;
    const nameOk   = card.name.trim().length >= 2;
    const numberOk = luhnCheck(card.number.replace(/\s+/g, ""));
    const expiryOk = /^\d{2}\/\d{2}$/.test(card.expiry); // MM/YY
    const cvcOk    = /^\d{3,4}$/.test(card.cvc);
    return nameOk && numberOk && expiryOk && cvcOk;
  }, [payMethod, card]);

  const placeOrder = async () => {
   setPayError("");
   if (!agree) { setPayError("Please accept the Terms & Conditions."); return; }
   if (payMethod === "card" && !isCardValid) { setPayError("Please enter a valid card."); return; }
   if (!cartItems.length) { setPayError("Your cart is empty."); return; }

   const payload = {
     payment: payMethod === "card"
       ? { method: "card", last4: card.number.replace(/\s+/g,"").slice(-4) }
       : { method: "bank" },
     agree,
   };
   const order = await dispatch(createOrder(payload));
   
   navigate(`/order/success/${order.id}`, { state: { order } });
 };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* ----- LEFT: Steps ----- */}
        <div className="md:col-span-2">
          {/* Step header */}
          <div className="flex items-center gap-6 mb-4">
            <div className={`px-3 py-1 rounded-full text-sm ${step===1?"bg-blue-600 text-white":"bg-gray-200"}`}>1 Address Details</div>
            <div className={`px-3 py-1 rounded-full text-sm ${step===2?"bg-blue-600 text-white":"bg-gray-200"}`}>2 Payment Options</div>
          </div>

          {/* Step 1: Address */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Shipping Address</h2>
                <button className="text-blue-600" onClick={() => { setEditItem(null); setShowForm(true); }}>
                  + Add New Address
                </button>
              </div>

              {loading && <p>Loading addresses...</p>}
              {error && <p className="text-red-600">{error}</p>}

              {!!addresses.length && (
                <div className="grid md:grid-cols-2 gap-4">
                  {addresses.map(a => (
                    <label key={a.id} className={`border rounded-lg p-4 flex flex-col gap-2 cursor-pointer ${shippingId===a.id ? "border-blue-600" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingId===a.id}
                            onChange={() => dispatch(selectShipping(a.id))}
                          />
                          <div className="font-semibold">{a.title}</div>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <button className="text-blue-600" onClick={(e)=>{e.preventDefault(); setEditItem(a); setShowForm(true);}}>Edit</button>
                          <button className="text-red-600" onClick={(e)=>{e.preventDefault(); dispatch(deleteAddress(a.id));}}>Delete</button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {a.name} {a.surname} • {a.phone}<br/>
                        {a.neighborhood}, {a.district}, {a.city}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Billing same */}
              <div className="flex items-center gap-2">
                <input
                  id="same"
                  type="checkbox"
                  checked={same}
                  onChange={(e)=>dispatch(setSameAsShipping(e.target.checked))}
                />
                <label htmlFor="same">Billing address is the same as shipping</label>
              </div>

              {/* Billing address selection */}
              {!same && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Billing Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map(a => (
                      <label key={a.id} className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer ${billingId===a.id ? "border-blue-600" : ""}`}>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="billing"
                            checked={billingId===a.id}
                            onChange={() => dispatch(selectBilling(a.id))}
                          />
                          <div>
                            <div className="font-semibold">{a.title}</div>
                            <div className="text-sm text-gray-600">
                              {a.neighborhood}, {a.district}, {a.city}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button type="button"
                  className="px-5 py-2 bg-orange-500 text-white rounded disabled:opacity-60"
                  onClick={() => setStep(2)}
                  disabled={!canGoPayment}
                >
                  Save & Continue
                </button>
              </div>

              {/* Inline modal/form */}
              {showForm && (
                <div className="border rounded-xl p-4 bg-white shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{editItem? "Update Address" : "Add New Address"}</h3>
                    <button onClick={()=>{setShowForm(false); setEditItem(null);}}>✕</button>
                  </div>
                  <AddressForm
                    initial={editItem}
                    onCancel={()=>{setShowForm(false); setEditItem(null);}}
                    onSave={onSave}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Payment Options</h2>

              {/* Method */}
              <div className="grid md:grid-cols-2 gap-4">
                <label className={`border rounded-lg p-4 cursor-pointer ${payMethod==="card" ? "border-blue-600" : ""}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay"
                      checked={payMethod==="card"}
                      onChange={()=>setPayMethod("card")}
                    />
                    <span className="font-semibold">Credit / Debit Card</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Pay securely with your card.</p>
                </label>

                <label className={`border rounded-lg p-4 cursor-pointer ${payMethod==="bank" ? "border-blue-600" : ""}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay"
                      checked={payMethod==="bank"}
                      onChange={()=>setPayMethod("bank")}
                    />
                    <span className="font-semibold">Bank Transfer / EFT</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">You will receive bank details after confirmation.</p>
                </label>
              </div>

              {/* Card form */}
              {payMethod === "card" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Cardholder Name</label>
                    <input
                      value={card.name}
                      onChange={(e)=>setCard(c=>({...c, name: e.target.value}))}
                      className="border rounded w-full p-2"
                      placeholder="Name on card"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Card Number</label>
                    <input
                      value={card.number}
                      onChange={(e)=>setCard(c=>({...c, number: e.target.value.replace(/[^\d\s]/g,"")}))}
                      className="border rounded w-full p-2"
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Expiry (MM/YY)</label>
                    <input
                      value={card.expiry}
                      onChange={(e)=>setCard(c=>({...c, expiry: e.target.value.toUpperCase()}))}
                      className="border rounded w-full p-2"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">CVC</label>
                    <input
                      value={card.cvc}
                      onChange={(e)=>setCard(c=>({...c, cvc: e.target.value.replace(/\D/g,"")}))}
                      className="border rounded w-full p-2"
                      placeholder="123"
                      inputMode="numeric"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}

              {/* Bank transfer info */}
              {payMethod === "bank" && (
                <div className="border rounded-lg p-4 bg-gray-50 text-sm text-gray-700">
                  <p>After placing the order, you will receive our bank details. Please include your order number in the transfer description.</p>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                <span>I accept the Terms & Conditions and the Privacy Policy.</span>
              </label>

              {payError && <p className="text-red-600">{payError}</p>}

              <div className="flex gap-3">
                <button className="px-4 py-2 border rounded" onClick={()=>setStep(1)}>Back</button>
                <button
                  className="px-5 py-2 bg-green-600 text-white rounded disabled:opacity-60"
                  onClick={placeOrder}
                  disabled={!agree || (payMethod==="card" && !isCardValid)}
                >
                  Place Order ({fmt(grandTotal)})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ----- RIGHT: Order Summary ----- */}
        <aside className="p-5 bg-white rounded-xl shadow h-fit">
          <h3 className="font-bold mb-3">Order Summary</h3>
          <div className="flex justify-between py-1"><span>Products</span><span>{fmt(subtotal)}</span></div>
          <div className="flex justify-between py-1"><span>Shipping</span><span>{fmt(shippingFee)}</span></div>
          <hr className="my-2"/>
          <div className="flex justify-between py-1 font-semibold"><span>Total</span><span>{fmt(grandTotal)}</span></div>
          {step === 1 && (
            <button type="button"
              className="w-full mt-3 bg-orange-500 text-white rounded py-2 disabled:opacity-60"
              onClick={()=>setStep(2)}
              disabled={!canGoPayment}
            >
              Save & Continue
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

export default function CreateOrderPage() {
  return (
    <ProtectedRoute>
      <CreateOrderInner />
    </ProtectedRoute>
  );
}
