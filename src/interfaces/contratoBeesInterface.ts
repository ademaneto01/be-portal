export interface Installmenet {
  external_id: string;
  status: string;
  due_date: string;
  interest_value: number;
  value: number;
  additional_other_items: number;
  discount_pre_payment: number;
  discount_other_items: number;
  number: number;
}

export interface Phone {
  ddd: number;
  ddi: number;
  number: number;
}

export interface Adress {
  zip_code: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Email {
  email: string;
}

export interface Contact {
  name: string;
  corporate_name: string;
  emails: Email[];
  phones: Phone[];
  adresses: Adress[];
  origin: string;
  created_at: string;
}

export interface OriginalContract {
  contract: string;
  original_contract: string;
}

export interface Contrato {
  id: string;
  operation_tracking_id: string;
  external_id: string;
  document: string;
  product_id: string;
  product_name: string;
  principal_value: number;
  debt_value: number;
  reference_date: string;
  partner: string;
  name: string;
  status: string;
  issue_date: string;
  disbursement_target_date: string;
  disbursement_date: string;
  financial_information: {
    total_installments_number: number;
    installment_amount: number;
    installment_sum: number;
    interest_annual_rate: number;
    interest_monthly_rate: number;
    cet_monthly: number;
    cet_annual: number;
    total_amount_taxes: number;
    total_amount_costs: number;
    gross_amount_value: number;
    first_amount_date: string;
    last_installment_date: string;
    iof_fixed_rate: number;
    iof_daily_rate: number;
    iof_total_rate: number;
    iof_total_value: number;
    costs_fixed_share: number;
    costs_rate_share: number;
    interest_value: number;
    gross_costs_total_value: number;
  };
  installments: Installmenet[];
  customer_id: string;
  original_contracts: OriginalContract[];
  contacts: Contact[];
}
