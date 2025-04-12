
import { Article } from "@/types/help-center";

// Sample article data
export const helpArticles: Article[] = [
  {
    id: "connecting-accounts",
    title: "How do I connect my financial accounts?",
    shortDescription: "Learn how to securely connect your financial accounts to the platform.",
    content: `
      <h2>Connecting Your Financial Accounts</h2>
      <p>You can connect your accounts through our secure integration system by following these steps:</p>
      <ol>
        <li>Navigate to Settings > Integrations</li>
        <li>Select your financial institution from the list of available providers</li>
        <li>Follow the secure prompts to authenticate with your provider</li>
        <li>Choose which accounts you'd like to connect</li>
        <li>Review permissions and confirm the connection</li>
      </ol>
      <p>Once connected, your account data will begin syncing automatically. This process may take a few minutes to complete.</p>
      <h3>Troubleshooting Connection Issues</h3>
      <p>If you encounter any issues when connecting your accounts:</p>
      <ul>
        <li>Check that you're using the correct login credentials for your financial institution</li>
        <li>Ensure that your financial institution's services are not experiencing downtime</li>
        <li>Try reconnecting after clearing your browser cache</li>
        <li>Contact our support team if problems persist</li>
      </ul>
    `,
    category: "Getting Started",
    tags: ["accounts", "setup", "integrations"]
  },
  {
    id: "data-security",
    title: "Is my financial data secure?",
    shortDescription: "Information about our security practices and data protection measures.",
    content: `
      <h2>Our Security Practices</h2>
      <p>Security is our top priority. Here's how we protect your data:</p>
      <h3>Bank-Level Encryption</h3>
      <p>We use 256-bit encryption to protect all data transfers between your browser and our servers. This is the same level of encryption used by major financial institutions worldwide.</p>
      <h3>Credential Protection</h3>
      <p>We never store your login credentials. When you connect your accounts, your credentials are securely passed to your financial institution through encrypted channels.</p>
      <h3>Compliance and Certification</h3>
      <p>Our platform is SOC 2 Type II certified, which means we've been independently audited and verified to meet rigorous security standards. We undergo regular security audits to ensure we maintain the highest standards of data protection.</p>
      <h3>Data Access Controls</h3>
      <p>We implement strict access controls and monitoring to ensure that only authorized personnel can access system components containing customer information, and all access is logged and monitored.</p>
    `,
    category: "Security",
    tags: ["security", "encryption", "data protection"]
  },
  {
    id: "custom-reports",
    title: "How do I create custom reports?",
    shortDescription: "Step-by-step guide to creating customized financial reports.",
    content: `
      <h2>Creating Custom Reports</h2>
      <p>Custom reports can be created from the Reporting section by following these steps:</p>
      <ol>
        <li>Navigate to the Reporting section in your dashboard</li>
        <li>Click on "New Report" button in the top right corner</li>
        <li>Select the type of report you want to create</li>
        <li>Choose the data points you want to include in your report</li>
        <li>Configure visualization options (charts, tables, etc.)</li>
        <li>Set filters to focus on specific data if needed</li>
        <li>Name your report and save it</li>
      </ol>
      <h3>Scheduling Automated Reports</h3>
      <p>You can also schedule automated report delivery:</p>
      <ol>
        <li>Open a saved report or create a new one</li>
        <li>Click on "Schedule" in the report actions menu</li>
        <li>Set your preferred frequency (daily, weekly, monthly, etc.)</li>
        <li>Add recipients who should receive the report</li>
        <li>Choose the delivery format (PDF, Excel, etc.)</li>
        <li>Save your schedule settings</li>
      </ol>
    `,
    category: "Platform Features",
    tags: ["reporting", "analytics", "data"]
  },
  {
    id: "team-access",
    title: "Can I invite team members to access the platform?",
    shortDescription: "Learn how to add team members and manage user permissions.",
    content: `
      <h2>Managing Team Access</h2>
      <p>Yes, you can invite team members through the User Management section. Here's how:</p>
      <ol>
        <li>Go to Settings > User Management</li>
        <li>Click on "Invite User" button</li>
        <li>Enter the email address of the person you want to invite</li>
        <li>Select the appropriate role for this user</li>
        <li>Set permissions to control access to sensitive information</li>
        <li>Click "Send Invitation"</li>
      </ol>
      <p>The invited user will receive an email invitation with instructions to set up their account.</p>
      <h3>User Roles and Permissions</h3>
      <p>We offer several predefined roles:</p>
      <ul>
        <li><strong>Administrator:</strong> Full access to all functions including user management</li>
        <li><strong>Manager:</strong> Access to most functions but cannot manage users or billing</li>
        <li><strong>Analyst:</strong> Can view and create reports but has limited editing capabilities</li>
        <li><strong>Viewer:</strong> Read-only access to specified sections</li>
      </ul>
      <p>You can also create custom roles with specific permissions tailored to your organization's needs.</p>
    `,
    category: "Account & Billing",
    tags: ["team", "users", "permissions", "access"]
  },
  {
    id: "portfolio-management",
    title: "How do I track my investment portfolio?",
    shortDescription: "Guide to monitoring and managing your investment portfolio.",
    content: `
      <h2>Portfolio Tracking and Management</h2>
      <p>Our platform offers comprehensive portfolio tracking capabilities:</p>
      <h3>Setting Up Your Portfolio</h3>
      <ol>
        <li>Connect your investment accounts or manually add positions</li>
        <li>Go to the Portfolio Management section</li>
        <li>Configure your preferred view (list, allocation chart, performance)</li>
        <li>Set benchmarks for performance comparison</li>
      </ol>
      <h3>Key Portfolio Features</h3>
      <ul>
        <li><strong>Real-time Updates:</strong> See current values and daily changes</li>
        <li><strong>Asset Allocation:</strong> Visualize your portfolio diversification</li>
        <li><strong>Performance Tracking:</strong> Monitor returns across different time periods</li>
        <li><strong>Risk Analytics:</strong> Understand your portfolio's risk profile</li>
        <li><strong>Scenario Testing:</strong> See how market events might affect your holdings</li>
      </ul>
    `,
    category: "Platform Features",
    tags: ["investments", "portfolio", "tracking"]
  },
  {
    id: "subscription-management",
    title: "How do I change my subscription plan?",
    shortDescription: "Instructions for upgrading, downgrading, or canceling your subscription.",
    content: `
      <h2>Managing Your Subscription</h2>
      <p>You can easily change your subscription plan by following these steps:</p>
      <h3>Upgrading or Downgrading</h3>
      <ol>
        <li>Go to Settings > Billing & Subscription</li>
        <li>Click "Change Plan" button</li>
        <li>Review available plans and select your preferred option</li>
        <li>Confirm your selection</li>
      </ol>
      <p>When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.</p>
      <h3>Canceling Your Subscription</h3>
      <ol>
        <li>Go to Settings > Billing & Subscription</li>
        <li>Click "Cancel Subscription" at the bottom of the page</li>
        <li>Complete the short cancellation survey</li>
        <li>Confirm cancellation</li>
      </ol>
      <p>You'll continue to have access to your current plan until the end of your billing period.</p>
    `,
    category: "Account & Billing",
    tags: ["billing", "subscription", "payment"]
  }
];
