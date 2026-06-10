import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

import PremiumInput from "./Input";
import { CTAButton } from "./Buttons";
import { registerUser } from "../api/auth";

export default function RegisterForm({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields!");
      return;
    }

    if (!nameRegex.test(name)) {
      setError("Name must contain at least 3 letters");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8+ chars and contain uppercase, lowercase, number and special character",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await registerUser({
        name,
        email,
        password,
      });
      const data = res.data;

      if (!data.success) {
        return alert(data.message);
      }
      setSuccess("Thanks for registering, login now!");

      setTimeout(() => {
        switchToLogin();
      }, 2200);
    } catch (e) {
      console.error(e);
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <PremiumInput
        label="Full Name"
        icon={User}
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

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

      <PremiumInput
        label="Confirm Password"
        icon={Lock}
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-success text-sm text-center">{success}</p>}
      <CTAButton
        disabled={loading}
        className={`
    w-full
    py-4
    font-semibold
    transition
    ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-accent hover:scale-[1.02] hover:rounded-3xl"}
  `}
      >
        {loading ? "Creating Account..." : "Create Account"}
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
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="
            font-medium
            text-primary
            cursor-pointer
            transition
            hover:text-accent
          "
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
