import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Fingerprint, Hand } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const faqs = [
  {
    question: "How does facial recognition work?",
    answer: "Our facial recognition system uses advanced AI to create a secure biometric template of your face. This template is encrypted and stored securely.",
    icon: Fingerprint,
    color: "text-purple-500"
  },
  {
    question: "What is gesture verification?",
    answer: "Gesture verification adds an extra layer of security by requiring a specific hand gesture that you've registered during setup.",
    icon: Hand,
    color: "text-blue-500"
  },
  {
    question: "How is my data protected?",
    answer: "We use end-to-end encryption and secure storage for all your sensitive data. Your biometric data never leaves your device.",
    icon: Shield,
    color: "text-green-500"
  },
  {
    question: "What happens if I change devices?",
    answer: "You'll need to register your new device using your encryption key. This ensures only authorized devices can access your account.",
    icon: Key,
    color: "text-cyan-500"
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <Header />
      <div className="pt-24 p-8">
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="backdrop-blur-lg bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Help Center</CardTitle>
              <p className="text-gray-600">Find answers to common questions about ByteSafe security features</p>
            </CardHeader>
            <CardContent className="space-y-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <faq.icon className={`h-6 w-6 ${faq.color} mt-1`} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
