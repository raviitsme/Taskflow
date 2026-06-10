import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { X } from "lucide-react";
import { getMe, updateProfile } from "../api/user";

export default function EditProfileModal({ isOpen, onClose }) {
  const { user, setUser, fetchUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;
  setLoading(true);

  try {
    await updateProfile(formData);

    await getMe();
    await fetchUser();

    await new Promise((res) => setTimeout(res, 800));

    onClose();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Edit Profile</h2>

          <button
            onClick={onClose}
            className="text-white hover:text-gray-500 p-2 hover:bg-white/5 rounded-2xl transition-all duration-150 cursor-pointer"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="
              w-full
              p-3
              rounded-xl
              bg-white/5
              border
              border-white/10
              outline-none
            "
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="
              w-full
              p-3
              rounded-xl
              bg-white/5
              border
              border-white/10
              outline-none
            "
          />

          <button
            type="submit"
            disabled={loading}
            className={`
    w-full
    py-3
    rounded-xl
    transition-all duration-150
    ${
      loading
        ? "bg-primary/50 cursor-not-allowed"
        : "bg-primary hover:bg-primary/80 cursor-pointer"
    }
  `}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
