export interface InsurancePolicy {
    id: number;
    policyNumber: string;
    insuranceAmount: number;
    startDate: Date;
    endDate: Date;
    userId: number; // Reference to user id
  }
  