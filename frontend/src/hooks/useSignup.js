import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({ name, email, password, role }) => {
    const success = handleInputErrors({ name, email, password, role });
    if (!success) return false;  

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const text = await res.text();
      const data = text?JSON.parse(text) : {};
      console.log("DATA:", data);
      console.log("text:", text);

      if (data.error) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("users", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Registered successfully!");

      return true;  
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
