import { CTAButton, GhostButton } from "../components/Buttons";

export default function Hero({ onRegisterClick }) {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-bg text-white"
    >
      {/* Glow */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          size-112.5
          lg:size-175
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-radial
          from-primary/60
          via-primary/20
          to-transparent
          blur-3xl
        "
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div
          className="
            grid
            w-[90%]
            lg:w-3/4
            mx-auto
            grid-cols-1
            lg:grid-cols-2
            gap-16
            items-center
            py-28
          "
        >
          {/* Left Side */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-accent backdrop-blur-sm">
              ✨ Smart Task Management
            </span>

            <h1 className="mt-6 font-headings text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
              Create
              <span className="block text-primary">Tasks</span>
              <span className="block text-white/90">Effortlessly</span>
            </h1>

            <p className="mt-6 max-w-xl font-body text-base md:text-lg leading-relaxed text-white/60">
              Organize projects, track progress, collaborate with your team, and
              never miss an important deadline again.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <CTAButton onClick={onRegisterClick} className="bg-primary hover:text-black hover:rounded-3xl">
                Get Started
              </CTAButton>

              <GhostButton onClick={() => document.getElementById('features').scrollIntoView({ behavior: "smooth" })}>Learn More</GhostButton>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
              <div>
                <h3 className="text-3xl font-bold text-primary">10K+</h3>
                <p className="text-sm text-white/50">Tasks Created</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-success">500+</h3>
                <p className="text-sm text-white/50">Teams</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-warning">99%</h3>
                <p className="text-sm text-white/50">On-Time Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex items-center justify-center">
            {/* Dashboard */}
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-card/80 p-6 backdrop-blur-xl">
              <h3 className="mb-6 text-xl font-bold">Project Dashboard</h3>

              <div className="space-y-5">
                <div className="rounded-xl bg-surface p-4">
                  <div className="mb-2 flex justify-between">
                    <span>Frontend</span>
                    <span className="text-primary">75%</span>
                  </div>

                  <div className="h-2 rounded-full bg-black/20">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                </div>

                <div className="rounded-xl bg-surface p-4">
                  <div className="mb-2 flex justify-between">
                    <span>Backend</span>
                    <span className="text-success">90%</span>
                  </div>

                  <div className="h-2 rounded-full bg-black/20">
                    <div className="h-full w-[90%] rounded-full bg-success" />
                  </div>
                </div>

                <div className="rounded-xl bg-surface p-4">
                  <div className="mb-2 flex justify-between">
                    <span>Testing</span>
                    <span className="text-warning">45%</span>
                  </div>

                  <div className="h-2 rounded-full bg-black/20">
                    <div className="h-full w-[45%] rounded-full bg-warning" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
