import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Fingerprint, Hand, HelpCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const categories = [
  {
    title: "Getting Started",
    icon: HelpCircle,
    items: [
      "How to set up your account",
      "Setting up two-factor authentication",
      "Understanding security levels",
      "Managing your profile"
    ]
  },
  {
    title: "Biometric Security",
    icon: Fingerprint,
    items: [
      "Face verification setup",
      "When to use biometric login",
      "Troubleshooting biometric issues",
      "Privacy and data storage"
    ]
  },
  {
    title: "Device Management",
    icon: Lock,
    items: [
      "Adding new devices",
      "Removing old devices",
      "Location-based security",
      "Device encryption guide"
    ]
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <Header />
      <div className="pt-24 p-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="backdrop-blur-lg bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Help Center</CardTitle>
              <p className="text-gray-600">Get started with ByteSafe security features</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-purple-600" />
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <motion.li
                          key={item}
                          className="flex items-start gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <Button
                            variant="ghost"
                            className="text-left justify-start h-auto py-2"
                          >
                            <span className="text-sm">{item}</span>
                          </Button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="md:col-span-2"
                >
                  <Card className="bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-purple-600" />
                        <h3 className="text-lg font-semibold">Need More Help?</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Our security experts are available 24/7 to assist you with any questions or concerns.
                        Visit our contact page to get in touch.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}