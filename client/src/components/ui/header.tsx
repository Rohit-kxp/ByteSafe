import { User, HelpCircle, MessageSquare, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./logo";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: MessageSquare, label: "Contact Us", href: "/contact" },
];

export function Header() {
  const { toast } = useToast();

  const handleKeyGenerator = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "The key generator feature will be available soon!",
    });
  };

  return (
    <motion.header 
      className="w-full py-2 px-8 flex justify-between items-center bg-white/95 backdrop-blur-sm fixed top-0 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Link href="/">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Logo />
        </motion.div>
      </Link>

      <nav>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <motion.a 
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.a>
              </Link>
            </li>
          ))}
          <li>
            <motion.a 
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleKeyGenerator}
            >
              <Key className="h-5 w-5" />
              <span className="font-medium">Key Generator</span>
            </motion.a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}