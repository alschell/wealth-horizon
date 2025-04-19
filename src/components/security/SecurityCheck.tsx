
/**
 * Security checking component that demonstrates the use of security audit utilities
 */

import React, { useState } from 'react';
import { SecurityAuditor } from '@/utils/security/securityAuditor';
import { validateUrl, validatePassword } from '@/utils/validation/stringValidation';

interface SecurityCheckProps {
  onAuditComplete?: (result: any) => void;
}

interface FormValues {
  url: string;
  input: string;
  password: string;
}

const SecurityCheck: React.FC<SecurityCheckProps> = ({ onAuditComplete }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    url: '',
    input: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [auditResult, setAuditResult] = useState<any>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<FormValues> = {};
    
    // URL validation
    if (formValues.url) {
      const urlError = validateUrl(formValues.url);
      if (urlError) newErrors.url = urlError;
    }
    
    // Password validation if provided
    if (formValues.password) {
      const passwordError = validatePassword(formValues.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Perform security audit
    const result = SecurityAuditor.performSecurityAudit({
      url: formValues.url || undefined,
      userInput: formValues.input || undefined,
      password: formValues.password || undefined
    });
    
    setAuditResult(result);
    
    if (onAuditComplete) {
      onAuditComplete(result);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Security Check</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="url">
            URL to Check
          </label>
          <input
            id="url"
            name="url"
            type="text"
            value={formValues.url}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.url ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="https://example.com"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="input">
            User Input to Check
          </label>
          <textarea
            id="input"
            name="input"
            value={formValues.input}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.input ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter some text to check for security issues"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password to Check
          </label>
          <input
            id="password"
            name="password"
            type="text"
            value={formValues.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter a password to check strength"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Run Security Check
        </button>
      </form>
      
      {auditResult && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Audit Results</h3>
          
          <div className="p-4 border rounded bg-gray-50">
            <div className="flex items-center mb-4">
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  auditResult.passed ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {auditResult.score}
              </div>
              <div className="ml-4">
                <p className="font-semibold">
                  Security Score: {auditResult.score}/100
                </p>
                <p className={auditResult.passed ? 'text-green-600' : 'text-red-600'}>
                  {auditResult.passed ? 'No critical issues found' : 'Security issues detected'}
                </p>
              </div>
            </div>
            
            {auditResult.findings.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Issues Found:</h4>
                <ul className="space-y-2">
                  {auditResult.findings.map((finding: any, index: number) => (
                    <li key={index} className="p-3 bg-white rounded border">
                      <p className="font-medium">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          finding.severity === 'critical' ? 'bg-red-600' :
                          finding.severity === 'high' ? 'bg-orange-500' :
                          finding.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></span>
                        {finding.description}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Severity: <span className="font-medium">{finding.severity}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Category: <span className="font-medium">{finding.category}</span>
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        {finding.remediation}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityCheck;
