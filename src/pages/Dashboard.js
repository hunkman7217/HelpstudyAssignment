import Navbar from "@/components/Navbar";
import { Grid, Box, Button } from "@mui/material";
import { useRouter } from "next/router";


          
function Dashboard() {
  const router = useRouter();
 
  return (
    <>
      <Navbar />

        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          marginTop: 10,
          padding: 3,
        }}
      >
        <Grid container spacing={10}>

          {/* USERS CARD */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                padding: 3,
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              <img src="UserCount.png" alt="Users" className="w-60" />
              <p className="mt-2 text-black">Our Users</p>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push("/users/User")}
              >
                View Users
              </Button>
            </Box>
          </Grid>

          {/* PRODUCTS CARD */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                padding: 3,
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              <img src="Product.png" alt="Products" className="w-60" />
              <p className="mt-2 text-black">Our Products</p>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push("products/Products")}
              >
                View Products
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
