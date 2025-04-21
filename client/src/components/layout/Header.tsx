import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X,
  ChevronDown,
  Flag
} from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const isAuthPage = location === "/auth";
  const isHomePage = location === "/";
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-3 shadow-md" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Freecharge-inspired Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 p-[2px] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full rounded-lg bg-black flex items-center justify-center">
                <span className="text-xl font-bold text-amber-400">R</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col leading-tight"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-transparent bg-clip-text">
                Reconcile
              </span>
              <span className="text-sm font-bold text-amber-500/80 -mt-1">AI</span>
            </motion.div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" isActive={isHomePage}>Home</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          
          {/* CTA */}
          <div className="hidden md:block">
            {!isAuthPage && (
              localStorage.getItem("authenticated") ? (
                <Button 
                  className="btn-primary"
                  onClick={() => {
                    localStorage.removeItem("authenticated");
                    localStorage.removeItem("userType");
                    window.location.href = '/';
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/auth">
                  <Button className="btn-primary">
                    Login
                  </Button>
                </Link>
              )
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-black/95 backdrop-blur-md py-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4">
              <motion.div className="flex flex-col space-y-3" variants={menuVariants}>
                <MobileNavLink href="/" variants={itemVariants}>Home</MobileNavLink>
                <MobileNavLink href="/features" variants={itemVariants}>Features</MobileNavLink>
                <MobileNavLink href="/pricing" variants={itemVariants}>Pricing</MobileNavLink>
                <MobileNavLink href="/about" variants={itemVariants}>About</MobileNavLink>
                <MobileNavLink href="/contact" variants={itemVariants}>Contact</MobileNavLink>
                
                {!isAuthPage && (
                  <motion.div variants={itemVariants} className="pt-2">
                    <Link href="/auth">
                      <Button className="w-full btn-primary">
                        Login
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink = ({ href, children, isActive }: NavLinkProps) => {
  return (
    <Link href={href}>
      <div className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-amber-400 cursor-pointer group">
        {children}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
          } transition-opacity duration-300`}
          layoutId={isActive ? "navIndicator" : undefined}
        />
      </div>
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  variants: any;
}

const MobileNavLink = ({ href, children, variants }: MobileNavLinkProps) => {
  return (
    <motion.div variants={variants}>
      <Link href={href}>
        <div className="block px-4 py-2 text-base font-medium transition-colors hover:bg-slate-800 rounded-md cursor-pointer">
          {children}
        </div>
      </Link>
    </motion.div>
  );
};

export default Header;