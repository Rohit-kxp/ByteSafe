import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Key, Copy, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function KeyGeneratorPage() {
  const { toast } = useToast();
  const [length, setLength] = useState([32]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [key, setKey] = useState("");

  const generateKey = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      (includeNumbers ? "0123456789" : "") +
      (includeSymbols ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "");
    
    const array = new Uint8Array(length[0]);
    crypto.getRandomValues(array);
    
    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset[array[i] % charset.length];
    }
    
    setKey(result);
    toast({
      title: "Key Generated",
      description: "Your secure encryption key has been generated.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied!",
      description: "Key copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <Header />
      <div className="pt-24 p-8">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Key className="h-6 w-6 text-purple-600" />
                Encryption Key Generator
              </CardTitle>
              <p className="text-gray-600">Generate secure encryption keys for your devices</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Key Length: {length[0]} characters</label>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    min={16}
                    max={64}
                    step={8}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Include Numbers</label>
                  <Switch
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Include Symbols</label>
                  <Switch
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={key}
                    readOnly
                    className="pr-24 font-mono text-sm"
                    placeholder="Generated key will appear here"
                  />
                  {key && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Button
                  onClick={generateKey}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Security Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Store your encryption key in a secure location</li>
                  <li>Never share your key with anyone</li>
                  <li>Generate a new key if you suspect compromise</li>
                  <li>Use unique keys for different devices</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
