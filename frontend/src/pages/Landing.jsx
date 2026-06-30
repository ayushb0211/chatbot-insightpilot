// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div className="landing glass">

//       <motion.div
//         className="hero"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.h1
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           Dive Inside
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.35 }}
//         >
//           Chat with your documents using AI
//         </motion.p>

//         <motion.button
//           whileHover={{
//             scale: 1.05,
//             boxShadow: "0 0 30px rgba(124,92,252,0.5)",
//           }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/chat")}
//         >
//           Start Chat →
//         </motion.button>
//       </motion.div>

//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const main = document.getElementById("landing-main");

    const handleMouseMove = (e) => {
      if (!main) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;

      main.style.transform = `translate3d(${moveX}px, ${moveY}px,0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  const createRipple = (e) => {
    const button = e.currentTarget;

    const circle = document.createElement("span");

    const diameter = Math.max(
      button.clientWidth,
      button.clientHeight
    );

    const radius = diameter / 2;

    circle.style.width =
      circle.style.height = `${diameter}px`;

    circle.style.left = `${
      e.clientX -
      button.getBoundingClientRect().left -
      radius
    }px`;

    circle.style.top = `${
      e.clientY -
      button.getBoundingClientRect().top -
      radius
    }px`;

    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName(
      "ripple"
    )[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    navigate("/chat");
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* Navigation */}

      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6">

        <div className="flex items-center gap-3">

          {/* <div className="w-9 h-9 rounded-xl bg-violet-500 flex items-center justify-center"> */}

            {/* <span className="material-symbols-outlined text-white">
              auto_awesome
            </span> */}

          {/* </div> */}

          {/* <h2 className="text-2xl font-bold">
            Dive Inside
          </h2> */}

        </div>

        {/* <div className="hidden md:flex gap-8 text-zinc-300">

          <button>Features</button>

          <button>Security</button>

          <button>Pricing</button>

        </div> */}

        {/* <button className="glass-card px-5 py-2 rounded-full hover:bg-white/10 transition">

          Sign In

        </button> */}

      </nav>

      {/* Hero */}

      <motion.main
        id="landing-main"
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >

        <div className="max-w-4xl">

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
          >

            <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse"></div>

            <span className="text-xs uppercase tracking-[0.3em] text-violet-300">

              v2.0 Intelligence Now Live

            </span>

          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="text-7xl font-bold tracking-tight md:text-8xl"
          >

            Dive Inside

          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.45,
            }}
            className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-zinc-300"
          >

            Experience the future of document interaction.
            Chat, analyze and synthesize insights from
            your knowledge base using AI.

          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
            }}
            className="mt-12 flex flex-col items-center gap-6"
          >

            <button
              onClick={createRipple}
              className="glow-button relative overflow-hidden rounded-full bg-violet-500 px-10 py-5 text-lg font-semibold text-white"
            >
              <span className="flex items-center gap-3">

                Start Chat

                {/* <span className="material-symbols-outlined">
                  arrow_forward
                </span> */}

              </span>

            </button>
                        <div className="flex items-center gap-8 text-sm text-zinc-400">

              <div className="flex items-center gap-2">

                {/* <span className="material-symbols-outlined text-base">
                  verified_user
                </span> */}

                {/* <span>Private &amp; Secure</span> */}

              </div>

              <div className="flex items-center gap-2">

                {/* <span className="material-symbols-outlined text-base">
                  bolt
                </span> */}

                {/* <span>Instant Processing</span> */}

              </div>

            </div>

          </motion.div>

        </div>

      </motion.main>

      {/* Decorative Sidebar */}

      <aside className="fixed bottom-12 left-6 z-20 hidden lg:block">

        <div className="flex flex-col items-center gap-4">

          {/* <div className="h-14 w-1 overflow-hidden rounded-full bg-violet-500/20">

            <div className="h-1/2 w-full animate-bounce bg-violet-500"></div>

          </div> */}

          {/* <span
            className="text-[10px] uppercase tracking-[0.25em] text-violet-300/50"
            style={{
              writingMode: "vertical-rl",
            }}
          >
            Scroll For More
          </span> */}

        </div>

      </aside>

      {/* Footer */}

      <footer className="fixed bottom-0 left-0 z-30 flex w-full items-center justify-between px-8 py-6">

        {/* <div className="glass-card rounded-xl px-4 py-2 text-xs text-zinc-400">

          © 2026 Dive Inside

        </div> */}

        <div className="flex gap-3">

          <button className="glass-card flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10">

            {/* <span className="material-symbols-outlined">
              terminal
            </span> */}

          </button>

          <button className="glass-card flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10">

            {/* <span className="material-symbols-outlined">
              help_outline
            </span> */}

          </button>

        </div>

      </footer>

    </div>
  );
}