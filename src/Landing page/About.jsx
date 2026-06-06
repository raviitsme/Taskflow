export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-bg py-32 text-white"
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          right-0
          top-1/2
          h-125
          w-125
          -translate-y-1/2
          rounded-full
          bg-primary/20
          blur-[150px]
        "
      />

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-2 items-center">

          {/* Left Content */}
          <div>
            <span
              className="
                rounded-full
                border
                border-primary/20
                bg-primary/10
                px-4
                py-2
                text-sm
                text-accent
              "
            >
              About TaskFlow
            </span>

            <h2 className="mt-6 font-headings text-5xl md:text-6xl font-bold leading-tight">
              Work Smarter,
              <span className="block text-primary">
                Not Harder
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-white/60">
              TaskFlow was designed to eliminate chaos from project
              management. Whether you're working alone or managing an
              entire team, our platform helps you organize tasks,
              collaborate effectively, and stay focused on what matters.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-white/60">
              From planning and scheduling to tracking progress and
              meeting deadlines, everything is available in one
              intuitive workspace.
            </p>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-4xl font-bold text-primary">
                  10K+
                </h3>
                <p className="text-white/50">
                  Tasks Managed
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-success">
                  500+
                </h3>
                <p className="text-white/50">
                  Teams
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-warning">
                  99%
                </h3>
                <p className="text-white/50">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Main Card */}
            <div
              className="
                rounded-4xl
                border
                border-white/10
                bg-card/70
                p-8
                backdrop-blur-xl
              "
            >
              <h3 className="mb-6 text-2xl font-bold">
                Why Teams Choose Us
              </h3>

              <div className="space-y-5">
                <div className="rounded-2xl bg-surface p-5">
                  <h4 className="font-semibold text-primary">
                    Organized Workflow
                  </h4>

                  <p className="mt-2 text-white/60">
                    Keep projects structured and easy to manage.
                  </p>
                </div>

                <div className="rounded-2xl bg-surface p-5">
                  <h4 className="font-semibold text-success">
                    Real-Time Collaboration
                  </h4>

                  <p className="mt-2 text-white/60">
                    Work together seamlessly from anywhere.
                  </p>
                </div>

                <div className="rounded-2xl bg-surface p-5">
                  <h4 className="font-semibold text-warning">
                    Smart Tracking
                  </h4>

                  <p className="mt-2 text-white/60">
                    Stay updated with progress and deadlines.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div
              className="
                absolute
                -bottom-8
                -right-8
                hidden
                md:block
                rounded-3xl
                border
                border-white/10
                bg-card
                px-6
                py-4
                shadow-2xl
              "
            >
              <p className="text-sm text-white/50">
                Productivity Boost
              </p>

              <h3 className="text-3xl font-bold text-primary">
                +45%
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}