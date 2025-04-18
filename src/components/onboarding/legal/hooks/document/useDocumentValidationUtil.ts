
import { validateFile } from './validation/fileValidation';
import { validateRequiredFields } from './validation/fieldValidation';

export const DocumentValidationUtil = {
  validateFile,
  validateDocumentFields: validateRequiredFields
};
