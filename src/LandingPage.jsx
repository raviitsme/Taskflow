import { useState } from "react";

import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";

import Hero from "./Landing page/Hero";
import Features from "./Landing page/Features";
import About from "./Landing page/About";
import Contact from "./Landing page/Contact";
import Footer from "./Landing page/Footer";
import RegisterForm from "./components/RegisterForm";

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login')

  return (
    <>
      <Navbar
        onLoginClick={() => {
            setAuthMode('login');
            setAuthOpen(true);
        }}
        onRegisterClick={() => {
            setAuthMode('register');
            setAuthOpen(true);
        }}
      />

      <Modal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        title={authMode === "login" ? "Welcome back" : "Create Account"}
      >
        {authMode === "login" ? (
            <LoginForm switchToRegister={() => setAuthMode('register')}/>
        ) : (
            <RegisterForm switchToLogin={() => setAuthMode('login')} />
        )}
      </Modal>

      <Hero onRegisterClick={() => {
        setAuthMode('register');
        setAuthOpen(true);
      }} />
      <Features />
      <About />
      <Contact />
      <Footer />
    </>
  );
}