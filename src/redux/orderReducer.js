import axios from "../api/axiosInstance";

/* types */
const ORD_REQ = "order/REQ";
const ORD_OK  = "order/OK";
const ORD_ERR = "order/ERR";

/* state */
const initial = {
  loading: false,
  error: null,
  lastOrder: null,
};

/* reducer */
export function orderReducer(state = initial, action) {
  switch (action.type) {
    case ORD_REQ: return { ...state, loading: true, error: null };
    case ORD_OK:  return { ...state, loading: false, lastOrder: action.payload, error: null };
    case ORD_ERR: return { ...state, loading: false, error: action.payload };
    default: return state;
  }
}

/* selectors */
export const selectOrderLoading = (s) => s.order.loading;
export const selectLastOrder    = (s) => s.order.lastOrder;

export const createOrder = (payloadFromUI) => async (dispatch, getState) => {
  dispatch({ type: ORD_REQ });
  const state = getState();
  const items = state.cart.items.map(i => ({
    id: i.id, name: i.name, price: i.price, quantity: i.quantity,
  }));
  const subtotal = items.reduce((a,i)=>a + i.price*i.quantity, 0);
  const shipping = items.length ? 2.99 : 0;
  const total = +(subtotal + shipping).toFixed(2);
  const pricing = { subtotal, shipping, total, currency: "USD" };

  const shippingId = state.address.selectedShippingId;
  const billingId  = state.address.sameAsShipping
    ? state.address.selectedShippingId
    : state.address.selectedBillingId;

  const body = {
    items,
    pricing, 
    shippingId,
    billingId,
    payment: payloadFromUI.payment,
    meta: { agree: payloadFromUI.agree === true },
  };

  try {
    const res = await axios.post("/orders", body);
    const order = res.data?.data || res.data || {};
    order.id = order.id || crypto.randomUUID();
    order.items = order.items || items;
    order.pricing = order.pricing || pricing;
    order.payment = order.payment || body.payment;
    order.shippingId = order.shippingId || shippingId;
    order.billingId  = order.billingId  || billingId;

    dispatch({ type: ORD_OK, payload: order });
    return order;
  } catch (e) {
    const order = {
      id: crypto.randomUUID(),
      items,
      pricing,
      payment: body.payment,
      shippingId,
      billingId,
    };
    dispatch({ type: ORD_OK, payload: order });
    return order;
  }
};

