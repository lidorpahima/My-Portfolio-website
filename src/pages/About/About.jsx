import HeroImg from "@/assets/images/hero.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Full-Stack Developer, AI Enthusiast, Problem Solver
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
                Hello! I'm Lidor Pahima, a passionate Full-Stack Developer with a focus on AI and scalable systems.{" "}
                <span className="font-bold text-white">
                  Currently pursuing a B.Sc. in Computer Science with a major in Artificial Intelligence
                </span>
                , I'm dedicated to building innovative solutions that solve real-world problems.
              </p>
              <p className="text-white">
                My expertise spans both frontend and backend development, with a particular focus on Python, JavaScript, and modern web technologies. I'm currently working as a Full-Stack Developer Intern at StealthCode, where I contribute to MVP development and system architecture.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I'm passionate about combining AI with practical applications, whether it's building scalable systems or developing innovative solutions. My experience in both military service and software development has taught me the importance of precision, teamwork, and continuous learning.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Lidor Pahima, Full-Stack Developer
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
