
import { TradingFormState } from "../types/tradingHookTypes";
import { showError } from "@/utils/toast";

/**
 * Validation utility for trading form
 */
export const tradingValidation = {
  /**
   * Validates instrument selection
   */
  validateInstrumentSelection: (instrument: any): boolean => {
    if (!instrument) {
      showError('Validation Error', 'Please select an instrument');
      return false;
    }
    return true;
  },

  /**
   * Validates order execution type selection
   */
  validateOrderExecution: (executionType: string): boolean => {
    if (!executionType) {
      showError('Validation Error', 'Please select an order execution type');
      return false;
    }
    return true;
  },

  /**
   * Validates quantity and price based on execution type
   */
  validateQuantityPrice: (quantity: number | "", price: number | "", executionType: string): boolean => {
    if (!quantity && quantity !== 0) {
      showError('Validation Error', 'Please enter a valid quantity');
      return false;
    }

    if (executionType === 'limit' && (!price && price !== 0)) {
      showError('Validation Error', 'Please enter a valid price for limit orders');
      return false;
    }

    return true;
  },

  /**
   * Validates broker selection
   */
  validateBrokerSelection: (broker: string | "best" | undefined): boolean => {
    if (!broker) {
      showError('Validation Error', 'Please select a broker');
      return false;
    }
    return true;
  },

  /**
   * Validates allocations for specific order types
   */
  validateAllocations: (orderType: string, order: any): boolean => {
    if (orderType === 'buy' && (!order.fundingAllocations || order.fundingAllocations.length === 0)) {
      showError('Validation Error', 'Please select at least one funding source');
      return false;
    }
    return true;
  }
};
