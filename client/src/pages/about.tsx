import { motion } from "framer-motion";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";

export default function About() {
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
              About <span className={gradientText}>AIReconciler</span>
            </h1>
            <p className="text-xl text-gray-400">
              India's first AI-powered reconciliation platform
            </p>
          </motion.div>
          
          <motion.div variants={pageItemVariants} className="max-w-4xl mx-auto mb-16">
            <div className="rounded-lg overflow-hidden mb-8">
              <img 
                src="/attached_assets/dashboard 3.PNG" 
                alt="AIReconciler Team" 
                className="w-full h-auto rounded-lg border border-slate-800"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-300 mb-6">
              AIReconciler was founded in 2023 with a simple mission: to eliminate the frustration and wasted time associated with financial reconciliation. As financial transactions became increasingly complex across multiple platforms, banks, and payment gateways, the founders recognized the need for an intelligent, automated solution.
            </p>
            
            <p className="text-gray-300 mb-6">
              What started as a simple tool for matching transactions across platforms has evolved into a comprehensive reconciliation platform that serves both individuals and businesses across India. Our AI-powered engine can process millions of transactions daily, providing accurate matching and valuable insights.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-10">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              We believe that financial reconciliation shouldn't be a burden. Our mission is to provide a seamless, intelligent reconciliation experience that saves time, reduces errors, and provides valuable insights into financial operations.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-10">Our Team</h2>
            <p className="text-gray-300 mb-6">
              AIReconciler is built by a passionate team of financial experts, data scientists, and software engineers who are dedicated to solving the complex challenges of financial reconciliation. With decades of combined experience in fintech and artificial intelligence, our team brings a unique perspective to the problem.
            </p>
          </motion.div>
          
          <motion.div variants={pageItemVariants} className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose AIReconciler?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-purple-400">Made in India</h3>
                <p className="text-gray-300">
                  Proudly designed and developed in India for Indian businesses and individuals. We understand the unique challenges of the Indian financial ecosystem.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">State-of-the-Art AI</h3>
                <p className="text-gray-300">
                  Our platform utilizes the latest advancements in artificial intelligence and machine learning to provide unparalleled accuracy and insights.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-pink-400">Customer-Centric</h3>
                <p className="text-gray-300">
                  We're dedicated to providing exceptional customer service and continuously improving our platform based on user feedback.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={pageItemVariants} className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Experience AIReconciler?</h2>
            <Link href="/auth">
              <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium">
                Get Started Today
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}