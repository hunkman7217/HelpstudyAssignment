import { useEffect } from "react";
import { useRouter } from "next/router";
import  useProductsStore  from "@/store/ProductStore";
import { Box } from "@mui/material";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { selectedProduct, loading, fetchProductById } = useProductsStore();

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  return (
    <Box p={5}>
      <button
        onClick={() => router.push("products/ProductsByid")}
        className="underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl mb-4">Product Details</h1>

      {loading && <p>Loading...</p>}

      {selectedProduct && (
        <div>
          <img src={selectedProduct.thumbnail} className="w-60" />
          <h2 className="text-xl">{selectedProduct.title}</h2>
          <p>Price: ${selectedProduct.price}</p>
          <p>Category: {selectedProduct.category?.name}</p>
          <p>Description: {selectedProduct.description}</p>
        </div>
      )}
    </Box>
  );
}
