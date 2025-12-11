import { useRouter } from "next/router";
import useUsersStore from "@/store/UserStore";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { selectedUser, loading, fetchUserById } = useUsersStore();

  useEffect(() => {
    if (id) fetchUserById(id);
  }, [id]);

  return (
    <Box p={5}>
      <button
        onClick={() => router.push("/users/User")}
        className="mb-4 underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl mb-4">User Details</h1>

      {loading && <p>Loading...</p>}

      {selectedUser && (
        <div>
          <p>
            <strong>Name:</strong> {selectedUser.firstName}{" "}
            {selectedUser.lastName}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>City:</strong> {selectedUser.address?.city}
          </p>
        </div>
      )}
    </Box>
  );
}
