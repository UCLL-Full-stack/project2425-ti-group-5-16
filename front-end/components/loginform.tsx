import { useRouter } from "next/router";
import { useState } from "react";
import UserService from "@services/UserService";

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const router = useRouter();

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setStatusMessage(null);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
  
    if (!validate()) {
      return;
    }
  
    try {
      console.log("Logging in with:", email, password);
      const data = await UserService.loginUser(email, password);
  
      if (data.token && data.email) {
        setStatusMessage({
          message: "Login successful! Redirecting...",
          type: "success",
        });
  
        // Store user data in session storage
        sessionStorage.setItem("user", JSON.stringify({
          email: data.email,
          role: data.role,
          token: data.token,
        }));
        sessionStorage.setItem("token", data.token);
  
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setStatusMessage({
          message: "Login failed. Missing expected response fields.",
          type: "error",
        });
      }
    } catch (error: any) {
      setStatusMessage({
        message: error.message || "An error occurred during login.",
        type: "error",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {statusMessage && (
        <div className={`p-3 rounded ${
          statusMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}>
          {statusMessage.message}
        </div>
      )}

      <div>
        <label className="block text-white font-medium mb-1">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
        {emailError && <p className="mt-1 text-red-500 text-sm">{emailError}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-1">
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
        {passwordError && <p className="mt-1 text-red-500 text-sm">{passwordError}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;