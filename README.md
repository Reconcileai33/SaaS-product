# AI-Powered Reconciliation Platform

A futuristic, AI-driven reconciliation SaaS platform that acts as a third-party facilitator for businesses and individuals to instantly reconcile payments across banks, payment processors, and marketplaces.

## Features

- **NeoPop-style UI** inspired by CRED (animations, buttons, icons)
- **Multiple Dashboards**:
  - Business Dashboard: For startups, enterprises, and global brands
  - Individual Dashboard: For users reconciling payments across marketplaces and banks
  - Admin Dashboard: Super-admin panel to control, monitor, and manage everything
- **AI Modules**:
  - Predictive analytics for expected settlement times
  - Intelligent matching algorithms (ML-based)
  - User support chatbot for dispute resolution
  - Smart routing engine to optimize transaction paths
- **Dynamic Schema Generation** for each user/company
  - Automatically generate schemas based on sample data
  - Customize and save schema templates
  - Apply schemas to reconcile data from different sources
- **Advanced Bank Integrations**:
  - Connect with multiple banks (RazorpayX, HDFC, ICICI, SBI, RBL, Castler)
  - Transaction synchronization and analytics
  - Real-time balance and account information
  - Visual transaction analytics with charts and insights
- **Usage-based Pricing** (₹5 per ₹1,000 transaction volume)

## Tech Stack

- **Frontend**: React, Tailwind CSS, Radix UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Reconcileai33/SaaS-product.git
   cd SaaS-product
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   # For Unix/Linux/Mac
   npm run dev
   
   # For Windows
   npm run dev:windows
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Project Structure

- `client/`: Frontend React application
  - `src/components/`: UI components
    - `bank/`: Bank integration components
    - `support/`: Support chatbot components
    - `schema/`: Schema management components
  - `src/pages/`: Page components
  - `src/lib/`: Utility functions and hooks
    - `api.ts`: Main API client
    - `bankIntegrationsApi.ts`: Bank integrations API client
- `server/`: Backend Express application
  - `ai/`: AI modules
  - `routes/`: API routes
    - `bank-integrations.ts`: Bank integration endpoints
    - `schema-management.ts`: Schema management endpoints
  - `middleware/`: Express middleware
  - `integrations/`: Bank integration modules
    - `bank-integration-manager.ts`: Bank integration management
    - `sso-bank-connections.ts`: SSO-based bank connections
    - `token-refresh-manager.ts`: Token refresh management
  - `services/`: Business logic services
    - `advanced-bank-integration-service.ts`: Advanced bank integration features
    - `schema-generator-service.ts`: Dynamic schema generation
- `shared/`: Shared types and utilities

## Feature Details

### Dynamic Schema Generation

The platform provides powerful dynamic schema generation capabilities:

1. **Automatic Schema Detection**: Upload sample data and the system will automatically detect and generate a schema.
2. **Schema Templates**: Save and reuse schemas for different data sources.
3. **Schema Mapping**: Map fields between different schemas to facilitate reconciliation.
4. **Custom Validation Rules**: Define custom validation rules for your data.

### Advanced Bank Integrations

Connect with multiple banks and financial institutions:

1. **Multiple Bank Support**: Connect with RazorpayX, HDFC, ICICI, SBI, RBL, and Castler.
2. **Transaction Synchronization**: Automatically sync transactions from connected banks.
3. **Transaction Analytics**: View detailed analytics with charts and insights:
   - Total transaction volume and count
   - Credits vs. debits analysis
   - Category-based transaction breakdown
   - Daily transaction volume trends
4. **Account Details**: View real-time balance and account information.

### Support Chatbot

AI-powered support chatbot for instant assistance:

1. **Instant Responses**: Get immediate answers to common questions.
2. **Dispute Resolution**: Initiate and track dispute resolution processes.
3. **Guided Troubleshooting**: Step-by-step guidance for common issues.
4. **Human Handoff**: Seamless transition to human support when needed.

## Admin Access

Default admin credentials:
- Username: `admin@reconcile.ai`
- Password: `admin123`

**Important**: Change these credentials in production.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
