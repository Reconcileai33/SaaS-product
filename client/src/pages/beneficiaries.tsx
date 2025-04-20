import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { 
  AlertCircle, 
  Building2, 
  CreditCard, 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  User,
  CheckCircle,
  Wallet,
  MoreHorizontal,
  FileSearch,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  type: "individual" | "business";
  status: "active" | "pending" | "suspended";
  lastPaymentDate: string;
  lastPaymentAmount: number;
}

const Beneficiaries = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Query for beneficiaries data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/beneficiaries'],
    enabled: mounted
  });
  
  // Sample beneficiaries (would come from API in a real app)
  const beneficiaries: Beneficiary[] = [
    {
      id: "b1",
      name: "Rahul Sharma",
      accountNumber: "XXXX-XXXX-1234",
      bank: "HDFC Bank",
      type: "individual",
      status: "active",
      lastPaymentDate: "15 Apr 2023",
      lastPaymentAmount: 75000
    },
    {
      id: "b2",
      name: "Priya Patel",
      accountNumber: "XXXX-XXXX-5678",
      bank: "ICICI Bank",
      type: "individual",
      status: "active",
      lastPaymentDate: "28 Mar 2023",
      lastPaymentAmount: 42500
    },
    {
      id: "b3",
      name: "Tech Solutions Pvt Ltd",
      accountNumber: "XXXX-XXXX-9012",
      bank: "SBI Bank",
      type: "business",
      status: "active",
      lastPaymentDate: "10 Apr 2023",
      lastPaymentAmount: 145000
    },
    {
      id: "b4",
      name: "Global Services Inc.",
      accountNumber: "XXXX-XXXX-3456",
      bank: "Axis Bank",
      type: "business",
      status: "pending",
      lastPaymentDate: "N/A",
      lastPaymentAmount: 0
    },
    {
      id: "b5",
      name: "Anil Kumar",
      accountNumber: "XXXX-XXXX-7890",
      bank: "Kotak Bank",
      type: "individual",
      status: "suspended",
      lastPaymentDate: "02 Jan 2023",
      lastPaymentAmount: 25000
    }
  ];

  const filteredBeneficiaries = searchQuery 
    ? beneficiaries.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.accountNumber.includes(searchQuery) ||
        b.bank.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : beneficiaries;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Pending
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Suspended
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
            {status}
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "individual" ? (
      <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
        <User className="h-4 w-4 text-blue-500" />
      </div>
    ) : (
      <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
        <Building2 className="h-4 w-4 text-purple-500" />
      </div>
    );
  };

  const getBankIcon = (bank: string) => {
    const iconClasses = "h-4 w-4";
    
    switch (bank.toLowerCase()) {
      case "hdfc bank":
        return <CreditCard className={`${iconClasses} text-red-500`} />;
      case "icici bank":
        return <CreditCard className={`${iconClasses} text-orange-500`} />;
      case "sbi bank":
        return <CreditCard className={`${iconClasses} text-blue-500`} />;
      case "axis bank":
        return <CreditCard className={`${iconClasses} text-purple-500`} />;
      case "kotak bank":
        return <CreditCard className={`${iconClasses} text-red-500`} />;
      default:
        return <CreditCard className={`${iconClasses} text-gray-500`} />;
    }
  };

  const EmptyResults = () => (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileSearch className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No results found</h3>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
        We couldn't find any beneficiaries matching your search. Try a different search term or add a new beneficiary.
      </p>
      <Button className="bg-primary hover:bg-primary/90">
        <Plus className="h-4 w-4 mr-2" />
        Add New Beneficiary
      </Button>
    </div>
  );

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Beneficiaries</h1>
          <p className="text-muted-foreground mt-1">Manage and make payments to your saved beneficiaries</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </motion.div>
      
      {/* Search & Tabs */}
      <motion.div variants={pageItemVariants} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search beneficiaries..."
              className="pl-9 bg-slate-900 border-slate-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Beneficiaries</TabsTrigger>
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredBeneficiaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBeneficiaries.map((beneficiary) => (
                  <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
                ))}
              </div>
            ) : (
              <EmptyResults />
            )}
          </TabsContent>
          
          <TabsContent value="individuals">
            {filteredBeneficiaries.filter(b => b.type === "individual").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBeneficiaries
                  .filter(b => b.type === "individual")
                  .map((beneficiary) => (
                    <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
                  ))
                }
              </div>
            ) : (
              <EmptyResults />
            )}
          </TabsContent>
          
          <TabsContent value="businesses">
            {filteredBeneficiaries.filter(b => b.type === "business").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBeneficiaries
                  .filter(b => b.type === "business")
                  .map((beneficiary) => (
                    <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
                  ))
                }
              </div>
            ) : (
              <EmptyResults />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

// Beneficiary Card Component
const BeneficiaryCard = ({ beneficiary }: { beneficiary: Beneficiary }) => {
  const getTypeIcon = (type: string) => {
    return type === "individual" ? (
      <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
        <User className="h-5 w-5 text-blue-500" />
      </div>
    ) : (
      <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
        <Building2 className="h-5 w-5 text-purple-500" />
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center text-xs text-green-500">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></div>
            Active
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center text-xs text-amber-500">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></div>
            Pending
          </div>
        );
      case "suspended":
        return (
          <div className="flex items-center text-xs text-red-500">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1"></div>
            Suspended
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-center">
            {getTypeIcon(beneficiary.type)}
            <div className="ml-3">
              <h3 className="font-medium">{beneficiary.name}</h3>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <CreditCard className="h-3 w-3 mr-1" />
                {beneficiary.accountNumber}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {getStatusBadge(beneficiary.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Wallet className="h-4 w-4 mr-2" />
                  <span>Send Money</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>Edit Details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <X className="h-4 w-4 mr-2" />
                  <span>Remove</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="border-t border-slate-800 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Bank</span>
            <span className="text-xs font-medium">{beneficiary.bank}</span>
          </div>
          {beneficiary.lastPaymentAmount > 0 && (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Last Payment</span>
                <span className="text-xs font-medium">{beneficiary.lastPaymentDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Amount</span>
                <span className="text-xs font-medium">₹{beneficiary.lastPaymentAmount.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="bg-slate-800/50 p-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{beneficiary.type === "individual" ? "Individual" : "Business"}</span>
          <Button size="sm" className="h-8 bg-primary hover:bg-primary/90">Send Money</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Beneficiaries;