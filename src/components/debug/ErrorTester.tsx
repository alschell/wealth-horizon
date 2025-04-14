
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { withErrorHandling } from '@/utils/errorHandling/withErrorHandling';

// Error types that can be triggered
const ERROR_TYPES = {
  RENDER: 'render',
  ASYNC: 'async',
  EVENT: 'event',
  EFFECT: 'effect',
  NESTED: 'nested',
  NONE: 'none'
};

interface ErrorTesterProps {
  componentName?: string;
}

const ErrorTrigger: React.FC<{ errorType: string }> = ({ errorType }) => {
  if (errorType === ERROR_TYPES.RENDER) {
    throw new Error('Render error triggered by ErrorTester');
  }
  
  React.useEffect(() => {
    if (errorType === ERROR_TYPES.EFFECT) {
      throw new Error('Effect error triggered by ErrorTester');
    }
  }, [errorType]);
  
  const handleClick = () => {
    if (errorType === ERROR_TYPES.EVENT) {
      throw new Error('Event handler error triggered by ErrorTester');
    }
  };
  
  return (
    <div>
      <p className="text-yellow-600 font-medium">Error trigger active: {errorType}</p>
      <Button 
        variant="destructive" 
        onClick={handleClick}
        className="mt-2"
      >
        Trigger Event Error
      </Button>
    </div>
  );
};

const NestedErrorComponent: React.FC<{ shouldError: boolean }> = ({ shouldError }) => {
  if (shouldError) {
    throw new Error('Nested component error triggered by ErrorTester');
  }
  
  return <p className="text-green-600">Nested component rendered successfully</p>;
};

// The main error tester component
const ErrorTesterComponent: React.FC<ErrorTesterProps> = ({ componentName = 'ErrorTester' }) => {
  const [errorType, setErrorType] = useState<string>(ERROR_TYPES.NONE);
  const [showNested, setShowNested] = useState(false);
  
  const triggerAsyncError = async () => {
    try {
      await new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('Async error triggered by ErrorTester')), 500);
      });
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Error Boundary Tester</CardTitle>
        <CardDescription>Test how error boundaries handle different types of errors</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="error-type">Error Type</Label>
          <Select
            value={errorType}
            onValueChange={setErrorType}
          >
            <SelectTrigger id="error-type">
              <SelectValue placeholder="Select error type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ERROR_TYPES.NONE}>No Error</SelectItem>
              <SelectItem value={ERROR_TYPES.RENDER}>Render Error</SelectItem>
              <SelectItem value={ERROR_TYPES.ASYNC}>Async Error</SelectItem>
              <SelectItem value={ERROR_TYPES.EVENT}>Event Handler Error</SelectItem>
              <SelectItem value={ERROR_TYPES.EFFECT}>Effect Error</SelectItem>
              <SelectItem value={ERROR_TYPES.NESTED}>Nested Component Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="show-nested"
            checked={showNested}
            onCheckedChange={setShowNested}
          />
          <Label htmlFor="show-nested">Show nested component</Label>
        </div>
        
        {errorType !== ERROR_TYPES.NONE && errorType !== ERROR_TYPES.ASYNC && errorType !== ERROR_TYPES.NESTED && (
          <ErrorTrigger errorType={errorType} />
        )}
        
        {errorType === ERROR_TYPES.ASYNC && (
          <Button 
            variant="destructive" 
            onClick={triggerAsyncError}
          >
            Trigger Async Error
          </Button>
        )}
        
        {showNested && (
          <div className="p-3 border rounded-md">
            <h3 className="text-sm font-medium mb-2">Nested Component:</h3>
            <NestedErrorComponent shouldError={errorType === ERROR_TYPES.NESTED} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">Component: {componentName}</p>
        <Button
          variant="outline"
          onClick={() => setErrorType(ERROR_TYPES.NONE)}
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

// Export the component wrapped with error handling
export default withErrorHandling(ErrorTesterComponent, {
  componentName: 'ErrorTester',
  fallbackMessage: 'The error tester component crashed',
  showReset: true
});
