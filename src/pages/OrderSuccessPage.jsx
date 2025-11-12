import { useLocation, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLastOrder } from "../redux/orderReducer";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const fromState = state?.order;
  const fromStore = useSelector(selectLastOrder);
  const order = fromState || fromStore || {};

  const total = order?.pricing?.total ?? 0;
  const currency = order?.pricing?.currency ?? "USD";

  return (
    <div className="max-w-[900px] mx-auto p-8 text-center">
      <h1 className="text-3xl font-extrabold mb-2">Order Placed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order number is <b>{id || order.id}</b>.
      </p>
      <div className="inline-block text-left bg-white shadow rounded-xl p-6">
        <div className="flex justify-between w-80">
          <span>Total</span>
          <span className="font-semibold">{currency} {total}</span>
        </div>
        {order?.payment?.method && (
          <div className="flex justify-between w-80 mt-2">
            <span>Payment</span>
            <span className="font-semibold">
              {order.payment.method === "card"
                ? `Card •••• ${order.payment.last4}`
                : "Bank Transfer / EFT"}
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3 justify-center">
        <Link to="/shop" className="px-5 py-2 rounded bg-blue-600 text-white">Continue Shopping</Link>
        <Link to="/cart" className="px-5 py-2 rounded border">View Cart</Link>
      </div>
    </div>
  );
}
