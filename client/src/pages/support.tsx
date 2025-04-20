import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { 
  ChevronDown,
  FileQuestion, 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  Phone, 
  Search, 
  Video
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Sample FAQ data
  const faqs = [
    {
      question: "How do I connect my bank account for reconciliation?",
      answer: "To connect your bank account, go to the Integrations page and click on 'Add New Connection'. Select your bank from the list of supported banks and follow the secure authentication process. For detailed instructions, check our documentation on bank integration."
    },
    {
      question: "What payment gateways are currently supported?",
      answer: "We currently support all major Indian payment gateways including Razorpay, PayU, CCAvenue, Cashfree, PayTM, and more. You can connect these gateways from the Integrations page. Each integration requires API credentials from your payment gateway account."
    },
    {
      question: "How does the automatic reconciliation work?",
      answer: "Our AI-powered reconciliation engine matches transactions across different platforms based on multiple parameters like amount, date, reference ID, and more. It uses fuzzy matching and machine learning to achieve high match rates even with partial information."
    },
    {
      question: "Can I customize the reconciliation rules?",
      answer: "Yes, you can create custom reconciliation rules in the Reconciliations page. Click on 'New Rule' to define matching criteria, tolerance levels, and automatic actions. Custom rules help adapt the system to your specific business processes."
    },
    {
      question: "How secure is my financial data?",
      answer: "Your financial data security is our top priority. We use bank-grade encryption, secure API connections, and don't store sensitive credentials. All data is encrypted at rest and in transit. We're compliant with relevant financial data security regulations."
    },
    {
      question: "What marketplaces can I connect for reconciliation?",
      answer: "We support all major Indian e-commerce marketplaces including Amazon, Flipkart, Meesho, Myntra, Nykaa, and more. Connect your marketplace accounts through our secure API integration to automate the reconciliation of sales, refunds, and fees."
    }
  ];
  
  const filteredFaqs = searchTerm 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs;

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <h1 className="text-2xl font-bold">Support & Help Center</h1>
        <p className="text-muted-foreground mt-1">Find answers and get assistance with ReconcileAI</p>
      </motion.div>
      
      {/* Search Bar */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">How can we help you today?</h2>
              <p className="text-muted-foreground">Search our knowledge base or browse the FAQs below</p>
            </div>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for answers..." 
                className="pl-10 h-12 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - FAQ */}
        <motion.div variants={pageItemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="h-10 w-10 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      We couldn't find any FAQs matching your search. Try different keywords or contact support.
                    </p>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Right Column - Contact Options */}
        <motion.div variants={pageItemVariants} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-xs text-muted-foreground">Get a response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mr-3">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-xs text-muted-foreground">Chat with our support team</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-xs text-muted-foreground">Available Mon-Fri, 9AM-6PM IST</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-3">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Schedule a Demo</h3>
                  <p className="text-xs text-muted-foreground">Get a personalized walkthrough</p>
                </div>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Contact Support Team
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-primary" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <h3 className="font-medium mb-1">Documentation</h3>
                <p className="text-sm text-muted-foreground">Detailed guides and API documentation</p>
                <Button variant="link" className="text-primary p-0 mt-2">View Documentation →</Button>
              </div>
              
              <div className="p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <h3 className="font-medium mb-1">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
                <Button variant="link" className="text-primary p-0 mt-2">Watch Tutorials →</Button>
              </div>
              
              <div className="p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                <h3 className="font-medium mb-1">Blog & Updates</h3>
                <p className="text-sm text-muted-foreground">Latest features and reconciliation tips</p>
                <Button variant="link" className="text-primary p-0 mt-2">Read Articles →</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Support;