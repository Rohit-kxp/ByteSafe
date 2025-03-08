import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export function Logo() {
  return (
    <motion.div
      className="flex flex-col items-start"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Shield className="h-10 w-10 text-purple-600" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
          ByteSafe
        </h1>
      </motion.div>
      <motion.p
        className="mt-2 text-lg text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Securing Every Byte, Protecting Every Bit
      </motion.p>
    </motion.div>
  );
}
