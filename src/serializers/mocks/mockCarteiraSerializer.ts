import { Carteira } from "@/entities";
import { SerializerInterface } from "@/interfaces";

interface CarteiraMockPayload {
  id: string;
  ativo: boolean;
  nomeGeral: string;
  nomeEspecifico: string;
  url: string;
  dataDeCriacao: string;
}

export default class MockCarteiraSerializer implements SerializerInterface {
  toEntity(otd: CarteiraMockPayload): Carteira {
    return new Carteira({
      id: otd.id,
      ativo: otd.ativo,
      nomeGeral: otd.nomeGeral,
      nomeEspecifico: otd.nomeEspecifico,
      url: otd.url,
      dataDeCriacao: otd.dataDeCriacao,
    });
  }
}
