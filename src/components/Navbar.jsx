import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "home", title: "Home" },
    { id: "features", title: "Features" },
    { id: "about", title: "About" },
    { id: "contact-us", title: "Contact Us" },
  ];

  // Reusable smooth scroll handler
  const handleScrollToSection = (e, id) => {
    e.preventDefault(); // Prevents URL hash jumping or route reloads
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // Closes mobile menu safely if it was open
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 z-50 w-full
        flex justify-center
        transition-all duration-500
        ${scrolled ? "pt-4" : "pt-0"}
      `}
    >
      <div
        className={`
          w-[95%] max-w-7xl
          flex items-center justify-between
          transition-all duration-500
          ${
            scrolled
              ? `
                rounded-3xl
                bg-bg/50
                backdrop-blur-xl
                border border-white/10
                px-6 py-4
                shadow-2xl
                scale-[0.97]
              `
              : `
                px-6 lg:px-10
                py-6
              `
          }
        `}
      >
        {/* Logo */}
        <h1 className="font-mono text-xl cursor-pointer md:text-2xl font-bold text-white">
          <span className="text-primary">Task</span>Flow
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-base">
          {links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`} // ✅ Fixed: Added hash prefix
              onClick={(e) => handleScrollToSection(e, item.id)} // ✅ Fixed: Custom smooth scroll
              className="
                relative text-white/80 transition-colors duration-300
                hover:text-accent
                after:absolute after:left-1/2 after:-bottom-1
                after:h-0.5 after:w-0
                after:-translate-x-1/2
                after:bg-accent
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex font-mono items-center gap-4">
          <button onClick={onLoginClick} className="text-white/80 cursor-pointer hover:text-white transition">
            Login
          </button>
          <button onClick={onRegisterClick} className="rounded-full bg-primary cursor-pointer px-5 py-2 text-white transition hover:scale-105 hover:bg-accent">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          absolute top-full mt-2 w-[95%]
          md:hidden overflow-hidden
          rounded-3xl
          bg-card/95
          backdrop-blur-xl
          border border-white/10
          transition-all duration-300
          ${
            menuOpen
              ? "max-h-100 p-6 opacity-100"
              : "max-h-0 p-0 opacity-0 border-0"
          }
        `}
      >
        <div className="flex flex-col gap-5">
          {links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`} 
              onClick={(e) => handleScrollToSection(e, item.id)} 
              className="text-white/80 hover:text-accent transition"
            >
              {item.title}
            </a>
          ))}

          <hr className="border-white/10" />

          <button onClick={() => {
            onLoginClick();
            setMenuOpen(false);
          }} className="text-left font-mono text-white/80 hover:text-white">
            Login
          </button>
          <button onClick={() => {
            onRegisterClick();
            setMenuOpen(false);
          }} className="rounded-full font-mono cursor-pointer bg-primary px-5 py-2 text-white">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}