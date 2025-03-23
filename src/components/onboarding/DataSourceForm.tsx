
import { useState } from "react";
import { useOnboarding, AggregatorInfo, FinancialAccountInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Trash2, Wallet, BarChart4 } from "lucide-react";
import FileUploader from "@/components/FileUploader";

const AGGREGATORS = [
  "Addepar", 
  "Canoe", 
  "Eton Solutions", 
  "Flanks", 
  "Mirador",
  "PCR", 
  "Masttro", 
  "Archway", 
  "Institutional Capital"
];

const CURRENCIES = [
  "USD - US Dollar", 
  "EUR - Euro", 
  "GBP - British Pound", 
  "CHF - Swiss Franc", 
  "JPY - Japanese Yen", 
  "AUD - Australian Dollar", 
  "CAD - Canadian Dollar", 
  "CNY - Chinese Yuan"
];

const ACCOUNT_TYPES = [
  "cash",
  "portfolio",
  "investment",
  "custody",
  "broker",
  "other"
];

const INSTITUTIONS = [
  "JP Morgan",
  "Goldman Sachs",
  "Credit Suisse",
  "UBS",
  "Morgan Stanley",
  "Bank of America",
  "Citibank",
  "HSBC",
  "BNP Paribas",
  "Deutsche Bank",
  "Barclays",
  "Wells Fargo",
  "Northern Trust",
  "State Street",
  "Pictet",
  "Julius Baer",
  "Lombard Odier",
  "Other"
];

const DataSourceForm = () => {
  const { 
    onboardingData, 
    updateAggregatorInfo, 
    addFinancialAccount,
    removeFinancialAccount,
    setCurrentStep 
  } = useOnboarding();
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [financialAccounts, setFinancialAccounts] = useState<FinancialAccountInfo[]>(onboardingData.financialAccounts);
  
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "cash",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
  });

  // Handle aggregator radio selection
  const handleAggregatorSelection = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      usesAggregator: value === "yes"
    });
  };

  // Handle aggregator name selection
  const handleAggregatorNameChange = (name: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: name,
      aggregatorCredentials: { username: "" }
    });
  };

  // Handle aggregator credentials
  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorCredentials: {
        ...aggregatorInfo.aggregatorCredentials!,
        [name]: value
      }
    });
  };

  // Handle new account input
  const handleNewAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({
      ...newAccount,
      [name]: value
    });
  };

  // Handle account selection changes
  const handleAccountSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount({
      ...newAccount,
      [field]: value
    });
  };

  // Handle account statements
  const handleStatementsSelected = (files: File[]) => {
    setNewAccount({
      ...newAccount,
      statements: files
    });
  };

  // Add new account
  const handleAddAccount = () => {
    // Validation
    if (!newAccount.accountName || !newAccount.institution || !newAccount.accountType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required account fields.",
        variant: "destructive"
      });
      return;
    }

    // Add account
    const updatedAccounts = [...financialAccounts, newAccount];
    setFinancialAccounts(updatedAccounts);
    addFinancialAccount(newAccount);

    // Reset form
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "cash",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: []
    });

    toast({
      title: "Account added",
      description: `${newAccount.accountName} has been added successfully.`
    });
  };

  // Remove account
  const handleRemoveAccount = (index: number) => {
    const updatedAccounts = financialAccounts.filter((_, i) => i !== index);
    setFinancialAccounts(updatedAccounts);
    removeFinancialAccount(index);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate based on user selection
    if (aggregatorInfo.usesAggregator) {
      if (!aggregatorInfo.aggregatorName || !aggregatorInfo.aggregatorCredentials?.username) {
        toast({
          title: "Missing information",
          description: "Please provide your aggregator details.",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (financialAccounts.length === 0) {
        toast({
          title: "Missing information",
          description: "Please add at least one financial account.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Save data
    updateAggregatorInfo(aggregatorInfo);
    
    // Move to beneficial owners step
    setCurrentStep(5);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart4 className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Financial Data Source</h2>
          </div>
          <p className="text-gray-500">
            Please tell us how you'd like to provide your financial information.
          </p>

          <motion.div 
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <Label>Does your family office currently use a financial data aggregator?</Label>
            <RadioGroup
              value={aggregatorInfo.usesAggregator ? "yes" : "no"}
              onValueChange={handleAggregatorSelection}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="aggregator-yes" />
                <Label htmlFor="aggregator-yes" className="cursor-pointer">
                  Yes, we use a financial data aggregator
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="aggregator-no" />
                <Label htmlFor="aggregator-no" className="cursor-pointer">
                  No, we'll provide our financial information manually
                </Label>
              </div>
            </RadioGroup>
          </motion.div>

          {/* Conditional content based on aggregator usage */}
          {aggregatorInfo.usesAggregator ? (
            <motion.div 
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 border p-4 rounded-lg"
            >
              <div className="space-y-4">
                <Label htmlFor="aggregatorName">Select your aggregator</Label>
                <Select
                  value={aggregatorInfo.aggregatorName}
                  onValueChange={handleAggregatorNameChange}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your aggregator" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGGREGATORS.map((aggregator) => (
                      <SelectItem key={aggregator} value={aggregator}>
                        {aggregator}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {aggregatorInfo.aggregatorName && (
                <div className="space-y-4">
                  <Label htmlFor="username">Username or API Key ID</Label>
                  <Input
                    id="username"
                    name="username"
                    value={aggregatorInfo.aggregatorCredentials?.username || ""}
                    onChange={handleCredentialsChange}
                    placeholder="Enter your username or API key identifier"
                    className="h-11"
                  />
                  
                  <Label htmlFor="apiKey">API Key (optional)</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    type="password"
                    value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
                    onChange={handleCredentialsChange}
                    placeholder="Enter your API key if applicable"
                    className="h-11"
                  />
                  
                  <p className="text-sm text-gray-500 mt-2">
                    We'll use these credentials to securely connect to your {aggregatorInfo.aggregatorName} account.
                    Your credentials are encrypted and stored securely.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 border p-4 rounded-lg"
            >
              {/* List of added accounts */}
              {financialAccounts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Added Financial Accounts</h3>
                  <div className="space-y-2">
                    {financialAccounts.map((account, index) => (
                      <Card key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{account.accountName}</p>
                          <p className="text-sm text-gray-500">
                            {account.institution} • {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)}
                            {account.approximateValue ? ` • ~${account.approximateValue} ${account.currency}` : ''}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAccount(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add new account form */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Add a new financial account</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="accountName">Account Name*</Label>
                    <Input
                      id="accountName"
                      name="accountName"
                      value={newAccount.accountName}
                      onChange={handleNewAccountChange}
                      placeholder="e.g., Main Investment Portfolio at UBS"
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution*</Label>
                    <Select
                      value={newAccount.institution}
                      onValueChange={(value) => handleAccountSelectionChange("institution", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select institution" />
                      </SelectTrigger>
                      <SelectContent>
                        {INSTITUTIONS.map((institution) => (
                          <SelectItem key={institution} value={institution}>
                            {institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type*</Label>
                    <Select
                      value={newAccount.accountType}
                      onValueChange={(value) => handleAccountSelectionChange("accountType", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash Account</SelectItem>
                        <SelectItem value="portfolio">Investment Portfolio</SelectItem>
                        <SelectItem value="custody">Custody Account</SelectItem>
                        <SelectItem value="broker">Brokerage Account</SelectItem>
                        <SelectItem value="investment">Investment Fund</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountSubtype">Account Subtype (optional)</Label>
                    <Input
                      id="accountSubtype"
                      name="accountSubtype"
                      value={newAccount.accountSubtype || ""}
                      onChange={handleNewAccountChange}
                      placeholder="e.g., Managed Account, Private Equity"
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Primary Currency</Label>
                    <Select
                      value={newAccount.currency}
                      onValueChange={(value) => handleAccountSelectionChange("currency", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency} value={currency.split(" - ")[0]}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="approximateValue">Approximate Value</Label>
                    <Input
                      id="approximateValue"
                      name="approximateValue"
                      value={newAccount.approximateValue || ""}
                      onChange={handleNewAccountChange}
                      placeholder="e.g., 10,000,000"
                      type="text"
                      className="h-11"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Statements (optional)</Label>
                  <FileUploader
                    accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    multiple={true}
                    maxSize={10}
                    onFilesSelected={handleStatementsSelected}
                    existingFiles={newAccount.statements}
                    label="Upload Account Statements (PDF, CSV, Excel)"
                  />
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddAccount}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </motion.div>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with * are required.
            </p>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(3)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default DataSourceForm;
