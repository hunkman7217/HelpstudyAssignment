import { useEffect } from "react";
import useUsersStore from "@/store/UserStore";
import { useRouter } from "next/router";
import { Button, Box, Grid, Card, CardContent } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Navbar from "@/components/Navbar";

export default function UsersPage() {
  const router = useRouter();

  const { User, loading, error, fetchUsers, searchUsers, page, setPage } =
    useUsersStore();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <>
      <Navbar />
      <Box p={5}>
        <h1 className="text-3xl mb-4">Users List</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Users"
          onChange={(e) => searchUsers(e.target.value)}
          className="w-full p-3 rounded-md bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Loading Bar - Fixed Position */}
        {loading && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress />
          </Box>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* List */}
        <Grid container spacing={3} mt={3}>
          {User.map((u) => (
            <Grid item xs={12} md={4} key={u.id}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`users/User/${u.id}`)}
              >
                <CardContent>
                  <h2 className="text-xl font-semibold">
                    {u.firstName} {u.lastName}
                  </h2>
                  <p>Email: {u.email}</p>
                  <p>Gender: {u.gender}</p>
                  <p>Phone: {u.phone}</p>
                  <p>Company: {u.company?.name}</p>
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
