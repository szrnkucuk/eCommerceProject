import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { setUser, logoutAction } from "./clientReducer";
import {
  setCategories,
  setProductList,
  setTotal,
  setFetchState,
} from "./productReducer";

import allProducts from "../data/products";


export const loginUser =
  (credentials, rememberMe, navigate, from) => async (dispatch) => {
    const res = await axiosInstance.post("/login", credentials);

    const token = res.data?.token;
    if (!token) throw new Error("Token missing");

    if (rememberMe) localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = token;

    const user = res.data?.user;
    dispatch(setUser(user));                                  
    localStorage.setItem("user", JSON.stringify(user));       

    navigate(from || "/", { replace: true });
  };




export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    axiosInstance.defaults.headers.common["Authorization"] = token;
    const res = await axiosInstance.get("/verify");
    if (res.data?.user) {
      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        axiosInstance.defaults.headers.common["Authorization"] = res.data.token;
      }
    }
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const logout = (navigate) => (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } finally {
    dispatch({ type: "client/LOGOUT" });
    if (navigate) navigate("/", { replace: true });
  }
};



export const fetchCategories = () => async (dispatch) => {
  try {
    const slugToName = {
      fruits: "Fruits & Vegetables",
      meat: "Meat & Chicken",
      snacks: "Snacks",
      bakery: "Bakery & Patisserie",
      drinks: "Drinks",
    };

    const set = new Map(); 
    for (const p of allProducts) {
      const slug =
        p.categorySlug || p.category?.slug || p.category || p.category_name || "";
      if (!slug) continue;
      const name =
        p.categoryName || p.category?.name || slugToName[slug] || slug;
      if (!set.has(slug)) set.set(slug, name);
    }

    const categories = Array.from(set.entries()).map(([slug, name], i) => ({
      id: i + 1,
      slug,
      name,
    }));

    dispatch(setCategories(categories));
  } catch (error) {
    console.error("Category (local) build failed:", error);
  }
};

export const fetchProducts = () => async (dispatch, getState) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const { categorySlug, filter, sort } = getState().product;

    let list = allProducts.slice();

    if (categorySlug) {
      list = list.filter((p) => {
        const slug =
          p.categorySlug || p.category?.slug || p.category || p.category_name;
        return String(slug).toLowerCase() === String(categorySlug).toLowerCase();
      });
    }

    if (filter && filter.trim()) {
      const q = filter.trim().toLowerCase();
      list = list.filter((p) => {
        const name = String(p.name || "").toLowerCase();
        const desc = String(p.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    if (sort === "price-asc") list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === "price-desc")
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === "name-asc")
      list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    if (sort === "name-desc")
      list.sort((a, b) => String(b.name).localeCompare(String(a.name)));

    dispatch(setProductList(list));
    dispatch(setTotal(list.length));
    dispatch(setFetchState("FETCHED"));
  } catch (e) {
    console.error("fetchProducts (local) failed", e);
    dispatch(setFetchState("FAILED"));
  }
};

