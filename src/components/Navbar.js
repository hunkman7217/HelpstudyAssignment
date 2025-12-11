import { useRouter } from "next/router";
import { useAuthStore } from "@/store/AuthStore";

function Navbar() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/"); 
  };

  return (
    <>
      <div className="flex justify-between shadow-amber-100 border-b border-gray-500">
        <img src="/logo.png" alt="logo" className="w-20 h-20 ml-5" />

        <nav className="flex">
          <li
            className="list-none hover:text-blue-500 mr-5 mt-7 cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </li>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
