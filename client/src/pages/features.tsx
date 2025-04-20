import { motion } from "framer-motion";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { 
  Activity, 
  FileText, 
  BarChart3, 
  Search, 
  Zap, 
  BrainCircuit, 
  Share2, 
  FileSearch, 
  Clock, 
  RefreshCw, 
  Upload, 
  Landmark,
  ArrowRight,
  User,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Features() {
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
              Powerful <span className={gradientText}>Features</span>
            </h1>
            <p className="text-xl text-gray-400">
              Discover the tools that make AIReconciler the leading reconciliation platform in India
            </p>
          </motion.div>
          
          {/* Key Features */}
          <motion.div variants={pageItemVariants} className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-center">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Activity className="h-6 w-6" />}
                title="Real-time Reconciliation"
                description="Match transactions across multiple platforms and accounts in real-time with instant notifications for discrepancies."
                color="purple"
              />
              
              <FeatureCard 
                icon={<BrainCircuit className="h-6 w-6" />}
                title="AI-Powered Matching"
                description="Our proprietary AI algorithms automatically match transactions based on amounts, dates, and descriptions."
                color="blue"
              />
              
              <FeatureCard 
                icon={<FileText className="h-6 w-6" />}
                title="Smart Reports"
                description="Generate detailed reconciliation reports with a single click, customized for your specific needs."
                color="pink"
              />
              
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6" />}
                title="Analytics Dashboard"
                description="Gain valuable insights with visual analytics of your reconciliation process and financial health."
                color="green"
              />
              
              <FeatureCard 
                icon={<Search className="h-6 w-6" />}
                title="Advanced Search"
                description="Find any transaction quickly with powerful search capabilities across all connected accounts."
                color="amber"
              />
              
              <FeatureCard 
                icon={<Zap className="h-6 w-6" />}
                title="Automated Workflows"
                description="Set up custom reconciliation rules and let AIReconciler do the heavy lifting for you."
                color="cyan"
              />
            </div>
          </motion.div>
          
          {/* How It Works */}
          <motion.div variants={pageItemVariants} className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Connect</h3>
                <p className="text-gray-400">
                  Connect your accounts from banks, payment gateways, and marketplaces securely without sharing credentials.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Analyze</h3>
                <p className="text-gray-400">
                  Our AI analyzes your transactions and automatically matches them across different platforms.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Reconcile</h3>
                <p className="text-gray-400">
                  Get detailed reports and insights with flagged discrepancies for quick resolution.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Feature Comparison */}
          <motion.div variants={pageItemVariants} className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-center">For Individuals & Businesses</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <User className="h-6 w-6 mr-2 text-purple-500" />
                  For Individuals
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Save Time</h4>
                      <p className="text-gray-400 text-sm">
                        Automatically reconcile your personal finances across multiple banks and credit cards.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Search className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Track Expenses</h4>
                      <p className="text-gray-400 text-sm">
                        Keep track of your expenses across different payment methods and shopping portals.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <RefreshCw className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Real-time Updates</h4>
                      <p className="text-gray-400 text-sm">
                        Get notifications for new transactions and instantly match them with your bank statements.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Building className="h-6 w-6 mr-2 text-blue-500" />
                  For Businesses
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Upload className="h-5 w-5 text-pink-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Bulk Reconciliation</h4>
                      <p className="text-gray-400 text-sm">
                        Upload thousands of transactions at once and reconcile them automatically with our powerful engine.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Landmark className="h-5 w-5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Multi-Platform Support</h4>
                      <p className="text-gray-400 text-sm">
                        Connect to all major Indian payment gateways, banks, and e-commerce platforms for comprehensive coverage.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-amber-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Detailed Reporting</h4>
                      <p className="text-gray-400 text-sm">
                        Generate custom reports for audit trails, tax compliance, and financial analysis.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Integrations */}
          <motion.div variants={pageItemVariants} className="mb-24">
            <h2 className="text-2xl font-bold mb-4 text-center">Seamless Integrations</h2>
            <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
              AIReconciler connects with all major Indian financial platforms and services
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Integration logos would go here - using placeholders for now */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 p-4 h-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800"></div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA */}
          <motion.div 
            variants={pageItemVariants}
            className="text-center bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 rounded-xl p-8 border border-slate-800"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to experience <span className={gradientText}>AIReconciler</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial operations
            </p>
            <Link href="/auth">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'purple' | 'blue' | 'pink' | 'green' | 'amber' | 'cyan';
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'from-purple-500/20 to-purple-500/5 [--icon-color:theme(colors.purple.500)]';
      case 'blue':
        return 'from-blue-500/20 to-blue-500/5 [--icon-color:theme(colors.blue.500)]';
      case 'pink':
        return 'from-pink-500/20 to-pink-500/5 [--icon-color:theme(colors.pink.500)]';
      case 'green':
        return 'from-green-500/20 to-green-500/5 [--icon-color:theme(colors.green.500)]';
      case 'amber':
        return 'from-amber-500/20 to-amber-500/5 [--icon-color:theme(colors.amber.500)]';
      case 'cyan':
        return 'from-cyan-500/20 to-cyan-500/5 [--icon-color:theme(colors.cyan.500)]';
      default:
        return 'from-purple-500/20 to-purple-500/5 [--icon-color:theme(colors.purple.500)]';
    }
  };
  
  return (
    <div className={`bg-gradient-to-b ${getColorClasses()} backdrop-blur-sm rounded-xl border border-slate-800 p-6 transition-all hover:scale-105 duration-300`}>
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-900 mb-4 text-[--icon-color]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}