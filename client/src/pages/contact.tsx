import { motion } from "framer-motion";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
    }, 1000);
  };
  
  const gradientText = "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500";
  
  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <main className="pt-32 pb-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={pageContainerVariants}
          className="container mx-auto px-4"
        >
          <motion.div 
            variants={pageItemVariants}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className={gradientText}>Touch</span>
            </h1>
            <p className="text-xl text-gray-400">
              Have questions or need assistance? We're here to help!
            </p>
          </motion.div>
          
          <motion.div variants={pageItemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-400 mb-4">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="min-h-[150px] bg-slate-800 border-slate-700"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-gray-400">
                      123 Tech Park, Electronic City<br />
                      Bengaluru, Karnataka 560100<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-400">
                      <a href="mailto:info@aireconciler.ai" className="hover:text-primary transition-colors">info@aireconciler.ai</a><br />
                      <a href="mailto:support@aireconciler.ai" className="hover:text-primary transition-colors">support@aireconciler.ai</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-400">
                      <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a> (Main)<br />
                      <a href="tel:+919876543211" className="hover:text-primary transition-colors">+91 98765 43211</a> (Support)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Google Map Embed (Placeholder) */}
          <motion.div variants={pageItemVariants} className="rounded-xl overflow-hidden h-96 border border-slate-800 mb-16">
            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
              <p className="text-gray-400">Google Maps Embed Would Go Here</p>
            </div>
          </motion.div>
          
          {/* FAQs */}
          <motion.div variants={pageItemVariants} className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 p-4">
                <h3 className="font-semibold mb-2">How quickly can I get started with AIReconciler?</h3>
                <p className="text-gray-400">
                  You can sign up and start using basic features within minutes. For business accounts with custom integrations, our onboarding team will help you get set up within 24-48 hours.
                </p>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 p-4">
                <h3 className="font-semibold mb-2">Do you support all Indian banks and payment gateways?</h3>
                <p className="text-gray-400">
                  Yes, we support all major Indian banks and payment gateways including HDFC, ICICI, SBI, Axis, Kotak, Razorpay, PayU, CCAvenue, and more.
                </p>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 p-4">
                <h3 className="font-semibold mb-2">Is my financial data secure with AIReconciler?</h3>
                <p className="text-gray-400">
                  Absolutely. We use bank-level encryption and security measures to protect your data. We are compliant with all Indian data protection regulations and never store sensitive bank credentials.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}