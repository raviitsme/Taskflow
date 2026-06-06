import { CTAButton } from "../components/Buttons";

export default function Contact() {
  return (
    <section
      id="contact-us"
      className="relative overflow-hidden bg-bg py-32 text-white"
    >
      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-125
          w-125
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/20
          blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        <div className="mb-20 text-center">
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
            Contact Us
          </span>

          <h2 className="mt-6 font-headings text-5xl font-bold md:text-7xl">
            Let's Build Better
            <span className="block text-primary">
              Workflows Together
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Have questions, suggestions, or need support?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
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
            <h3 className="mb-8 text-3xl font-bold">
              Send a Message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-surface
                  px-5
                  py-4
                  outline-none
                  transition
                  focus:border-primary
                "
              />

              <input
                type="email"
                placeholder="Your Email"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-surface
                  px-5
                  py-4
                  outline-none
                  transition
                  focus:border-primary
                "
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-surface
                  px-5
                  py-4
                  outline-none
                  resize-none
                  transition
                  focus:border-primary
                "
              />

              <CTAButton
                type="submit"
                className="
                  bg-primary hover:text-black hover:rounded-3xl
                "
              >
                Send Message
              </CTAButton>
            </form>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center gap-6">
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-card/70
                p-6
              "
            >
              <h3 className="text-xl font-bold text-primary">
                Email
              </h3>

              <p className="mt-2 text-white/60">
                support@taskflow.com
              </p>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-card/70
                p-6
              "
            >
              <h3 className="text-xl font-bold text-success">
                Phone
              </h3>

              <p className="mt-2 text-white/60">
                +91 98765 43210
              </p>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-card/70
                p-6
              "
            >
              <h3 className="text-xl font-bold text-warning">
                Support Hours
              </h3>

              <p className="mt-2 text-white/60">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}