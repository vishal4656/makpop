"use client";

import { useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-cream-50 min-h-screen relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blush-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
         {/* Map Texture (CSS Pattern) */}
         <div className="absolute inset-0 opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-cover mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <SectionHeading 
            title="Get in Touch"
            subtitle="We'd love to hear from you"
          />
          <p className="mt-4 text-charcoal-700 font-medium max-w-xl mx-auto">
            Have a question about our flavors, bulk orders, or just want to say hi? 
            Drop us a message and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto items-start">
          
          {/* --- Left: Contact Form --- */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden relative">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-600 to-green-400" />
              
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-charcoal-900">Name</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-cream-50/50 border-gray-300 text-charcoal-900 placeholder:text-gray-500 focus:border-green-600 focus:ring-green-500/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-charcoal-900">Phone</label>
                      <Input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-cream-50/50 border-gray-300 text-charcoal-900 placeholder:text-gray-500 focus:border-green-600 focus:ring-green-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-charcoal-900">Email</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="bg-cream-50/50 border-gray-300 text-charcoal-900 placeholder:text-gray-500 focus:border-green-600 focus:ring-green-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-charcoal-900">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-md border border-gray-300 bg-cream-50/50 px-4 py-3 text-sm text-charcoal-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all resize-none"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className={`w-full text-base font-bold text-white transition-all duration-300 ${status === "success" ? "bg-green-600 hover:bg-green-700" : "bg-green-900 hover:bg-green-800"}`}
                    disabled={status === "submitting" || status === "success"}
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2 text-white">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : status === "success" ? (
                      <span className="flex items-center gap-2 text-white">
                        <CheckCircle2 className="w-5 h-5" />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-white">
                        Send Message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- Right: Info Cards --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Online Status Indicator */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 bg-white px-4 py-2 rounded-full w-fit shadow-sm border border-green-100 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-green-900">Support Online Now</span>
            </motion.div>

            {[
              {
                icon: Mail,
                title: "Email Us",
                lines: ["hello@makpop.com", "support@makpop.com"],
                color: "bg-blue-50 text-blue-600",
                delay: 0
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+91 98765 43210", "Mon-Sat, 9 AM - 6 PM"],
                color: "bg-amber-50 text-amber-600",
                delay: 0.1
              },
              {
                icon: MapPin,
                title: "Visit HQ",
                lines: ["123, Green Park, New Delhi", "India - 110016"],
                color: "bg-rose-50 text-rose-600",
                delay: 0.2
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.9)" }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-5 cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-green-950 mb-1">{item.title}</h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-charcoal-700 text-sm font-medium">{line}</p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Response Time Note */}
            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-2 text-charcoal-600 text-sm">
               <Clock className="w-4 h-4" />
               <span>Avg. response time: <strong className="text-green-900">2 Hours</strong></span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}