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

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({ name, email, password, confirmPassword });
      const data = res.data;

      if(!data.success) {
        return alert(data.message);
      }

      alert("Thank you for registering, login now!");
      switchToLogin();

    } catch (e) {
      console.error(e);
      alert("Server error!");
    }

    console.log("Register:", formData);
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-6"
    >
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

      <CTAButton
        className="
          w-full
          bg-primary
          py-4
          font-semibold
          hover:bg-accent
          hover:scale-[1.02]
          hover:rounded-3xl
        "
      >
        Create Account
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