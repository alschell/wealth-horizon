
import { createInputChangeHandler, createBlurHandler } from '../formEventHandlers';

describe('createInputChangeHandler', () => {
  it('should handle input changes correctly', () => {
    const setValues = jest.fn();
    const clearError = jest.fn();
    const handler = createInputChangeHandler(setValues, clearError);
    
    handler({
      target: { name: 'test', value: 'value', type: 'text' }
    } as any);
    
    expect(setValues).toHaveBeenCalled();
    expect(clearError).toHaveBeenCalled();
  });
});

describe('createBlurHandler', () => {
  it('should handle blur events correctly', () => {
    const setTouched = jest.fn();
    const handler = createBlurHandler(setTouched);
    
    handler('test');
    
    expect(setTouched).toHaveBeenCalled();
  });
});
