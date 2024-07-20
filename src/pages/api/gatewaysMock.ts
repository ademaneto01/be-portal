import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import wait from "./_wait";

interface GatewayOTD {
  id: string;
  nome: string;
  tipo: string;
}

function mockData(amount: number): GatewayOTD[] {
  const data = [];
  for (let i = 0; i < amount; i++) {
    const item = {
      id: faker.datatype.uuid(),
      nome: faker.company.name(),
      tipo: faker.company.bsNoun(),
    };
    data.push(item);
  }
  return data;
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<GatewayOTD[]>
) {
  await wait();
  res.status(200).json(mockData(10));
}
