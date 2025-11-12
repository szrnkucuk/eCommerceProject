export const selectProductList = (s) => s?.product?.productList ?? [];
export const selectAllProducts = (s) => s?.product?.allProducts ?? [];
export const selectCategorySlug = (s) => s?.product?.categorySlug ?? "";
export const selectLimit = (s) => s?.product?.limit ?? 10;
export const selectOffset = (s) => s?.product?.offset ?? 0;
export const selectFilter = (s) => s?.product?.filter ?? "";
export const selectSort = (s) => s?.product?.sort ?? "";


export const selectFilteredProducts = (state) => {
  const list = selectProductList(state).length
    ? selectProductList(state)
    : selectAllProducts(state);

  const slug = selectCategorySlug(state);
  const query = selectFilter(state).trim().toLowerCase();
  const sort = selectSort(state);

  let result = list;

  if (slug) {
    result = result.filter((p) => p.categorySlug === slug);
  }
  if (query) {
    result = result.filter((p) =>
      (p.title || p.name || "").toLowerCase().includes(query)
    );
  }
  if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

  return result;
};

export const selectTotalProducts = (state) => selectFilteredProducts(state).length;

export const selectVisibleProducts = (state) => {
  const filtered = selectFilteredProducts(state);
  const limit = selectLimit(state);
  const offset = selectOffset(state);

  const safeOffset = Math.max(
    0,
    Math.min(offset, Math.max(0, filtered.length - 1))
  );
  return filtered.slice(safeOffset, safeOffset + limit);
};
