// src/components/shop/ShopFilterBar.jsx
import React from "react";

const ShopFilterBar = ({ totalItems, visibleCount }) => {
  return (
    <div className="flex justify-between items-center px-10 py-4 border-b border-gray-200">
      <p className="text-gray-600">
        {visibleCount > 0
          ? `${visibleCount} of ${totalItems} items showing`
          : "No results"}
      </p>
      {/* Diğer filtre, sort, vb. kısımlar burada kalabilir */}
    </div>
  );
};

export default ShopFilterBar;
