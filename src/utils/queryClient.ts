
import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = (config?: any) => {
  return new QueryClient(config);
};
