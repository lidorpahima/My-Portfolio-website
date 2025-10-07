import HeroImg from "@/assets/images/hero.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Junior Full‑Stack Developer • AI & Automation
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="Developer illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hello! I&apos;m Lidor Pahima, a junior Full‑Stack Developer who recently completed a B.Sc. in Computer Science (AI major). I like building clean, reliable systems and keeping things simple and maintainable.
              </p>
              <p className="text-white">
                I work across frontend and backend with Python, JavaScript/TypeScript, and modern web tools. I enjoy small automations that save time, and I&apos;m currently gaining hands‑on experience building MVPs and improving performance.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I&apos;m excited about using AI where it makes sense and focusing on real, measurable improvements—better load times, clearer structure, and a smoother user experience.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Lidor Pahima, Full‑Stack Developer
                    </cite>

                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
