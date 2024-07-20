import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import wait from "./_wait";

interface UsuarioOTD {
  id: string;
  nome: string;
  email: string;
}

function mockData(amount: number): UsuarioOTD[] {
  const data = [];
  for (let i = 0; i < amount; i++) {
    const item = {
      id: faker.datatype.uuid(),
      nome: faker.name.fullName(),
      email: faker.internet.email(),
    };
    data.push(item);
  }
  return data;
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<UsuarioOTD[]>
) {
  await wait();
  res.status(200).json(mockData(10));
}
