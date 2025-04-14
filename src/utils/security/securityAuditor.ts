
/**
 * Security auditing utility for identifying potential security issues
 * 
 * @module securityAuditor
 */

type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

/**
 * Security audit finding with detailed information
 */
export interface SecurityFinding {
  /** Issue ID for reference */
  id: string;
  /** Short description of the finding */
  description: string;
  /** Category of the security issue */
  category: 'input-validation' | 'authentication' | 'csrf' | 'xss' | 'data-exposure' | 'encryption' | 'storage' | 'other';
  /** Severity level of the finding */
  severity: SeverityLevel;
  /** Affected data or components */
  affectedData?: string;
  /** Recommended remediation steps */
  remediation: string;
  /** Reference to security best practices or standards */
  reference?: string;
}

/**
 * Security audit options for configuring the audit process
 */
export interface SecurityAuditOptions {
  /** Categories to include in the audit */
  includeCategories?: SecurityFinding['category'][];
  /** Minimum severity level to include */
  minSeverity?: SeverityLevel;
  /** Whether to include remediation steps */
  includeRemediation?: boolean;
  /** Whether to include external references */
  includeReferences?: boolean;
}

/**
 * Security audit parameters for specific audit checks
 */
export interface SecurityAuditParams {
  /** User input to validate */
  userInput?: string;
  /** URL to validate */
  url?: string;
  /** Authentication token to audit */
  authToken?: string;
  /** Password to check strength */
  password?: string;
  /** Custom parameters for specialized audits */
  [key: string]: any;
}

/**
 * Security audit result with detailed findings
 */
export interface SecurityAuditResult {
  /** Whether the audit passed with no critical issues */
  passed: boolean;
  /** List of security findings */
  findings: SecurityFinding[];
  /** Summary statistics */
  summary: {
    totalIssues: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
    categoryCounts: Record<SecurityFinding['category'], number>;
  };
  /** Overall security score (0-100) */
  score: number;
  /** Timestamp of audit */
  timestamp: number;
}

// Import required security utilities
import { validation, sanitize, authentication } from '../security';

/**
 * Performs security audits on input data, authentication, and other aspects
 * of application security
 */
export class SecurityAuditor {
  /**
   * Audit user input for potential security issues
   * 
   * @param input - String input to audit
   * @param options - Audit options
   * @returns Security audit result
   */
  static auditUserInput(input: string, options: SecurityAuditOptions = {}): SecurityAuditResult {
    const findings: SecurityFinding[] = [];
    
    // Check for XSS patterns
    if (validation.containsInjectionPatterns(input)) {
      findings.push({
        id: 'INPUT-XSS-001',
        description: 'Input contains potential XSS patterns',
        category: 'xss',
        severity: 'high',
        affectedData: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        remediation: 'Sanitize input using sanitize.sanitizeHtml() before processing or displaying',
        reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html'
      });
    }
    
    // Check for SQL injection patterns
    if (/('\s*OR\s*'1'\s*=\s*'1|SELECT|INSERT|UPDATE|DELETE|DROP|UNION|--)/i.test(input)) {
      findings.push({
        id: 'INPUT-SQL-001',
        description: 'Input contains potential SQL injection patterns',
        category: 'input-validation',
        severity: 'critical',
        affectedData: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        remediation: 'Use parameterized queries or ORM, and validate input',
        reference: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html'
      });
    }
    
    // Check for path traversal attempts
    if (/(\.\.|\/\.\.|\.\.\/|~\/)/i.test(input)) {
      findings.push({
        id: 'INPUT-PATH-001',
        description: 'Input contains potential path traversal patterns',
        category: 'input-validation',
        severity: 'high',
        affectedData: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        remediation: 'Use validation.validatePath() to verify paths, and never use user input directly in file operations',
        reference: 'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html'
      });
    }
    
    // Filter findings based on options
    const filteredFindings = this.filterFindings(findings, options);
    
    return this.prepareAuditResult(filteredFindings);
  }
  
  /**
   * Audit authentication token for security issues
   * 
   * @param token - Token to audit
   * @param options - Audit options
   * @returns Security audit result
   */
  static auditAuthToken(token: string, options: SecurityAuditOptions = {}): SecurityAuditResult {
    const findings: SecurityFinding[] = [];
    
    // Check token entropy
    if (token.length < 32) {
      findings.push({
        id: 'AUTH-TOKEN-001',
        description: 'Authentication token has insufficient length',
        category: 'authentication',
        severity: 'medium',
        remediation: 'Use authentication.generateSecureToken() to create tokens with adequate entropy',
        reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'
      });
    }
    
    // Check token complexity
    const uniqueChars = new Set(token.split('')).size;
    if (uniqueChars < token.length * 0.5) {
      findings.push({
        id: 'AUTH-TOKEN-002',
        description: 'Authentication token has low entropy',
        category: 'authentication',
        severity: 'medium',
        remediation: 'Use authentication.generateSecureToken() to create cryptographically secure tokens',
        reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html'
      });
    }
    
    // JWT token checks
    if (token.split('.').length === 3) {
      // Likely a JWT
      try {
        const [headerB64, payloadB64] = token.split('.');
        const header = JSON.parse(atob(headerB64));
        
        // Check algorithm
        if (header.alg === 'none' || header.alg === 'HS256') {
          findings.push({
            id: 'AUTH-JWT-001',
            description: header.alg === 'none' 
              ? 'JWT using "none" algorithm is insecure' 
              : 'JWT using HS256 should be upgraded to a stronger algorithm',
            category: 'authentication',
            severity: header.alg === 'none' ? 'critical' : 'low',
            remediation: 'Use asymmetric algorithms like RS256 or ES256',
            reference: 'https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/'
          });
        }
        
        // Check token expiration
        try {
          const payload = JSON.parse(atob(payloadB64));
          if (!payload.exp) {
            findings.push({
              id: 'AUTH-JWT-002',
              description: 'JWT missing expiration claim',
              category: 'authentication',
              severity: 'high',
              remediation: 'Always include exp claim in JWTs to ensure they expire',
              reference: 'https://auth0.com/blog/json-web-token-best-practices/'
            });
          }
        } catch (e) {
          // Not valid base64 or JSON
        }
      } catch (e) {
        // Not a valid JWT
      }
    }
    
    // Filter findings based on options
    const filteredFindings = this.filterFindings(findings, options);
    
    return this.prepareAuditResult(filteredFindings);
  }
  
  /**
   * Comprehensive security audit of multiple aspects
   * 
   * @param params - Parameters to audit
   * @param options - Audit options
   * @returns Security audit result
   */
  static performSecurityAudit(
    params: SecurityAuditParams, 
    options: SecurityAuditOptions = {}
  ): SecurityAuditResult {
    const findings: SecurityFinding[] = [];
    
    // Audit user input if provided
    if (params.userInput) {
      const inputResult = this.auditUserInput(params.userInput, options);
      findings.push(...inputResult.findings);
    }
    
    // Audit URL if provided
    if (params.url) {
      // Check if URL is HTTPS
      if (params.url.startsWith('http://')) {
        findings.push({
          id: 'URL-SCHEME-001',
          description: 'Non-HTTPS URL detected',
          category: 'data-exposure',
          severity: 'high',
          affectedData: params.url,
          remediation: 'Use HTTPS for all URLs to ensure transport security',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html'
        });
      }
      
      // Check URL with validation utility
      if (!validation.validateUrl(params.url)) {
        findings.push({
          id: 'URL-VALID-001',
          description: 'Potentially unsafe URL detected',
          category: 'input-validation',
          severity: 'medium',
          affectedData: params.url,
          remediation: 'Validate URLs with validation.validateUrl() before processing',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html'
        });
      }
    }
    
    // Audit auth token if provided
    if (params.authToken) {
      const tokenResult = this.auditAuthToken(params.authToken, options);
      findings.push(...tokenResult.findings);
    }
    
    // Audit password strength if provided
    if (params.password) {
      const passwordResult = authentication.validatePasswordStrength(params.password);
      
      if (!passwordResult.valid) {
        findings.push({
          id: 'AUTH-PASSWORD-001',
          description: 'Weak password detected',
          category: 'authentication',
          severity: 'high',
          remediation: passwordResult.errors?.join('; ') || 'Use stronger passwords',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'
        });
      } else if (passwordResult.strength && passwordResult.strength < 50) {
        findings.push({
          id: 'AUTH-PASSWORD-002',
          description: 'Moderate strength password could be improved',
          category: 'authentication',
          severity: 'low',
          remediation: 'Consider using a longer password with more character variety',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'
        });
      }
    }
    
    // Filter findings based on options
    const filteredFindings = this.filterFindings(findings, options);
    
    return this.prepareAuditResult(filteredFindings);
  }
  
  /**
   * Audits cookies for security issues
   * 
   * @param cookieString - Cookie string to audit
   * @param options - Audit options
   * @returns Security audit result
   */
  static auditCookies(cookieString: string, options: SecurityAuditOptions = {}): SecurityAuditResult {
    const findings: SecurityFinding[] = [];
    
    // Parse cookies
    const cookies = cookieString.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      return { name, value };
    });
    
    // Check each cookie
    cookies.forEach(cookie => {
      const { name, value } = cookie;
      
      // Check for secure flag in cookie string
      if (!/Secure/i.test(cookieString)) {
        findings.push({
          id: 'COOKIE-SECURE-001',
          description: `Cookie "${name}" missing Secure flag`,
          category: 'storage',
          severity: 'high',
          affectedData: name,
          remediation: 'Set the Secure flag to ensure cookies are only sent over HTTPS',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#secure-attribute'
        });
      }
      
      // Check for HttpOnly flag in cookie string
      if (!/HttpOnly/i.test(cookieString)) {
        findings.push({
          id: 'COOKIE-HTTPONLY-001',
          description: `Cookie "${name}" missing HttpOnly flag`,
          category: 'storage',
          severity: 'medium',
          affectedData: name,
          remediation: 'Set the HttpOnly flag to prevent JavaScript access to cookies',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#httponly-attribute'
        });
      }
      
      // Check for SameSite attribute in cookie string
      if (!/SameSite=/i.test(cookieString)) {
        findings.push({
          id: 'COOKIE-SAMESITE-001',
          description: `Cookie "${name}" missing SameSite attribute`,
          category: 'csrf',
          severity: 'medium',
          affectedData: name,
          remediation: 'Set SameSite=Strict or SameSite=Lax to prevent CSRF attacks',
          reference: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#samesite-cookie-attribute'
        });
      }
    });
    
    // Filter findings based on options
    const filteredFindings = this.filterFindings(findings, options);
    
    return this.prepareAuditResult(filteredFindings);
  }
  
  /**
   * Filter findings based on options
   */
  private static filterFindings(
    findings: SecurityFinding[], 
    options: SecurityAuditOptions
  ): SecurityFinding[] {
    let result = [...findings];
    
    // Filter by category
    if (options.includeCategories && options.includeCategories.length > 0) {
      result = result.filter(finding => 
        options.includeCategories?.includes(finding.category)
      );
    }
    
    // Filter by minimum severity
    if (options.minSeverity) {
      const severityLevels: Record<SeverityLevel, number> = {
        low: 1,
        medium: 2,
        high: 3,
        critical: 4
      };
      
      const minSeverityLevel = severityLevels[options.minSeverity];
      
      result = result.filter(finding => 
        severityLevels[finding.severity] >= minSeverityLevel
      );
    }
    
    // Remove remediation if not requested
    if (options.includeRemediation === false) {
      result = result.map(finding => ({
        ...finding,
        remediation: '[Remediation details excluded]'
      }));
    }
    
    // Remove references if not requested
    if (options.includeReferences === false) {
      result = result.map(finding => ({
        ...finding,
        reference: undefined
      }));
    }
    
    return result;
  }
  
  /**
   * Prepare final audit result with summary statistics
   */
  private static prepareAuditResult(findings: SecurityFinding[]): SecurityAuditResult {
    // Count issues by severity
    const criticalCount = findings.filter(f => f.severity === 'critical').length;
    const highCount = findings.filter(f => f.severity === 'high').length;
    const mediumCount = findings.filter(f => f.severity === 'medium').length;
    const lowCount = findings.filter(f => f.severity === 'low').length;
    
    // Count issues by category
    const categoryCounts: Record<SecurityFinding['category'], number> = {
      'input-validation': 0,
      'authentication': 0,
      'csrf': 0,
      'xss': 0,
      'data-exposure': 0,
      'encryption': 0,
      'storage': 0,
      'other': 0
    };
    
    findings.forEach(finding => {
      categoryCounts[finding.category]++;
    });
    
    // Calculate security score (0-100)
    // Weight issues by severity: critical=40, high=10, medium=5, low=1
    const maxScore = 100;
    const totalPenalty = 
      criticalCount * 40 + 
      highCount * 10 + 
      mediumCount * 5 + 
      lowCount * 1;
    
    const score = Math.max(0, Math.min(maxScore - totalPenalty, maxScore));
    
    return {
      passed: criticalCount === 0,
      findings,
      summary: {
        totalIssues: findings.length,
        criticalCount,
        highCount,
        mediumCount,
        lowCount,
        categoryCounts
      },
      score,
      timestamp: Date.now()
    };
  }
}

/**
 * Helper for performing quick security audits
 * 
 * @param params - Parameters to audit
 * @param options - Audit options
 * @returns Security audit result
 */
export const auditSecurity = (
  params: SecurityAuditParams,
  options: SecurityAuditOptions = {}
): SecurityAuditResult => {
  return SecurityAuditor.performSecurityAudit(params, options);
};

/**
 * Helper for auditing user input
 * 
 * @param input - Input string to audit
 * @param options - Audit options
 * @returns Security audit result
 */
export const auditUserInput = (
  input: string,
  options: SecurityAuditOptions = {}
): SecurityAuditResult => {
  return SecurityAuditor.auditUserInput(input, options);
};
