
// Export all constants from separate files
export * from './institutions';
export * from './legalEntities';
export * from './leiMappings';

// Re-export the ensureAllInstitutionsHaveLegalEntities function
import { ensureAllInstitutionsHaveLegalEntities } from '../entry/constants/legalEntities';
export { ensureAllInstitutionsHaveLegalEntities };
