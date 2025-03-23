
import { useState } from "react";
import { useOnboarding, AggregatorInfo, ManualAccountInfo, EntityInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
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
  "Checking",
  "Savings",
  "Brokerage",
  "Retirement",
  "Investment",
  "Custodial",
  "Trust",
  "Corporate",
  "Credit Card",
  "Loan"
];

const ENTITY_TYPES = [
  "Corporation",
  "Limited Liability Company (LLC)",
  "Partnership",
  "Trust",
  "Foundation",
  "Family Investment Vehicle",
  "Holding Company",
  "Private Investment Company",
  "Special Purpose Vehicle (SPV)",
  "Other"
];

const DataSourceForm = () => {
  const { 
    onboardingData, 
    updateAggregatorInfo, 
    addManualAccount,
    removeManualAccount,
    addEntity,
    removeEntity,
    setCurrentStep 
  } = useOnboarding();
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [manualAccounts, setManualAccounts] = useState<ManualAccountInfo[]>(onboardingData.manualAccounts);
  const [entities, setEntities] = useState<EntityInfo[]>(onboardingData.entities);
  
  const [newAccount, setNewAccount] = useState<ManualAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "",
    currency: "",
    balance: "",
    statements: []
  });
  
  const [newEntity, setNewEntity] = useState<EntityInfo>({
    entityName: "",
    entityType: "",
    jurisdiction: "",
    registrationNumber: "",
    documents: []
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
  const handleAccountSelectionChange = (field: keyof ManualAccountInfo, value: string) => {
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
    const updatedAccounts = [...manualAccounts, newAccount];
    setManualAccounts(updatedAccounts);
    addManualAccount(newAccount);

    // Reset form
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "",
      currency: "",
      balance: "",
      statements: []
    });

    toast({
      title: "Account added",
      description: `${newAccount.accountName} has been added successfully.`
    });
  };

  // Remove account
  const handleRemoveAccount = (index: number) => {
    const updatedAccounts = manualAccounts.filter((_, i) => i !== index);
    setManualAccounts(updatedAccounts);
    removeManualAccount(index);
  };

  // Handle new entity input
  const handleNewEntityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntity({
      ...newEntity,
      [name]: value
    });
  };

  // Handle entity selection changes
  const handleEntitySelectionChange = (field: keyof EntityInfo, value: string) => {
    setNewEntity({
      ...newEntity,
      [field]: value
    });
  };

  // Handle entity documents
  const handleEntityDocumentsSelected = (files: File[]) => {
    setNewEntity({
      ...newEntity,
      documents: files
    });
  };

  // Add new entity
  const handleAddEntity = () => {
    // Validation
    if (!newEntity.entityName || !newEntity.entityType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required entity fields.",
        variant: "destructive"
      });
      return;
    }

    // Add entity
    const updatedEntities = [...entities, newEntity];
    setEntities(updatedEntities);
    addEntity(newEntity);

    // Reset form
    setNewEntity({
      entityName: "",
      entityType: "",
      jurisdiction: "",
      registrationNumber: "",
      documents: []
    });

    toast({
      title: "Entity added",
      description: `${newEntity.entityName} has been added successfully.`
    });
  };

  // Remove entity
  const handleRemoveEntity = (index: number) => {
    const updatedEntities = entities.filter((_, i) => i !== index);
    setEntities(updatedEntities);
    removeEntity(index);
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
      if (manualAccounts.length === 0 && entities.length === 0) {
        toast({
          title: "Missing information",
          description: "Please add at least one account or entity.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Save data
    updateAggregatorInfo(aggregatorInfo);
    
    // Move to review step
    setCurrentStep(4);
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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Financial Data Source</h2>
            <p className="text-gray-500">
              Please tell us how you'd like to provide your financial information.
            </p>
          </div>

          <motion.div 
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <Label>Do you currently use a financial data aggregator?</Label>
            <RadioGroup
              value={aggregatorInfo.usesAggregator ? "yes" : "no"}
              onValueChange={handleAggregatorSelection}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="aggregator-yes" />
                <Label htmlFor="aggregator-yes" className="cursor-pointer">
                  Yes, I use a financial data aggregator
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="aggregator-no" />
                <Label htmlFor="aggregator-no" className="cursor-pointer">
                  No, I'll provide my financial information manually
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
              <Tabs defaultValue="accounts" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="accounts" className="flex-1">Accounts</TabsTrigger>
                  <TabsTrigger value="entities" className="flex-1">Legal Entities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="accounts" className="space-y-6">
                  {/* List of added accounts */}
                  {manualAccounts.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Added Accounts</h3>
                      <div className="space-y-2">
                        {manualAccounts.map((account, index) => (
                          <Card key={index} className="p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{account.accountName}</p>
                              <p className="text-sm text-gray-500">
                                {account.institution} • {account.accountType}
                                {account.balance ? ` • ${account.balance} ${account.currency}` : ''}
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
                    <h3 className="font-medium">Add a new account</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Name*</Label>
                        <Input
                          id="accountName"
                          name="accountName"
                          value={newAccount.accountName}
                          onChange={handleNewAccountChange}
                          placeholder="e.g., Primary Checking"
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution*</Label>
                        <Input
                          id="institution"
                          name="institution"
                          value={newAccount.institution}
                          onChange={handleNewAccountChange}
                          placeholder="e.g., JP Morgan Chase"
                          className="h-11"
                        />
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
                            {ACCOUNT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
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
                        <Label htmlFor="balance">Balance</Label>
                        <Input
                          id="balance"
                          name="balance"
                          value={newAccount.balance}
                          onChange={handleNewAccountChange}
                          placeholder="e.g., 150000"
                          type="number"
                          min="0"
                          step="0.01"
                          className="h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Account Statements</Label>
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
                </TabsContent>
                
                <TabsContent value="entities" className="space-y-6">
                  {/* List of added entities */}
                  {entities.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Added Legal Entities</h3>
                      <div className="space-y-2">
                        {entities.map((entity, index) => (
                          <Card key={index} className="p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{entity.entityName}</p>
                              <p className="text-sm text-gray-500">
                                {entity.entityType} • {entity.jurisdiction || 'No jurisdiction specified'}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveEntity(index)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add new entity form */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Add a new legal entity</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="entityName">Entity Name*</Label>
                        <Input
                          id="entityName"
                          name="entityName"
                          value={newEntity.entityName}
                          onChange={handleNewEntityChange}
                          placeholder="e.g., Family Holdings LLC"
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="entityType">Entity Type*</Label>
                        <Select
                          value={newEntity.entityType}
                          onValueChange={(value) => handleEntitySelectionChange("entityType", value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select entity type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ENTITY_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jurisdiction">Jurisdiction</Label>
                        <Input
                          id="jurisdiction"
                          name="jurisdiction"
                          value={newEntity.jurisdiction}
                          onChange={handleNewEntityChange}
                          placeholder="e.g., Delaware, USA"
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="registrationNumber">Registration Number</Label>
                        <Input
                          id="registrationNumber"
                          name="registrationNumber"
                          value={newEntity.registrationNumber}
                          onChange={handleNewEntityChange}
                          placeholder="e.g., LLC-12345"
                          className="h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Entity Documents</Label>
                      <FileUploader
                        accept="application/pdf,image/*"
                        multiple={true}
                        maxSize={10}
                        onFilesSelected={handleEntityDocumentsSelected}
                        existingFiles={newEntity.documents}
                        label="Upload Entity Documents (Registration, Structure)"
                      />
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddEntity}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Entity
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
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
                onClick={() => setCurrentStep(2)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
              >
                Review
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
