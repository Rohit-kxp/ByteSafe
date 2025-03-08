import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone, Clock, MapPin, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const supportHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
  { day: "Sunday", hours: "Closed" },
];

const locations = [
  { city: "New York", address: "123 Security Ave" },
  { city: "London", address: "456 Cyber Street" },
  { city: "Tokyo", address: "789 Digital Road" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    // In a real application, this would send an email to FinovateXone@outlook.com
    console.log('Sending email to FinovateXone@outlook.com', data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <Header />
      <div className="pt-24 p-8">
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
              <p className="text-gray-600">Get in touch with our security experts</p>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {!submitted ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="border-2" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" className="border-2" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input {...field} className="border-2" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="border-2" rows={4} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                      >
                        Send Message
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-green-50 text-green-700 rounded-lg"
                  >
                    <Shield className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Message Received!</h3>
                    <p>Thank you for reaching out. Our security team will get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support Hours</h3>
                  <div className="space-y-4">
                    {supportHours.map((schedule) => (
                      <motion.div
                        key={schedule.day}
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <Clock className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">{schedule.day}</p>
                          <p className="text-sm text-gray-600">{schedule.hours}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Our Locations</h3>
                  <div className="space-y-4">
                    {locations.map((location) => (
                      <motion.div
                        key={location.city}
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{location.city}</p>
                          <p className="text-sm text-gray-600">{location.address}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-purple-100 to-blue-100">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Emergency Support</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      For urgent security-related inquiries:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="text-sm">+1 (800) BYTESAFE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">emergency@bytesafe.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}