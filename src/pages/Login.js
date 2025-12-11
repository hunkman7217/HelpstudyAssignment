import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useAuthStore } from "@/store/AuthStore";

export default function Login() {
  const router = useRouter();

  // Local state for form
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Zustand Auth Store
  const { login, loading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(Username, password);

    if (success) {
      router.push("/Dashboard"); // redirect to dashboard
    }
  };

  return (
    <>
      <div className="mt-35 p-20 justify-center justify-self-center bg-white w-100 rounded-b-full rounded-tl-full">
        <h1 className="text-4xl text-black text-center mb-3">Log in</h1>

        <form className="flex flex-col text-center" onSubmit={handleLogin}>
          {/* EMAIL INPUT */}
          <input
            type="text"
            placeholder="Enter your username"
            className="border-2 rounded-2xl pl-2 h-10 placeholder-gray-300 outline-gray-500 text-gray-950"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />

          {/* PASSWORD INPUT */}
          <input
            type="password"
            placeholder="Enter your password"
            className="border-2 rounded-2xl pl-2 mt-1 mb-1 h-10 placeholder-gray-300 outline-gray-500 text-gray-950"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          {/* LOGIN BUTTON */}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>

          {/* ERROR MSG */}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      </div>
    </>
  );
}
