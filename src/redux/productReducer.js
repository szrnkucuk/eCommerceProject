// src/redux/productReducer.js
import { combineReducers } from "redux";
import { clientReducer } from "./clientReducer";
import allProducts from "../data/products";

const initialState = {
  allProducts,        
  productList: [],    
  categories: [],
  categorySlug: "",
  filter: "",
  sort: "",
  limit: 10,
  offset: 0,
  total: 0,
  fetchState: "NOT_FETCHED",
};

// ---------------- REDUCER ----------------
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORY_SLUG":
      return { ...state, categorySlug: action.payload, offset: 0 };

    case "SET_FILTER":
      return { ...state, filter: action.payload, offset: 0 };

    case "SET_SORT":
      return { ...state, sort: action.payload };

    case "SET_LIMIT":
      return { ...state, limit: action.payload };

    case "SET_OFFSET":
      return { ...state, offset: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_PRODUCT_LIST":
      return { ...state, productList: action.payload };

    case "SET_TOTAL":
      return { ...state, total: action.payload };

    case "SET_FETCH_STATE":
      return { ...state, fetchState: action.payload };

    default:
      return state;
  }
};

// ---------------- ACTION CREATORS ----------------
export const setCategorySlug = (slug) => ({ type: "SET_CATEGORY_SLUG", payload: slug });
export const setFilter = (val) => ({ type: "SET_FILTER", payload: val });
export const setSort = (val) => ({ type: "SET_SORT", payload: val });
export const setLimit = (n) => ({ type: "SET_LIMIT", payload: n });
export const setOffset = (n) => ({ type: "SET_OFFSET", payload: n });
export const setCategories = (val) => ({ type: "SET_CATEGORIES", payload: val });
export const setProductList = (val) => ({ type: "SET_PRODUCT_LIST", payload: val });
export const setTotal = (val) => ({ type: "SET_TOTAL", payload: val });
export const setFetchState = (val) => ({ type: "SET_FETCH_STATE", payload: val });

// ---------------- ROOT REDUCER ----------------
export const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
});
