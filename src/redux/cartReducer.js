
const LOAD = "cart/LOAD";
const ADD = "cart/ADD";
const REMOVE = "cart/REMOVE";
const SET_QTY = "cart/SET_QTY";
const CLEAR = "cart/CLEAR";
const SET_DISCOUNT = "cart/SET_DISCOUNT";

const LS_KEY = "cart:v1";
const loadLS = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
};
const saveLS = (items) => localStorage.setItem(LS_KEY, JSON.stringify(items));

const initialState = {
  items: loadLS(), 
  discount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, items: loadLS() };

    case ADD: {
      const p = action.payload;
      const q = p.quantity ?? 1;
      const idx = state.items.findIndex((i) => i.id === p.id);
      let items;
      if (idx >= 0) {
        items = state.items.map((i, k) =>
          k === idx ? { ...i, quantity: i.quantity + q } : i
        );
      } else {
        items = [...state.items, { id: p.id, name: p.name, price: p.price, image: p.image, quantity: q }];
      }
      saveLS(items);
      return { ...state, items };
    }

    case REMOVE: {
      const items = state.items.filter((i) => i.id !== action.payload);
      saveLS(items);
      return { ...state, items };
    }

    case SET_QTY: {
      const { id, quantity } = action.payload;
      const qty = Math.max(1, quantity);
      const items = state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
      saveLS(items);
      return { ...state, items };
    }

    case CLEAR:
      saveLS([]);
      return { ...state, items: [] };
    
      case SET_DISCOUNT:
       return { ...state, discount: Math.max(0, Number(action.payload) || 0) };

    default:
      return state;
  }
};

// actions
export const loadCart = () => ({ type: LOAD });
export const addToCart = (p) => ({ type: ADD, payload: p });
export const removeFromCart = (id) => ({ type: REMOVE, payload: id });
export const setCartQty = (id, quantity) => ({ type: SET_QTY, payload: { id, quantity } });
export const clearCart = () => ({ type: CLEAR });


// selectors
export const selectCartItems = (s) => s.cart.items;
export const selectCartCount = (s) =>
  s.cart.items.reduce((a, i) => a + i.quantity, 0);
export const selectCartSubtotal = (s) => s.cart.items.reduce((a, i) => a + i.price * i.quantity, 0);
export const selectCartShipping = (s) => (s.cart.items.length ? 2.99 : 0);
export const selectCartGrandTotal = (s) => {
   const subtotal = selectCartSubtotal(s);
   const shipping = selectCartShipping(s);

 };




