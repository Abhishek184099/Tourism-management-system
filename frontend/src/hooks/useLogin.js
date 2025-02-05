import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password });
    if (!success) return false;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save user info in localStorage
      localStorage.setItem("users", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Login successful!");
      return true; // ✅ Return true on successful login
    } catch (error) {
      toast.error(error.message);
      return false; // ✅ Return false if login fails
    }
  };

  return { login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
