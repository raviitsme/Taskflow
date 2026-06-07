import { useState } from "react";
import PremiumInput from "./Input";
import { Mail, Lock, Eye } from "lucide-react";
import { CTAButton } from "./Buttons";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ switchToRegister }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, password } = formData;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      const data = res.data;

      if (data.u.token) {
        localStorage.setItem("token", data.u.token);

        setError("");
        setSuccess(data.message);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-7">
      <PremiumInput
        label="Email Address"
        icon={Mail}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <PremiumInput
        label="Password"
        icon={Lock}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="
            text-sm
            text-primary
            hover:text-accent
            cursor-pointer
            hover:underline
            transition-all
            duration-300
          "
        >
          Forgot Password?
        </button>
      </div>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      {success && <p className="text-sm text-success text-center">{success}</p>}
      <CTAButton
        className="w-full
          bg-primary
          py-4
          font-semibold
          hover:bg-accent
          hover:scale-[1.02]
          hover:rounded-3xl"
      >
        Submit
      </CTAButton>

      <div className="relative">
        <div className="h-px bg-white/10" />

        <span
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            bg-card
            px-3

            text-xs
            text-white/40
          "
        >
          OR
        </span>
      </div>

      <p className="text-center text-sm text-white/50">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={switchToRegister}
          className="
            font-medium
            text-primary
            cursor-progress
            hover:text-accent
            transition
  "
        >
          Create Account
        </button>
      </p>
    </form>
  );
}
