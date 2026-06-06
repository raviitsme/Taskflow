import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PremiumInput({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative">
      {/* Left Icon */}
      {Icon && (
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />
      )}

      <input
        type={
          isPassword
            ? showPassword
              ? "text"
              : "password"
            : type
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-surface
          py-4
          pl-12
          pr-12
          text-white
          outline-none
          transition-all
          duration-300
          focus:border-primary
        "
      />

      {/* Eye Button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-white/40
            hover:text-primary
            transition-colors
            cursor-pointer
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      )}
    </div>
  );
}