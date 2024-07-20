import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import wait from "./_wait";

interface CarteiraOTD {
  id: string;
  ativo: boolean;
  nomeGeral: string;
  nomeEspecifico: string;
  url: string;
  dataDeCriacao: string;
}

function mockData(amount: number): CarteiraOTD[] {
  const data = [];
  for (let i = 0; i < amount; i++) {
    const nome = faker.company.name();
    const carteira = {
      id: faker.datatype.uuid(),
      ativo: faker.datatype.boolean(),
      nomeGeral: nome,
      nomeEspecifico: nome,
      url: faker.internet.url(),
      dataDeCriacao: faker.date.past().toISOString(),
    };
    data.push(carteira);
  }
  return data;
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<CarteiraOTD[]>
) {
  await wait();
  res.status(200).json(mockData(10));
}
