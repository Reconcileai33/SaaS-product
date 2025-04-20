import { motion } from "framer-motion";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  
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
              Simple, <span className={gradientText}>Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Pay only for what you use, with no hidden fees or long-term commitments
            </p>
            
            <div className="inline-flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 mb-8">
              <button
                className={`px-4 py-2 rounded-md text-sm ${
                  frequency === "monthly" 
                    ? "bg-slate-800 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setFrequency("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm ${
                  frequency === "yearly" 
                    ? "bg-slate-800 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setFrequency("yearly")}
              >
                Yearly <span className="text-xs text-green-500">Save 20%</span>
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={pageItemVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {/* Individual Plan */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Individual</h3>
                <p className="text-gray-400 mb-4">Perfect for personal finances</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹5</span>
                  <span className="text-gray-400 ml-2">per ₹1,000 transaction</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">No monthly subscription fee</p>
                
                <ul className="space-y-3 mb-6">
                  <PricingFeature>Personal bank reconciliation</PricingFeature>
                  <PricingFeature>Credit card matching</PricingFeature>
                  <PricingFeature>Shopping portal integration</PricingFeature>
                  <PricingFeature>Basic analytics</PricingFeature>
                  <PricingFeature>Up to 3 accounts</PricingFeature>
                </ul>
                
                <Link href="/auth">
                  <Button className="w-full" variant="outline">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Business Plan */}
            <div className="bg-slate-900 rounded-xl border-2 border-purple-500/30 overflow-hidden relative transform scale-105 z-10 shadow-lg shadow-purple-500/10">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Business</h3>
                <p className="text-gray-400 mb-4">For growing businesses</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹4</span>
                  <span className="text-gray-400 ml-2">per ₹1,000 transaction</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  {frequency === "monthly" ? "₹999/month + pay-as-you-go" : "₹9,599/year + pay-as-you-go"}
                </p>
                
                <ul className="space-y-3 mb-6">
                  <PricingFeature>Everything in Individual</PricingFeature>
                  <PricingFeature>Bulk transaction upload</PricingFeature>
                  <PricingFeature>Beneficiary management</PricingFeature>
                  <PricingFeature>Custom reconciliation rules</PricingFeature>
                  <PricingFeature>Advanced analytics</PricingFeature>
                  <PricingFeature>Unlimited accounts</PricingFeature>
                  <PricingFeature>Priority support</PricingFeature>
                </ul>
                
                <Link href="/auth">
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-4">For large organizations</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Contact us for custom pricing</p>
                
                <ul className="space-y-3 mb-6">
                  <PricingFeature>Everything in Business</PricingFeature>
                  <PricingFeature>Custom integrations</PricingFeature>
                  <PricingFeature>White-labeling</PricingFeature>
                  <PricingFeature>API access</PricingFeature>
                  <PricingFeature>Dedicated account manager</PricingFeature>
                  <PricingFeature>SLA guarantee</PricingFeature>
                  <PricingFeature>On-premise deployment option</PricingFeature>
                </ul>
                
                <Link href="/contact">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* FAQ Section */}
          <motion.div variants={pageItemVariants} className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <FaqItem
                question="How does the pay-as-you-go pricing work?"
                answer="Our pricing is based on the total transaction volume you reconcile through our platform. For example, if you reconcile ₹10,000 worth of transactions, you pay ₹50 at the individual rate (₹5 per ₹1,000)."
              />
              
              <FaqItem
                question="Is there a limit on how many transactions I can process?"
                answer="No, there's no limit to the number of transactions you can process. You only pay for the transaction volume, not the number of individual transactions."
              />
              
              <FaqItem
                question="Can I switch between plans?"
                answer="Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll get immediate access to the new features. If you downgrade, the changes will take effect at the end of your current billing cycle."
              />
              
              <FaqItem
                question="Do you offer a free trial?"
                answer="Yes, we offer a 14-day free trial for all new users with up to ₹100,000 of transaction volume included. No credit card required to sign up."
              />
              
              <FaqItem
                question="How secure is my financial data?"
                answer="Your data security is our top priority. We use bank-level encryption, secure data centers, and comply with all Indian financial regulations. We never store your bank credentials."
              />
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div 
            variants={pageItemVariants}
            className="text-center bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 rounded-xl p-8 border border-slate-800"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to simplify your <span className={gradientText}>reconciliation process</span>?
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

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
      <span className="text-gray-300">{children}</span>
    </li>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold">{question}</h3>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <HelpCircle className="h-5 w-5 text-gray-400" />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 pt-0 text-gray-400 border-t border-slate-800">
          {answer}
        </div>
      </div>
    </div>
  );
}