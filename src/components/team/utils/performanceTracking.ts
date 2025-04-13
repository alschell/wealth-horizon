
/**
 * Performance monitoring utilities for team components
 * Tracks rendering, data loading, and filtering operations
 */

// Interface for tracked operations
interface PerformanceOperation {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

// Track active operations
const activeOperations: Map<string, PerformanceOperation> = new Map();

// Store completed operations for analysis
const completedOperations: PerformanceOperation[] = [];

// Maximum number of operations to store
const MAX_OPERATIONS = 100;

/**
 * Start tracking a performance operation
 * @param operationName Name of the operation to track
 * @param metadata Additional context about the operation
 * @returns Operation ID for later reference
 */
export function startOperation(operationName: string, metadata?: Record<string, any>): string {
  const operationId = `${operationName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const operation: PerformanceOperation = {
    name: operationName,
    startTime: performance.now(),
    metadata
  };
  
  activeOperations.set(operationId, operation);
  
  // Create a performance mark
  try {
    performance.mark(`${operationName}-start`);
  } catch (e) {
    console.debug('Performance API not fully supported:', e);
  }
  
  // Log start for debugging
  console.debug(`Started operation: ${operationName}`, metadata || '');
  
  return operationId;
}

/**
 * End tracking a performance operation
 * @param operationId ID returned from startOperation
 * @param additionalMetadata Any additional data to add
 * @returns Duration of the operation in ms
 */
export function endOperation(
  operationId: string, 
  additionalMetadata?: Record<string, any>
): number | undefined {
  const operation = activeOperations.get(operationId);
  
  if (!operation) {
    console.warn(`Operation ${operationId} not found or already completed`);
    return undefined;
  }
  
  // Record end time and calculate duration
  operation.endTime = performance.now();
  operation.duration = operation.endTime - operation.startTime;
  
  // Merge additional metadata if provided
  if (additionalMetadata) {
    operation.metadata = {
      ...operation.metadata,
      ...additionalMetadata
    };
  }
  
  // Create performance mark and measure
  try {
    performance.mark(`${operation.name}-end`);
    performance.measure(
      operation.name,
      `${operation.name}-start`,
      `${operation.name}-end`
    );
  } catch (e) {
    console.debug('Performance API not fully supported:', e);
  }
  
  // Log completion for debugging
  console.debug(
    `Completed operation: ${operation.name} in ${operation.duration.toFixed(2)}ms`,
    operation.metadata || ''
  );
  
  // Add to completed operations
  completedOperations.push(operation);
  
  // Limit the size of completed operations
  if (completedOperations.length > MAX_OPERATIONS) {
    completedOperations.shift();
  }
  
  // Remove from active operations
  activeOperations.delete(operationId);
  
  return operation.duration;
}

/**
 * Get performance metrics for analysis
 * @returns Object with performance statistics
 */
export function getPerformanceMetrics() {
  // Calculate average durations by operation type
  const operationTypes = new Map<string, number[]>();
  
  completedOperations.forEach(op => {
    if (op.duration) {
      const durations = operationTypes.get(op.name) || [];
      durations.push(op.duration);
      operationTypes.set(op.name, durations);
    }
  });
  
  // Calculate averages and max values
  const metrics = {
    operations: completedOperations.length,
    averages: {} as Record<string, number>,
    max: {} as Record<string, number>,
    recentOperations: completedOperations.slice(-10).map(op => ({
      name: op.name,
      duration: op.duration,
      timestamp: new Date(performance.timeOrigin + op.startTime).toISOString()
    }))
  };
  
  operationTypes.forEach((durations, name) => {
    const total = durations.reduce((sum, val) => sum + val, 0);
    metrics.averages[name] = total / durations.length;
    metrics.max[name] = Math.max(...durations);
  });
  
  return metrics;
}

/**
 * Reset and clear all performance tracking data
 */
export function resetPerformanceTracking() {
  activeOperations.clear();
  completedOperations.length = 0;
  
  // Clear performance entries if available
  if (typeof performance !== 'undefined' && performance.clearMarks) {
    performance.clearMarks();
    performance.clearMeasures();
  }
  
  console.debug('Performance tracking data has been reset');
}

/**
 * Higher-order function to track performance of any function
 * @param fn Function to track
 * @param operationName Name for the operation
 * @param metadata Additional context about the operation
 * @returns Wrapped function with performance tracking
 */
export function trackPerformance<T extends (...args: any[]) => any>(
  fn: T,
  operationName: string,
  metadata?: Record<string, any>
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const opId = startOperation(operationName, {
      ...metadata,
      arguments: args.map(arg => typeof arg === 'object' ? '[Object]' : arg)
    });
    
    try {
      const result = fn(...args);
      
      // Handle promises
      if (result instanceof Promise) {
        return result
          .then(value => {
            endOperation(opId, { status: 'success' });
            return value;
          })
          .catch(error => {
            endOperation(opId, { status: 'error', error: error.message });
            throw error;
          }) as ReturnType<T>;
      }
      
      // Handle synchronous functions
      endOperation(opId, { status: 'success' });
      return result;
    } catch (error) {
      endOperation(opId, { 
        status: 'error', 
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  };
}
