import { useEffect, useState } from "react";
import useProductsStore from "@/store/ProductStore";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
} from "@mui/material";

export default function ProductsPage() {
  const router = useRouter();
  const {
    Products,
    categories,
    page,
    fetchProducts,
    searchProducts,
    filterByCategory,
    fetchCategories,
    setPage,
  } = useProductsStore();

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts(page);
    fetchCategories();
  }, [page]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    filterByCategory(value);
  };

  return (
    <>
    <Navbar/>
    <Box p={5}>
      <h1 className="text-3xl mb-4">Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Product"
        onChange={(e) => searchProducts(e.target.value)}
        className="w-full p-3 rounded-md bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
      />

      {/* Category Filter */}
      <Select
        fullWidth
        sx={{ mt: 2, bgcolor: "orange" }}
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        displayEmpty
        renderValue={(value) =>
          value ? value : <span style={{ color: "white" }}>All Categories</span>
        }
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {categories.map((c) => (
          <MenuItem value={c.slug} key={c.slug}>
            {c.name}
          </MenuItem>
        ))}
      </Select>

      {/* Product List */}
      <Grid container spacing={3} mt={3}>
        {Products.map((p) => (
          <Grid item xs={12} md={4} key={p.id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => router.push(`products/Products/${p.id}`)}
            >
              <CardContent>
                <img src={p.thumbnail} className="w-40 mx-auto" alt={p.title} />
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p>Price: ${p.price}</p>
                <p>Category: {p.category}</p>
                <p>Rating: ⭐ {p.rating}</p>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <Button variant="contained" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
    </>
  );
}
