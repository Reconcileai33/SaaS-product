import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  CheckCircle, 
  CreditCard, 
  FileText, 
  BarChart4, 
  Zap,
  Building,
  User,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['Businesses', 'Individuals', 'Banks', 'Marketplaces', 'Startups'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // CRED-like neopop golden gradient
  const gradientText = "bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500";
  
  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* CRED-style glowing orbs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/30 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-600/30 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow-2"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-amber-300/20 rounded-full filter blur-[80px] opacity-20 animate-pulse-slow-3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                India's First AI-Powered <span className={gradientText}>Reconciliation</span> Platform for{' '}
                <span className="relative inline-block">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={gradientText}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Automatically match and reconcile transactions across all your platforms and accounts with our powerful AI engine. Save time, reduce errors, and gain financial clarity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="btn-primary">
                    Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="btn-outline"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Dashboard preview with glow effect */}
              <div className="rounded-lg overflow-hidden relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 opacity-30"></div>
                <img 
                  src="/attached_assets/Reconcile dashboard 1.PNG" 
                  alt="PaySync Dashboard" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 filter blur-3xl opacity-30 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            <StatCard 
              title="Transaction Volume" 
              value="₹5+ Billion" 
              description="Monthly reconciliation volume processed"
              icon={<CreditCard className="h-6 w-6 text-purple-500" />}
            />
            <StatCard 
              title="Time Saved" 
              value="95%" 
              description="Reduction in reconciliation time"
              icon={<Zap className="h-6 w-6 text-pink-500" />}
            />
            <StatCard 
              title="Success Rate" 
              value="99.8%" 
              description="Accurate transaction matching"
              icon={<CheckCircle className="h-6 w-6 text-green-500" />}
            />
            <StatCard 
              title="Active Users" 
              value="2,500+" 
              description="Businesses & individuals using PaySync"
              icon={<BarChart4 className="h-6 w-6 text-blue-500" />}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className={gradientText}>All Users</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our platform is designed to simplify reconciliation for everyone, from individuals to large businesses.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<User className="h-8 w-8 text-blue-500" />}
              title="For Individuals"
              description="Reconcile personal accounts, credit cards, and shopping portal transactions with ease."
              features={[
                "Bank statement reconciliation",
                "Credit card expenditure tracking",
                "Shopping portal transaction matching",
                "Personal finance dashboard"
              ]}
              ctaText="Perfect for Personal Finance"
              ctaLink="/auth"
              color="blue"
            />
            
            <FeatureCard
              icon={<Building className="h-8 w-8 text-purple-500" />}
              title="For Businesses"
              description="Connect all your payment gateways, banks, and marketplaces for complete financial clarity."
              features={[
                "Multi-platform reconciliation",
                "Bulk transaction processing",
                "Beneficiary management",
                "Custom reconciliation rules"
              ]}
              ctaText="Ideal for Growing Businesses"
              ctaLink="/auth"
              color="purple"
              highlighted={true}
            />
            
            <FeatureCard
              icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
              title="For Administrators"
              description="Advanced controls, detailed analytics, and comprehensive reporting capabilities."
              features={[
                "User access management",
                "Advanced analytics dashboard",
                "Audit logs and compliance reports",
                "Custom workflow configuration"
              ]}
              ctaText="Built for Enterprise Control"
              ctaLink="/auth"
              color="green"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-slate-950/80 relative">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className={gradientText}>PaySync</span> Works
            </h2>
            <p className="text-gray-400 text-lg">
              Our simple 3-step process makes reconciliation effortless
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transform -translate-y-1/2 opacity-20"></div>
            
            <StepCard
              number="01"
              title="Connect"
              description="Connect all your platforms, payment gateways, and bank accounts securely."
              delay={0}
            />
            
            <StepCard
              number="02"
              title="Automate"
              description="Our AI automatically matches and reconciles transactions across platforms."
              delay={0.2}
            />
            
            <StepCard
              number="03"
              title="Analyze"
              description="Get insights and reports to optimize your financial operations."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Pricing CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple Pay-as-you-go <span className={gradientText}>Pricing</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              No monthly fees or hidden charges. Only pay for the transaction volume you process.
            </p>
            
            <div className="flex justify-center items-baseline mb-8">
              <span className="text-5xl font-bold text-white">₹5</span>
              <span className="text-xl text-gray-400 ml-2">per ₹1,000 transaction volume</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Unlimited reconciliations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">AI-powered matching</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Real-time notifications</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300">Advanced AI insights</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="btn-outline">
                  View Pricing Details
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" className="btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials (Optional) */}
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your <span className={gradientText}>Reconciliation Process</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have simplified their financial reconciliation with PaySync.
            </p>
            
            <Link href="/auth">
              <Button size="lg" className="btn-primary">
                Start Reconciling Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Helper Components
const StatCard = ({ title, value, description, icon }: { 
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <motion.div 
      className="p-6 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 hover:border-slate-700 transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-slate-800 p-3 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  ctaText, 
  ctaLink,
  color,
  highlighted = false
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  color: 'blue' | 'purple' | 'green';
  highlighted?: boolean;
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-500',
      shadowColor: 'rgba(59, 130, 246, 0.3)'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-500',
      shadowColor: 'rgba(139, 92, 246, 0.3)'
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-500',
      shadowColor: 'rgba(16, 185, 129, 0.3)'
    }
  };
  
  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${highlighted ? 'relative z-20 transform md:scale-105' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: `0 20px 25px -5px ${colorMap[color].shadowColor}, 0 10px 10px -5px ${colorMap[color].shadowColor}` 
      }}
    >
      <Card className={`h-full ${highlighted ? 'border-purple-500/30 bg-slate-900' : 'border-slate-800 bg-slate-900/50'}`}>
        <CardContent className="p-6">
          <div className={`w-16 h-16 rounded-lg ${colorMap[color].bg} ${colorMap[color].border} flex items-center justify-center mb-6`}>
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-400 mb-6">{description}</p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className={`h-5 w-5 ${colorMap[color].text} mr-2 mt-0.5 shrink-0`} />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link href={ctaLink} className="block mt-auto">
            <Button 
              className={`w-full ${
                highlighted 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {ctaText}
              {highlighted && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StepCard = ({ number, title, description, delay }: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <motion.div 
      className="relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px] mb-4">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white">
            {number}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};