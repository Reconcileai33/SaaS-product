import { motion } from "framer-motion";
import { Link } from "wouter";
import { Flag, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-slate-950 pb-4 overflow-hidden">
      {/* Background Gradient Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          className="py-12 px-6 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800 -mt-20 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Stay Updated</h3>
              <p className="text-muted-foreground mt-2">
                Subscribe to our newsletter to receive the latest updates about product features, reconciliation tips, and industry insights.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700"
                />
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-[2px] mr-2">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Flag className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                AIReconciler
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              India's first AI-powered reconciliation platform. Making financial reconciliation seamless for individuals and businesses.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full border-slate-700">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-slate-700">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-slate-700">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/features">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Features</div>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Pricing</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">About Us</div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contact</div>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Terms of Service</div>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Privacy Policy</div>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Cookie Policy</div>
                </Link>
              </li>
              <li>
                <Link href="/data-protection">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Data Protection</div>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Refund Policy</div>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Tech Park, Electronic City<br />
                  Bengaluru, Karnataka 560100<br />
                  India
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <a href="mailto:info@aireconciler.ai" className="text-muted-foreground hover:text-primary transition-colors">
                  info@aireconciler.ai
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Footer Bottom */}
        <motion.div 
          className="pt-8 mt-8 border-t border-slate-800 text-center text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <p>
            © {currentYear} AIReconciler Technology Pvt Ltd. All rights reserved.
          </p>
          <p className="mt-2">
            Made with ❤️ in India. Designed for global businesses.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;