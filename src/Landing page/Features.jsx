import { 
  CheckCircle2, 
  Users, 
  Clock, 
  BarChart3, 
  Smartphone, 
  ShieldCheck 
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Smart Task Management",
      description: "Create, organize and prioritize tasks with an intuitive workflow.",
      icon: <CheckCircle2 className="w-7 h-7 text-primary" />,
    },
    {
      title: "Team Collaboration",
      description: "Assign tasks, share updates and collaborate in real-time.",
      icon: <Users className="w-7 h-7 text-sky-400" />,
    },
    {
      title: "Deadline Tracking",
      description: "Never miss important deadlines with reminders and schedules.",
      icon: <Clock className="w-7 h-7 text-amber-400" />,
    },
    {
      title: "Analytics Dashboard",
      description: "Track productivity, monitor progress and gain valuable insights.",
      icon: <BarChart3 className="w-7 h-7 text-emerald-400" />,
    },
    {
      title: "Cross Platform",
      description: "Access your projects seamlessly from desktop, tablet and mobile.",
      icon: <Smartphone className="w-7 h-7 text-purple-400" />,
    },
    {
      title: "Secure Storage",
      description: "Industry-grade encryption keeps your projects safe and protected.",
      icon: <ShieldCheck className="w-7 h-7 text-rose-400" />,
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-bg py-32 text-white scroll-mt-20"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
            bg-size-[60px_60px]
          "
        />
      </div>

      {/* Main Ambient Glow */}
      <div
        className="
          absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2
          h-125 w-125 rounded-full
          bg-primary/15 blur-[150px] pointer-events-none
        "
      />

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        {/* Heading */}
        <div className="mb-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-md">
            Powerful Features
          </span>

          <h2 className="mt-6 font-headings text-5xl font-bold tracking-tight md:text-7xl">
            Built For{" "}
            <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern Productivity
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
            Powerful tools designed to help individuals and teams organize,
            track, and accomplish more every day.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:pb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                group relative overflow-hidden
                rounded-[2.5rem] border border-white/10
                bg-card/40 p-8 backdrop-blur-md
                transition-all duration-500 ease-out

                hover:-translate-y-3
                hover:border-primary/30
                hover:bg-card/60
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]

                ${index === 1 || index === 4 ? "lg:translate-y-8" : ""}
              `}
            >
              {/* Dynamic Border Trail */}
              <div
                className="
                  absolute left-0 top-0 h-0.5 w-0
                  bg-linear-to-r from-primary to-accent
                  transition-all duration-500 group-hover:w-full
                "
              />

              {/* Icon Container */}
              <div
                className="
                  mb-8 flex h-14 w-14 items-center justify-center
                  rounded-2xl border border-white/5 bg-white/3
                  transition-all duration-500 shadow-inner
                  group-hover:scale-110 group-hover:border-primary/20 group-hover:bg-primary/10
                "
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-primary">
                {feature.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-white/50 transition-colors group-hover:text-white/70">
                {feature.description}
              </p>

              {/* Precise Radial Glow on Hover */}
              <div
                className="
                  absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2
                  rounded-full bg-primary/20 blur-2xl
                  opacity-0 transition-opacity duration-500 pointer-events-none
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>

        {/* Bottom Stats Container */}
        <div
          className="
            mt-20 grid gap-8 rounded-[2.5rem]
            border border-white/5 bg-card/20
            p-10 backdrop-blur-md md:grid-cols-3
            divide-y divide-white/5 md:divide-y-0 md:divide-x
          "
        >
          <div className="text-center md:px-4">
            <h3 className="text-5xl font-bold bg-linear-to-b from-white to-primary bg-clip-text text-transparent">
              10K+
            </h3>
            <p className="mt-2 text-sm font-medium tracking-wide uppercase text-white/40">
              Tasks Managed
            </p>
          </div>

          <div className="text-center pt-6 md:pt-0 md:px-4 border-white/5">
            <h3 className="text-5xl font-bold bg-linear-to-b from-white to-cyan-400 bg-clip-text text-transparent">
              500+
            </h3>
            <p className="mt-2 text-sm font-medium tracking-wide uppercase text-white/40">
              Active Teams
            </p>
          </div>

          <div className="text-center pt-6 md:pt-0 md:px-4 border-white/5">
            <h3 className="text-5xl font-bold bg-linear-to-b from-white to-amber-400 bg-clip-text text-transparent">
              99%
            </h3>
            <p className="mt-2 text-sm font-medium tracking-wide uppercase text-white/40">
              Satisfaction Rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}