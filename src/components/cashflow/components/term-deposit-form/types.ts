
export interface TermDepositFormProps {
  onSubmit: (data: TermDepositData) => void;
}

export interface TermDepositData {
  amount: number;
  term: string;
  rate: number;
  institution: string;
}
