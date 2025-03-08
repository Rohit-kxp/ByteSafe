import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-cyan-400/30" />
      
      {/* Animated circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: i * 5,
            ease: "easeInOut",
          }}
          style={{
            left: `${i * 30}%`,
            top: `${i * 20}%`,
          }}
        />
      ))}

      {/* Moving particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/30"
          animate={{
            y: ["0vh", "100vh"],
            x: [
              `${Math.random() * 100}vw`,
              `${Math.random() * 100}vw`,
            ],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
