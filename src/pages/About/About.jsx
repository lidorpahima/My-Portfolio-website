import HeroImg from "@/assets/images/hero.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 text-4xl font-medium lg:text-5xl text-white">
            Full‑Stack Developer • AI Engineer
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
                Hello! I&apos;m Lidor Pahima, a Full‑Stack Developer experienced in Node.js, React, TypeScript, and GenAI platforms. I recently completed my B.Sc. in Computer Science with a specialization in Artificial Intelligence from SCE. I&apos;m passionate about building scalable systems and optimizing performance to deliver real business value.
              </p>
              <p className="text-white">
                Currently working at StealthCode, I&apos;ve focused on developing GenAI platforms and e-commerce solutions. I enjoy tackling complex challenges from refactoring workflows to reduce processing time, to scaling systems to handle thousands of daily requests, and optimizing infrastructure costs. My approach combines technical expertise with a focus on measurable results.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I&apos;m driven by the intersection of Full‑Stack development and AI engineering. Whether it&apos;s building intelligent systems that process thousands of requests efficiently, or optimizing costs while maintaining performance, I strive to create solutions that make a real impact.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Lidor Pahima, Full‑Stack Developer & AI Engineer
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
