import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, UserPlus, User, Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation, verifyBiometricMutation } = useAuth();
  const [currentStep, setCurrentStep] = useState<"credentials" | "biometric" | "device">("credentials");
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
    // Get device info on mount
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
    if (currentStep === "credentials") {
      const result = await loginMutation.mutateAsync(data);
      if (result.requiresBiometric) {
        setCurrentStep("biometric");
      }
    } else if (currentStep === "biometric") {
      const result = await verifyBiometricMutation.mutateAsync();
      if (result.verified) {
        setCurrentStep("credentials");
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-4xl grid md:grid-cols-2 gap-6 p-6">
        <div className="flex flex-col justify-center space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              ByteSafe Authentication
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Secure your digital presence with advanced multi-factor authentication
            </p>
          </CardHeader>

          <div className="prose prose-sm">
            <h3>ByteSafe Security Features</h3>
            <ul>
              <li>Multi-factor authentication</li>
              <li>Biometric verification</li>
              <li>Location-based security</li>
              <li>Device management</li>
            </ul>
          </div>
        </div>

        <div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={onLoginSubmit} className="space-y-4">
                  {currentStep === "credentials" && (
                    <>
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === "biometric" && (
                    <div className="flex flex-col items-center gap-4 py-8">
                      <Fingerprint className="h-16 w-16 text-primary animate-pulse" />
                      <p className="text-center text-sm text-muted-foreground">
                        Verify your identity using biometrics
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : currentStep === "biometric" ? (
                      "Verify Biometrics"
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={onRegisterSubmit} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input type="email" {...field} />
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
                          <Input {...field} />
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
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Register"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}