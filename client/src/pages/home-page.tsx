import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Shield, MapPin, Smartphone, Key, Clock } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 p-8">
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-lg bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-purple-600" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                  Welcome to ByteSafe, {user?.username}
                </span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="border-2"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Account Information</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">Email:</span>
                      {user?.email}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">Phone:</span>
                      {user?.phoneNumber}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Security Status</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-green-600">
                      <Shield className="h-4 w-4" />
                      Multi-factor authentication enabled
                    </p>
                    {user?.faceVerified && (
                      <p className="flex items-center gap-2 text-green-600">
                        <Shield className="h-4 w-4" />
                        Face verification active
                      </p>
                    )}
                    {user?.gestureVerified && (
                      <p className="flex items-center gap-2 text-green-600">
                        <Shield className="h-4 w-4" />
                        Gesture verification active
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-lg bg-white/90">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-gray-600">
                      {user?.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Last Location</p>
                    <p className="text-sm text-gray-600">
                      {user?.lastLoginLocation || 'Unknown'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                  <Key className="h-5 w-5 text-cyan-500" />
                  <div>
                    <p className="font-medium">Encryption Status</p>
                    <p className="text-sm text-gray-600">
                      {user?.encryptionKey ? 'Active' : 'Not configured'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}