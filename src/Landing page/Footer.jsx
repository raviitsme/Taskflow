export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg text-white">
      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-headings text-4xl font-bold">
              <span className="text-primary">Task</span>Flow
            </h2>

            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              Simplifying task management for individuals,
              teams, and businesses. Stay organized,
              productive, and focused on what matters most.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Product
            </h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <a href="#" className="hover:text-primary">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Roadmap
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Company
            </h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <a href="#" className="hover:text-primary">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Resources
            </h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <a href="#" className="hover:text-primary">
                  Docs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Support
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Privacy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-primary">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-white/50">
            © 2026 TaskFlow. All rights reserved.
          </p>

          <div className="flex gap-6 text-white/60">
            <a
              href="#"
              className="transition hover:text-primary"
            >
              GitHub
            </a>

            <a
              href="#"
              className="transition hover:text-primary"
            >
              Twitter
            </a>

            <a
              href="#"
              className="transition hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}