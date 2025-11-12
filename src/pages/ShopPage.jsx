
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySection from "../components/shop/CategorySection";
import ShopFilterBar from "../components/shop/ShopFilterBar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";
import { useParams } from "react-router-dom";
import { setCategorySlug, setOffset } from "../redux/productReducer";
import {
  selectVisibleProducts,
  selectTotalProducts,
  selectLimit,
  selectOffset,
} from "../redux/selectors";
import { fetchProducts, fetchCategories } from "../redux/thunks";

const ShopPage = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectVisibleProducts);
  const total = useSelector(selectTotalProducts);
  const limit = useSelector(selectLimit);
  const offset = useSelector(selectOffset);
  const { categorySlug: fromState } = useSelector((s) => s.product);

  const params = useParams();
  const slugFromUrl = params.slug || "";

  useEffect(() => {
    dispatch(fetchCategories());     
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, fromState ]);

  useEffect(() => {
    if (slugFromUrl && slugFromUrl !== fromState) {
      dispatch(setCategorySlug(slugFromUrl));
    }
  }, [slugFromUrl, fromState, dispatch]);

  useEffect(() => {
    const maxOffset = Math.max(0, Math.floor((total - 1) / limit) * limit);
    if (offset > maxOffset) {
      dispatch(setOffset(maxOffset));
    }
  }, [total, limit, offset, dispatch]);

  const handlePageChange = (selectedPage ) => {
  dispatch(setOffset(selectedPage * limit));
};

  const visibleCount = products.length;

  return (
    <>
      <CategorySection />
      <ShopFilterBar totalItems={total} visibleCount={visibleCount} />
      <ProductGrid products={products || []} />
      <Pagination
        total={total}
        limit={limit}
        offset={offset}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ShopPage;
