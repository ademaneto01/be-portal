import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import wait from "./_wait";
import { contratoBeesInterface } from "@/interfaces";

const installmentStatus = ["PENDING", "PAID", "OVERDUE", "RENEGOTIATED"];

function kebabDate(): string {
  function pad(num: number): string {
    return num.toString().padStart(2, "0");
  }
  const date = faker.date.past();
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function randomAmount({
  min,
  max,
  builder,
}: {
  min: number;
  max: number;
  builder: Function;
}) {
  return Array.from({
    length: faker.datatype.number({ min, max }),
  }).map((_) => builder());
}

function choice(options: string[]): string {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function createInstallments(
  amount: number
): contratoBeesInterface.Installmenet[] {
  const installments = [];
  for (let i = 0; i < amount; i++) {
    const installment = {
      external_id: faker.datatype.number({ min: 10000, max: 99999 }).toString(),
      status: choice(installmentStatus),
      value: faker.datatype.float({
        min: 100,
        max: 999999,
        precision: 0.01,
      }),
      due_date: kebabDate(),
      interest_value: faker.datatype.float({
        min: 100,
        max: 999999,
        precision: 0.01,
      }),
      additional_other_items: 0,
      discount_pre_payment: 0,
      discount_other_items: 0,
      number: i,
    };
    installments.push(installment);
  }
  return installments;
}

function mockData(amount: number): contratoBeesInterface.Contrato[] {
  const data = [];
  for (let i = 0; i < amount; i++) {
    const item = {
      id: faker.datatype.uuid(),
      operation_tracking_id: faker.datatype.uuid(),
      external_id: faker.datatype.number({ min: 1000, max: 99999 }).toString(),
      document: faker.datatype
        .number({ min: 10000000000000, max: 99999999999999 })
        .toString(),
      product_id: faker.datatype.number({ min: 100, max: 999 }).toString(),
      product_name: faker.commerce.productName(),
      principal_value: faker.datatype.float({
        min: 100,
        max: 999999,
        precision: 0.01,
      }),
      debt_value: faker.datatype.float({
        min: 100,
        max: 999999,
        precision: 0.01,
      }),
      reference_date: kebabDate(),
      partner: faker.random.word().toUpperCase(),
      name: faker.company.name(),
      status: faker.word.adjective().toUpperCase(),
      issue_date: kebabDate(),
      disbursement_target_date: kebabDate(),
      disbursement_date: kebabDate(),
      financial_information: {
        total_installments_number: faker.datatype.number({ min: 1, max: 30 }),
        installment_amount: faker.datatype.float({
          min: 100,
          max: 99999,
          precision: 0.01,
        }),
        installment_sum: faker.datatype.float({
          min: 100,
          max: 99999,
          precision: 0.01,
        }),
        interest_annual_rate: faker.datatype.float({
          min: 0.01,
          max: 1,
          precision: 0.0001,
        }),
        interest_monthly_rate: faker.datatype.float({
          min: 0.01,
          max: 1,
          precision: 0.0001,
        }),
        cet_monthly: faker.datatype.float({
          min: 0.01,
          max: 1,
          precision: 0.0001,
        }),
        cet_annual: faker.datatype.float({
          min: 0.01,
          max: 1,
          precision: 0.0001,
        }),
        total_amount_taxes: faker.datatype.float({
          min: 10,
          max: 9999,
          precision: 0.01,
        }),
        total_amount_costs: faker.datatype.float({
          min: 0,
          max: 9999,
          precision: 0.01,
        }),
        gross_amount_value: faker.datatype.float({
          min: 1000,
          max: 999999,
          precision: 0.01,
        }),
        first_amount_date: kebabDate(),
        last_installment_date: kebabDate(),
        iof_fixed_rate: faker.datatype.float({
          min: 0.0001,
          max: 1,
          precision: 0.0001,
        }),
        iof_daily_rate: faker.datatype.float({
          min: 0.000001,
          max: 1,
          precision: 0.000001,
        }),
        iof_total_rate: faker.datatype.float({
          min: 0.000001,
          max: 1,
          precision: 0.000001,
        }),
        iof_total_value: faker.datatype.float({
          min: 100,
          max: 9999,
          precision: 0.01,
        }),
        costs_fixed_share: faker.datatype.float({
          min: 100,
          max: 9999,
          precision: 0.01,
        }),
        costs_rate_share: faker.datatype.float({
          min: 100,
          max: 9999,
          precision: 0.01,
        }),
        interest_value: faker.datatype.float({
          min: 100,
          max: 999999,
          precision: 0.01,
        }),
        gross_costs_total_value: faker.datatype.float({
          min: 100,
          max: 999999,
          precision: 0.01,
        }),
      },
      installments: createInstallments(
        faker.datatype.number({ min: 1, max: 30 })
      ),
      customer_id: faker.datatype.uuid(),
      original_contracts: randomAmount({
        min: 1,
        max: 5,
        builder: () => {
          return {
            contract: faker.datatype.uuid(),
            original_contract: faker.datatype.uuid(),
          };
        },
      }),
      contacts: randomAmount({
        min: 1,
        max: 5,
        builder: () => {
          return {
            name: faker.name.fullName(),
            corporate_name: faker.company.name(),
            emails: randomAmount({
              min: 1,
              max: 5,
              builder: () => {
                return {
                  email: faker.internet.email(),
                };
              },
            }),
            phones: randomAmount({
              min: 1,
              max: 5,
              builder: () => {
                return {
                  ddd: faker.datatype.number({ min: 10, max: 99 }),
                  ddi: faker.datatype.number({ min: 10, max: 99 }),
                  number: faker.datatype.number({
                    min: 90000000,
                    max: 999999999,
                  }),
                };
              },
            }),
            adresses: randomAmount({
              min: 1,
              max: 5,
              builder: () => {
                return {
                  zip_code: `${faker.datatype.number({
                    min: 10000,
                    max: 99999,
                  })}-${faker.datatype.number({ min: 100, max: 999 })}`,
                  street: faker.address.streetName(),
                  number: faker.datatype.number({ min: 1, max: 9999 }),
                  neighborhood: faker.word.noun(),
                  city: faker.address.city(),
                  state: faker.address.state(),
                };
              },
            }),
            origin: faker.company.name().toUpperCase().split(" ").join("_"),
            created_at: faker.date.past().toISOString().split("Z").join(""),
          };
        },
      }),
    };
    data.push(item);
  }
  return data;
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<contratoBeesInterface.Contrato[]>
) {
  await wait();
  res.status(200).json(mockData(2));
}
