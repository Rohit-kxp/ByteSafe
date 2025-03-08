import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, UserPlus, User, Fingerprint, Key, MapPin, Hand, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/ui/header";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation, verifyBiometricMutation, registerDeviceMutation } = useAuth();
  const [step, setStep] = useState<"credentials" | "biometric" | "gesture" | "encryption">("credentials");
  const [deviceInfo, setDeviceInfo] = useState<{deviceId: string, location: string}>();

  useEffect(() => {
    if (user) setLocation("/");
  }, [user, setLocation]);

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      location: "",
      deviceId: "",
    },
  });

  useEffect(() => {
    const deviceId = crypto.randomUUID();
    navigator.geolocation.getCurrentPosition((position) => {
      const location = `${position.coords.latitude},${position.coords.longitude}`;
      setDeviceInfo({ deviceId, location });
      loginForm.setValue("deviceId", deviceId);
      loginForm.setValue("location", location);
    });
  }, []);

  const onRegisterSubmit = registerForm.handleSubmit((data) => {
    registerMutation.mutate(data);
  });

  const onLoginSubmit = loginForm.handleSubmit(async (data) => {
    if (step === "credentials") {
      const result = await loginMutation.mutateAsync(data);
      if (result.requiresNewDevice) {
        setStep("encryption");
      } else if (!result.faceVerified) {
        setStep("biometric");
      } else if (!result.gestureVerified) {
        setStep("gesture");
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <Header />
      <div className="pt-24 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-4xl grid md:grid-cols-2 gap-6 p-6 backdrop-blur-lg bg-white/90">
            <div className="flex flex-col justify-center space-y-6">
              <div className="p-0">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/*Logo removed as per edited code*/}
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50 text-purple-700">
                    <Fingerprint className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Biometric Auth</h3>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-blue-50 text-blue-700">
                    <Hand className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Gesture Verify</h3>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-cyan-50 text-cyan-700">
                    <MapPin className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Location Check</h3>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-indigo-50 text-indigo-700">
                    <Key className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Device Control</h3>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={fadeIn}
                  >
                    <TabsContent value="login">
                      <Form {...loginForm}>
                        <form onSubmit={onLoginSubmit} className="space-y-4">
                          {step === "credentials" && (
                            <motion.div {...fadeIn} className="space-y-4">
                              <FormField
                                control={loginForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                      <Input {...field} className="border-2" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} className="border-2" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                          )}

                          {step === "biometric" && (
                            <motion.div
                              {...fadeIn}
                              className="flex flex-col items-center gap-6 py-8"
                            >
                              <Camera className="h-24 w-24 text-blue-500 animate-pulse" />
                              <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Face Verification</h3>
                                <p className="text-sm text-gray-600">
                                  Please look at the camera for facial verification
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {step === "gesture" && (
                            <motion.div
                              {...fadeIn}
                              className="flex flex-col items-center gap-6 py-8"
                            >
                              <Hand className="h-24 w-24 text-purple-500 animate-pulse" />
                              <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Gesture Verification</h3>
                                <p className="text-sm text-gray-600">
                                  Please perform your registered hand gesture
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {step === "encryption" && (
                            <motion.div
                              {...fadeIn}
                              className="flex flex-col items-center gap-6 py-8"
                            >
                              <Key className="h-24 w-24 text-cyan-500 animate-pulse" />
                              <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">New Device Detected</h3>
                                <p className="text-sm text-gray-600">
                                  Please enter your encryption key to register this device
                                </p>
                              </div>
                              <Input
                                type="password"
                                placeholder="Encryption Key"
                                className="max-w-xs border-2"
                              />
                            </motion.div>
                          )}

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                              </motion.div>
                            ) : (
                              step === "credentials" ? "Login" :
                                step === "biometric" ? "Verify Face" :
                                  step === "gesture" ? "Verify Gesture" :
                                    "Register Device"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="register">
                      <Form {...registerForm}>
                        <form onSubmit={onRegisterSubmit} className="space-y-4">
                          <motion.div {...fadeIn} className="space-y-4">
                            <FormField
                              control={registerForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="border-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" {...field} className="border-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="border-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" {...field} className="border-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                              </motion.div>
                            ) : (
                              "Register"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}