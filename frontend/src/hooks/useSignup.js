import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({ name, email, password, role }) => {
    const success = handleInputErrors({ name, email, password, role });
    if (!success) return false;  // ✅ Return false if validation fails

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("users", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Registered successfully!");

      return true;  // ✅ Return true when signup is successful
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return { signup };
};

export default useSignup;

function handleInputErrors({ name, email, password, role }) {
  if (!name || !email || !password || !role) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
