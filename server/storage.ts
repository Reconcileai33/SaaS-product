import { 
  User, 
  InsertUser, 
  Transaction, 
  InsertTransaction, 
  Integration, 
  InsertIntegration,
  ReconciliationRule,
  InsertReconciliationRule,
  ReconciliationJob,
  InsertReconciliationJob
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transaction operations
  getAllTransactions(): Promise<Transaction[]>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, data: Partial<Transaction>): Promise<Transaction | undefined>;
  getTotalTransactions(): Promise<number>;
  getTransactionSuccessRate(): Promise<number>;
  
  // Integration operations
  getAllIntegrations(): Promise<Integration[]>;
  getIntegration(id: number): Promise<Integration | undefined>;
  createIntegration(integration: InsertIntegration): Promise<Integration>;
  updateIntegration(id: number, data: Partial<Integration>): Promise<Integration | undefined>;
  
  // Reconciliation operations
  getAllReconciliationRules(): Promise<ReconciliationRule[]>;
  getReconciliationRule(id: number): Promise<ReconciliationRule | undefined>;
  createReconciliationRule(rule: InsertReconciliationRule): Promise<ReconciliationRule>;
  updateReconciliationRule(id: number, data: Partial<ReconciliationRule>): Promise<ReconciliationRule | undefined>;
  getActiveRulesCount(): Promise<number>;
  
  // Reconciliation jobs
  getAllReconciliationJobs(): Promise<ReconciliationJob[]>;
  getReconciliationJob(id: number): Promise<ReconciliationJob | undefined>;
  createReconciliationJob(job: InsertReconciliationJob): Promise<ReconciliationJob>;
  updateReconciliationJob(id: number, data: Partial<ReconciliationJob>): Promise<ReconciliationJob | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private integrations: Map<number, Integration>;
  private reconciliationRules: Map<number, ReconciliationRule>;
  private reconciliationJobs: Map<number, ReconciliationJob>;
  
  private userId: number;
  private transactionId: number;
  private integrationId: number;
  private ruleId: number;
  private jobId: number;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.integrations = new Map();
    this.reconciliationRules = new Map();
    this.reconciliationJobs = new Map();
    
    this.userId = 1;
    this.transactionId = 1;
    this.integrationId = 1;
    this.ruleId = 1;
    this.jobId = 1;
    
    // Initialize with demo data
    this.initializeDemoData();
  }
  
  private initializeDemoData() {
    // Create demo user
    const user = this.createUser({
      username: "demo",
      password: "password",
      fullName: "Demo User",
      role: "admin"
    });
    
    // Create demo transactions
    this.createTransaction({
      userId: user.id,
      description: "Payment from Client A",
      amount: 1500,
      currency: "USD",
      status: "completed",
      gateway: "Stripe",
      externalId: "tx_123456"
    });
    
    this.createTransaction({
      userId: user.id,
      description: "Vendor Payment",
      amount: -800,
      currency: "USD",
      status: "pending",
      gateway: "PayPal",
      externalId: "tx_789012"
    });
    
    this.createTransaction({
      userId: user.id,
      description: "Monthly Subscription",
      amount: 2500,
      currency: "USD",
      status: "completed",
      gateway: "Stripe",
      externalId: "tx_345678"
    });
    
    // Create demo integrations
    this.createIntegration({
      userId: user.id,
      name: "Stripe",
      provider: "stripe",
      apiKey: "sk_test_123456",
      apiSecret: "sk_secret_123456",
      isEnabled: true
    });
    
    this.createIntegration({
      userId: user.id,
      name: "PayPal",
      provider: "paypal",
      apiKey: "client_id_123456",
      apiSecret: "client_secret_123456",
      isEnabled: true
    });
    
    this.createIntegration({
      userId: user.id,
      name: "QuickBooks",
      provider: "quickbooks",
      apiKey: "qb_token_123456",
      apiSecret: "qb_secret_123456",
      isEnabled: true
    });
    
    // Create demo reconciliation rules
    this.createReconciliationRule({
      userId: user.id,
      name: "Match by transaction ID",
      description: "Automatically match transactions based on external ID",
      condition: "transaction.externalId === externalRecord.id",
      action: "setMatched",
      isActive: true
    });
    
    this.createReconciliationRule({
      userId: user.id,
      name: "Match by amount and date",
      description: "Match transactions with same amount and date",
      condition: "transaction.amount === externalRecord.amount && isSameDay(transaction.createdAt, externalRecord.date)",
      action: "setPartialMatch",
      isActive: true
    });
    
    // Create demo reconciliation jobs
    this.createReconciliationJob({
      userId: user.id,
      name: "Daily Bank Reconciliation",
      schedule: "0 9 * * *",
      status: "idle"
    });
    
    this.createReconciliationJob({
      userId: user.id,
      name: "PayPal Account Reconciliation",
      schedule: "0 */6 * * *",
      status: "in_progress"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  // Transaction methods
  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }
  
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }
  
  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionId++;
    const now = new Date();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.transactions.set(id, transaction);
    return transaction;
  }
  
  async updateTransaction(id: number, data: Partial<Transaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction = {
      ...transaction,
      ...data,
      updatedAt: new Date()
    };
    
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }
  
  async getTotalTransactions(): Promise<number> {
    return this.transactions.size;
  }
  
  async getTransactionSuccessRate(): Promise<number> {
    const total = this.transactions.size;
    if (total === 0) return 0;
    
    const completed = Array.from(this.transactions.values()).filter(
      tx => tx.status === "completed"
    ).length;
    
    return (completed / total) * 100;
  }
  
  // Integration methods
  async getAllIntegrations(): Promise<Integration[]> {
    return Array.from(this.integrations.values());
  }
  
  async getIntegration(id: number): Promise<Integration | undefined> {
    return this.integrations.get(id);
  }
  
  async createIntegration(insertIntegration: InsertIntegration): Promise<Integration> {
    const id = this.integrationId++;
    const now = new Date();
    const integration: Integration = {
      ...insertIntegration,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.integrations.set(id, integration);
    return integration;
  }
  
  async updateIntegration(id: number, data: Partial<Integration>): Promise<Integration | undefined> {
    const integration = this.integrations.get(id);
    if (!integration) return undefined;
    
    const updatedIntegration = {
      ...integration,
      ...data,
      updatedAt: new Date()
    };
    
    this.integrations.set(id, updatedIntegration);
    return updatedIntegration;
  }
  
  // Reconciliation Rule methods
  async getAllReconciliationRules(): Promise<ReconciliationRule[]> {
    return Array.from(this.reconciliationRules.values());
  }
  
  async getReconciliationRule(id: number): Promise<ReconciliationRule | undefined> {
    return this.reconciliationRules.get(id);
  }
  
  async createReconciliationRule(insertRule: InsertReconciliationRule): Promise<ReconciliationRule> {
    const id = this.ruleId++;
    const now = new Date();
    const rule: ReconciliationRule = {
      ...insertRule,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.reconciliationRules.set(id, rule);
    return rule;
  }
  
  async updateReconciliationRule(id: number, data: Partial<ReconciliationRule>): Promise<ReconciliationRule | undefined> {
    const rule = this.reconciliationRules.get(id);
    if (!rule) return undefined;
    
    const updatedRule = {
      ...rule,
      ...data,
      updatedAt: new Date()
    };
    
    this.reconciliationRules.set(id, updatedRule);
    return updatedRule;
  }
  
  async getActiveRulesCount(): Promise<number> {
    return Array.from(this.reconciliationRules.values()).filter(
      rule => rule.isActive
    ).length;
  }
  
  // Reconciliation Job methods
  async getAllReconciliationJobs(): Promise<ReconciliationJob[]> {
    return Array.from(this.reconciliationJobs.values());
  }
  
  async getReconciliationJob(id: number): Promise<ReconciliationJob | undefined> {
    return this.reconciliationJobs.get(id);
  }
  
  async createReconciliationJob(insertJob: InsertReconciliationJob): Promise<ReconciliationJob> {
    const id = this.jobId++;
    const now = new Date();
    const nextRun = new Date();
    nextRun.setHours(nextRun.getHours() + 24); // Next run in 24 hours
    
    const job: ReconciliationJob = {
      ...insertJob,
      id,
      lastRun: null,
      nextRun: nextRun,
      createdAt: now,
      updatedAt: now
    };
    this.reconciliationJobs.set(id, job);
    return job;
  }
  
  async updateReconciliationJob(id: number, data: Partial<ReconciliationJob>): Promise<ReconciliationJob | undefined> {
    const job = this.reconciliationJobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = {
      ...job,
      ...data,
      updatedAt: new Date()
    };
    
    this.reconciliationJobs.set(id, updatedJob);
    return updatedJob;
  }
}

export const storage = new MemStorage();
