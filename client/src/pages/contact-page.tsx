import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
              <p className="text-gray-600">Get in touch with our security experts</p>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Send us a message
                  </h3>
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Name</label>
                        <Input className="mt-1" required />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <Input type="email" className="mt-1" required />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Message</label>
                        <Textarea className="mt-1" rows={4} required />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                        Send Message
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg"
                    >
                      Thank you for your message! We'll get back to you soon.
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Other ways to reach us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">support@bytesafe.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-purple-100 to-blue-100">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Security Support</h4>
                    <p className="text-sm text-gray-600">
                      For urgent security-related inquiries, please contact our 24/7 security team.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
