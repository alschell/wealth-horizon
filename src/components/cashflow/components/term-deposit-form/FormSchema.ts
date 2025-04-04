
import { z } from "zod";

// Define our form schema
export const formSchema = z.object({
  amount: z.coerce.number().positive({
    message: "Amount must be greater than 0.",
  }),
  currency: z.string({
    required_error: "Please select a currency.",
  }),
  term: z.string({
    required_error: "Please select a term.",
  }),
  bank: z.string({
    required_error: "Please select a bank.",
  }),
  bankSelection: z.enum(["best", "custom"], {
    required_error: "Please select bank selection method.",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
