import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Input } from "./input";
import { Card } from "./card";

const defaultResponses = {
  "hello": "Hello! How can I help you with ByteSafe security features?",
  "help": "I can help you with account setup, security features, or technical support. What do you need assistance with?",
  "security": "ByteSafe offers multiple security features including biometric authentication, gesture verification, and location-based security. Which one would you like to learn more about?",
  "biometric": "Our biometric authentication uses facial recognition for enhanced security. Would you like to know how to set it up?",
  "gesture": "Gesture verification adds an extra layer of security by requiring specific hand movements. Need help configuring it?",
  "location": "Location-based security helps protect your account by verifying login attempts from new locations. Want to learn more?",
  "default": "I'm not sure about that. Could you try rephrasing your question or choose from our common topics: security, biometric, gesture, or location?"
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm your ByteSafe assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { text: input, isUser: true }
    ];

    // Simple response logic
    const lowercaseInput = input.toLowerCase();
    let response = defaultResponses.default;
    for (const [key, value] of Object.entries(defaultResponses)) {
      if (lowercaseInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages([...newMessages, { text: response, isUser: false }]);
    }, 500);

    setInput("");
    setMessages(newMessages);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 z-50"
          >
            <Card className="backdrop-blur-lg bg-white/90">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">ByteSafe Assistant</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4">
                  {messages.map((message, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
