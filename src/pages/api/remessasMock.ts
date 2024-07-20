import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import wait from "./_wait";

interface RemessaOTD {
  id: string;
  data: string;
  status: string;
  quantidadeDeBoletos: number;
}

function mockData(amount: number): RemessaOTD[] {
  const data = [];
  for (let i = 0; i < amount; i++) {
    const item = {
      id: faker.datatype.uuid(),
      data: faker.date.recent().toISOString(),
      status: faker.word.adjective(),
      quantidadeDeBoletos: faker.datatype.number({ min: 1, max: 100 }),
    };
    data.push(item);
  }
  return data;
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<RemessaOTD[]>
) {
  await wait();
  res.status(200).json(mockData(10));
}
