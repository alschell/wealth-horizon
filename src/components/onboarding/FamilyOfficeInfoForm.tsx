import { useState } from "react";
import { useOnboarding, FamilyOfficeInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";

const LEGAL_ENTITY_TYPES = [
  "Corporation",
  "Family Limited Partnership",
  "Family Trust",
  "Foundation",
  "Limited Liability Company (LLC)",
  "Limited Partnership (LP)",
  "Other",
  "Private Investment Company",
  "Private Trust Company",
].sort();

const JURISDICTIONS = [
  "🇦🇩 Andorra",
  "🇦🇪 United Arab Emirates",
  "🇦🇫 Afghanistan",
  "🇦🇬 Antigua and Barbuda",
  "🇦🇮 Anguilla",
  "🇦🇱 Albania",
  "🇦🇲 Armenia",
  "🇦🇴 Angola",
  "🇦🇷 Argentina",
  "🇦🇸 American Samoa",
  "🇦🇹 Austria",
  "🇦🇺 Australia",
  "🇦🇼 Aruba",
  "🇦🇽 Åland Islands",
  "🇦🇿 Azerbaijan",
  "🇧🇦 Bosnia and Herzegovina",
  "🇧🇧 Barbados",
  "🇧🇩 Bangladesh",
  "🇧🇪 Belgium",
  "🇧🇫 Burkina Faso",
  "🇧🇬 Bulgaria",
  "🇧🇭 Bahrain",
  "🇧🇮 Burundi",
  "🇧🇯 Benin",
  "🇧🇲 Bermuda",
  "🇧🇳 Brunei",
  "🇧🇴 Bolivia",
  "🇧🇷 Brazil",
  "🇧🇸 Bahamas",
  "🇧🇹 Bhutan",
  "🇧🇼 Botswana",
  "🇧🇾 Belarus",
  "🇧🇿 Belize",
  "🇨🇦 Canada",
  "🇨🇩 DR Congo",
  "🇨🇫 Central African Republic",
  "🇨🇬 Republic of the Congo",
  "🇨🇭 Switzerland",
  "🇨🇮 Côte d'Ivoire",
  "🇨🇰 Cook Islands",
  "🇨🇱 Chile",
  "🇨🇲 Cameroon",
  "🇨🇳 China",
  "🇨🇴 Colombia",
  "🇨🇷 Costa Rica",
  "🇨🇺 Cuba",
  "🇨🇻 Cape Verde",
  "🇨🇼 Curaçao",
  "🇨🇾 Cyprus",
  "🇨🇿 Czech Republic",
  "🇩🇪 Germany",
  "🇩🇯 Djibouti",
  "🇩🇰 Denmark",
  "🇩🇲 Dominica",
  "🇩🇴 Dominican Republic",
  "🇩🇿 Algeria",
  "🇪🇨 Ecuador",
  "🇪🇪 Estonia",
  "🇪🇬 Egypt",
  "🇪🇭 Western Sahara",
  "🇪🇷 Eritrea",
  "🇪🇸 Spain",
  "🇪🇹 Ethiopia",
  "🇫🇮 Finland",
  "🇫🇯 Fiji",
  "🇫🇰 Falkland Islands",
  "🇫🇲 Micronesia",
  "🇫🇴 Faroe Islands",
  "🇫🇷 France",
  "🇬🇦 Gabon",
  "🇬🇧 United Kingdom",
  "🇬🇩 Grenada",
  "🇬🇪 Georgia",
  "🇬🇫 French Guiana",
  "🇬🇬 Guernsey",
  "🇬🇭 Ghana",
  "🇬🇮 Gibraltar",
  "🇬🇱 Greenland",
  "🇬🇲 Gambia",
  "🇬🇳 Guinea",
  "🇬🇵 Guadeloupe",
  "🇬🇶 Equatorial Guinea",
  "🇬🇷 Greece",
  "🇬🇸 South Georgia",
  "🇬🇹 Guatemala",
  "🇬🇺 Guam",
  "🇬🇼 Guinea-Bissau",
  "🇬🇾 Guyana",
  "🇭🇰 Hong Kong",
  "🇭🇳 Honduras",
  "🇭🇷 Croatia",
  "🇭🇹 Haiti",
  "🇭🇺 Hungary",
  "🇮🇩 Indonesia",
  "🇮🇪 Ireland",
  "🇮🇱 Israel",
  "🇮🇲 Isle of Man",
  "🇮🇳 India",
  "🇮🇴 British Indian Ocean Territory",
  "🇮🇶 Iraq",
  "🇮🇷 Iran",
  "🇮🇸 Iceland",
  "🇮🇹 Italy",
  "🇯🇪 Jersey",
  "🇯🇲 Jamaica",
  "🇯🇴 Jordan",
  "🇯🇵 Japan",
  "🇰🇪 Kenya",
  "🇰🇬 Kyrgyzstan",
  "🇰🇭 Cambodia",
  "🇰🇮 Kiribati",
  "🇰🇲 Comoros",
  "🇰🇳 Saint Kitts and Nevis",
  "🇰🇵 North Korea",
  "🇰🇷 South Korea",
  "🇰🇼 Kuwait",
  "🇰🇾 Cayman Islands",
  "🇰🇿 Kazakhstan",
  "🇱🇦 Laos",
  "🇱🇧 Lebanon",
  "🇱🇨 Saint Lucia",
  "🇱🇮 Liechtenstein",
  "🇱🇰 Sri Lanka",
  "🇱🇷 Liberia",
  "🇱🇸 Lesotho",
  "🇱🇹 Lithuania",
  "🇱🇺 Luxembourg",
  "🇱🇻 Latvia",
  "🇱🇾 Libya",
  "🇲🇦 Morocco",
  "🇲🇨 Monaco",
  "🇲🇩 Moldova",
  "🇲🇪 Montenegro",
  "🇲🇫 Saint Martin",
  "🇲🇬 Madagascar",
  "🇲🇭 Marshall Islands",
  "🇲🇰 North Macedonia",
  "🇲🇱 Mali",
  "🇲🇲 Myanmar",
  "🇲🇳 Mongolia",
  "🇲🇴 Macau",
  "🇲🇵 Northern Mariana Islands",
  "🇲🇶 Martinique",
  "🇲🇷 Mauritania",
  "🇲🇸 Montserrat",
  "🇲🇹 Malta",
  "🇲🇺 Mauritius",
  "🇲🇻 Maldives",
  "🇲🇼 Malawi",
  "🇲🇽 Mexico",
  "🇲🇾 Malaysia",
  "🇲🇿 Mozambique",
  "🇳🇦 Namibia",
  "🇳🇨 New Caledonia",
  "🇳🇪 Niger",
  "🇳🇫 Norfolk Island",
  "🇳🇬 Nigeria",
  "🇳🇮 Nicaragua",
  "🇳🇱 Netherlands",
  "🇳🇴 Norway",
  "🇳🇵 Nepal",
  "🇳🇷 Nauru",
  "🇳🇺 Niue",
  "🇳🇿 New Zealand",
  "🇴🇲 Oman",
  "🇵🇦 Panama",
  "🇵🇪 Peru",
  "🇵🇫 French Polynesia",
  "🇵🇬 Papua New Guinea",
  "🇵🇭 Philippines",
  "🇵🇰 Pakistan",
  "🇵🇱 Poland",
  "🇵🇲 Saint Pierre and Miquelon",
  "🇵🇳 Pitcairn Islands",
  "🇵🇷 Puerto Rico",
  "🇵🇸 Palestine",
  "🇵🇹 Portugal",
  "🇵🇼 Palau",
  "🇵🇾 Paraguay",
  "🇶🇦 Qatar",
  "🇷🇪 Réunion",
  "🇷🇴 Romania",
  "🇷🇸 Serbia",
  "🇷🇺 Russia",
  "🇷🇼 Rwanda",
  "🇸🇦 Saudi Arabia",
  "🇸🇧 Solomon Islands",
  "🇸🇨 Seychelles",
  "🇸🇩 Sudan",
  "🇸🇪 Sweden",
  "🇸🇬 Singapore",
  "🇸🇭 Saint Helena",
  "🇸🇮 Slovenia",
  "🇸🇰 Slovakia",
  "🇸🇱 Sierra Leone",
  "🇸🇲 San Marino",
  "🇸🇳 Senegal",
  "🇸🇴 Somalia",
  "🇸🇷 Suriname",
  "🇸🇸 South Sudan",
  "🇸🇹 São Tomé and Príncipe",
  "🇸🇻 El Salvador",
  "🇸🇽 Sint Maarten",
  "🇸🇾 Syria",
  "🇸🇿 Eswatini",
  "🇹🇨 Turks and Caicos Islands",
  "🇹🇩 Chad",
  "🇹🇫 French Southern Territories",
  "🇹🇬 Togo",
  "🇹🇭 Thailand",
  "🇹🇯 Tajikistan",
  "🇹🇰 Tokelau",
  "🇹🇱 Timor-Leste",
  "🇹🇲 Turkmenistan",
  "🇹🇳 Tunisia",
  "🇹🇴 Tonga",
  "🇹🇷 Turkey",
  "🇹🇹 Trinidad and Tobago",
  "🇹🇻 Tuvalu",
  "🇹🇼 Taiwan",
  "🇹🇿 Tanzania",
  "🇺🇦 Ukraine",
  "🇺🇬 Uganda",
  "🇺🇸 United States",
  "🇺🇾 Uruguay",
  "🇺🇿 Uzbekistan",
  "🇻🇦 Vatican City",
  "🇻🇨 Saint Vincent and the Grenadines",
  "🇻🇪 Venezuela",
  "🇻🇬 British Virgin Islands",
  "🇻🇮 U.S. Virgin Islands",
  "🇻🇳 Vietnam",
  "🇻🇺 Vanuatu",
  "🇼🇫 Wallis and Futuna",
  "🇼🇸 Samoa",
  "🇾🇪 Yemen",
  "🇾🇹 Mayotte",
  "🇿🇦 South Africa",
  "🇿🇲 Zambia",
  "🇿🇼 Zimbabwe"
].sort();

const FamilyOfficeInfoForm = () => {
  const { onboardingData, updateFamilyOfficeInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<FamilyOfficeInfo>(onboardingData.familyOfficeInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (name: keyof FamilyOfficeInfo, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof FamilyOfficeInfo)[] = ['officeName', 'legalEntityType', 'taxId', 'jurisdiction', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please complete all required fields.`,
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    updateFamilyOfficeInfo(formData);
    setCurrentStep(1); // Move to primary contact step
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
            <Building2 className="h-7 w-7 text-blue-500" />
            <h2 className="text-2xl font-bold">Family Office Information</h2>
          </div>
          <p className="text-gray-500">
            Please provide the details of your family office entity for KYC verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2 col-span-full"
            >
              <Label htmlFor="officeName">Family Office Name*</Label>
              <Input
                id="officeName"
                name="officeName"
                value={formData.officeName}
                onChange={handleInputChange}
                placeholder="Smith Family Office LLC"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="legalEntityType">Legal Entity Type*</Label>
              <Select
                value={formData.legalEntityType}
                onValueChange={(value) => handleSelectionChange("legalEntityType", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  {LEGAL_ENTITY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="jurisdiction">Jurisdiction*</Label>
              <Select
                value={formData.jurisdiction}
                onValueChange={(value) => handleSelectionChange("jurisdiction", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  {JURISDICTIONS.map((jurisdiction) => (
                    <SelectItem key={jurisdiction} value={jurisdiction}>
                      {jurisdiction}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder="e.g., LLC-12345678"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="taxId">Tax ID Number*</Label>
              <Input
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="e.g., 12-3456789"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={5}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="yearEstablished">Year Established</Label>
              <Input
                id="yearEstablished"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                placeholder="e.g., 2015"
                className="h-11"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
              />
            </motion.div>

            <motion.div 
              custom={6}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="office@smithfamilyoffice.com"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={7}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={8}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://smithfamilyoffice.com"
                className="h-11"
              />
            </motion.div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with * are required.
            </p>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                variant="blue"
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

export default FamilyOfficeInfoForm;
