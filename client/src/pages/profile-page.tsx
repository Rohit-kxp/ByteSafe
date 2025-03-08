import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { motion } from "framer-motion";
import { Shield, Key, Lock, Smartphone } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProfilePage() {
  const { user } = useAuth();

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
              <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lock className="h-5 w-5 text-purple-500" />
                    Account Details
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Username</label>
                      <p className="font-medium">{user?.username}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-blue-500" />
                    Device Management
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Manage your registered devices and security preferences.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Security Status
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <Shield className="h-4 w-4" />
                      <span>Multi-factor authentication enabled</span>
                    </div>
                    {user?.faceVerified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="h-4 w-4" />
                        <span>Face verification active</span>
                      </div>
                    )}
                    {user?.gestureVerified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="h-4 w-4" />
                        <span>Gesture verification active</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Key className="h-5 w-5 text-cyan-500" />
                    Encryption Settings
                  </h3>
                  <div className="mt-4">
                    <div className="p-4 rounded-lg bg-cyan-50">
                      <p className="text-sm text-cyan-900">
                        Your data is protected with end-to-end encryption
                      </p>
                      <p className="text-xs text-cyan-700 mt-1">
                        Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
