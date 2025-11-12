import axiosInstance from "../api/axiosInstance";

// --- state
const SET_LOADING = "addr/SET_LOADING";
const SET_ERROR = "addr/SET_ERROR";
const SET_LIST = "addr/SET_LIST";
const SELECT_SHIPPING = "addr/SELECT_SHIPPING";
const SELECT_BILLING = "addr/SELECT_BILLING";
const SET_SAME = "addr/SET_SAME";

const initialState = {
  loading: false,
  error: null,
  list: [],                 
  selectedShippingId: null, 
  selectedBillingId: null,  
  sameAsShipping: true,    
};

export function addressReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING: return { ...state, loading: action.payload, error: null };
    case SET_ERROR:   return { ...state, error: action.payload, loading: false };
    case SET_LIST:    return { ...state, list: action.payload, loading: false, error: null };
    case SELECT_SHIPPING: return { ...state, selectedShippingId: action.payload,
      selectedBillingId: state.sameAsShipping ? action.payload : state.selectedBillingId };
    case SELECT_BILLING:  return { ...state, selectedBillingId: action.payload };
    case SET_SAME:
      return {
        ...state,
        sameAsShipping: action.payload,
        selectedBillingId: action.payload ? state.selectedShippingId : state.selectedBillingId,
      };
    default: return state;
  }
}

// actions
export const setSameAsShipping = (b) => ({ type: SET_SAME, payload: b });
export const selectShipping = (id) => ({ type: SELECT_SHIPPING, payload: id });
export const selectBilling  = (id) => ({ type: SELECT_BILLING,  payload: id });

// thunks
export const fetchAddresses = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const cached = JSON.parse(localStorage.getItem("addresses") || "[]");
    if (Array.isArray(cached) && cached.length) {
      dispatch({ type: SET_LIST, payload: cached });
      dispatch(selectShipping(cached[0].id));
      return;
    }
    useEffect(() => { dispatch(fetchAddresses()); }, [dispatch]);

useEffect(() => {
  if (!loading && addresses.length === 0 && !showForm) {
    setShowForm(true);
  }
}, [loading, addresses, showForm]);

    const res = await axiosInstance.get("/user/address", { timeout: 3000 });

    // bazı backend'ler {data:[...]} döndürür
    const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
    dispatch({ type: SET_LIST, payload: data });

    if (data.length) dispatch(selectShipping(data[0].id));
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: e?.response?.data?.message || e?.message || "Address fetch failed" });
    dispatch({ type: SET_LIST, payload: [] });
  }
};

export const addAddress = (payload) => async (dispatch, getState) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    await axiosInstance.post("/user/address", payload);
  } catch {
    const id = payload.id || crypto.randomUUID();
    const next = { ...payload, id };
    const list = [next, ...getState().address.list];
    localStorage.setItem("addresses", JSON.stringify(list));
  }
  await dispatch(fetchAddresses());
};

export const updateAddress = (payload) => async (dispatch, getState) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    await axiosInstance.put("/user/address", payload);
  } catch {
    const list = getState().address.list.map(a => (a.id === payload.id ? { ...a, ...payload } : a));
    localStorage.setItem("addresses", JSON.stringify(list));
  }
  await dispatch(fetchAddresses());
};

export const deleteAddress = (id) => async (dispatch, getState) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    await axiosInstance.delete(`/user/address/${id}`);
  } catch {
    const list = getState().address.list.filter(a => a.id !== id);
    localStorage.setItem("addresses", JSON.stringify(list));
  }
  await dispatch(fetchAddresses());
};


// selectors
export const selectAddresses = (s) => s.address.list;
export const selectAddrLoading = (s) => s.address.loading;
export const selectAddrError =   (s) => s.address.error;
export const selectShippingId =  (s) => s.address.selectedShippingId;
export const selectBillingId  =  (s) => s.address.selectedBillingId;
export const selectSameAsShipping = (s) => s.address.sameAsShipping;
