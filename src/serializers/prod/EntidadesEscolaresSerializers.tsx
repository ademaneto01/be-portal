import { EntitiesEntidadesEscolares } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  uid: string;
  id_ec: string;
  nome_operacional: string;
  cnpj: string;
  cep: string;
  logradouro: string;
  municipio: string;
  uf: string;
  bairro: string;
  complemento: string;
  ativo: boolean;
}

export default class EntidadesEscolaresSerializers
  implements SerializerInterface
{
  toEntity(otd: UsersMockPayload): EntitiesEntidadesEscolares {
    return new EntitiesEntidadesEscolares({
      uid: otd.uid,
      id_ec: otd.id_ec,
      nome_operacional: otd.nome_operacional,
      cnpj: otd.cnpj,
      cep: otd.cep,
      logradouro: otd.logradouro,
      municipio: otd.municipio,
      uf: otd.uf,
      bairro: otd.bairro,
      complemento: otd.complemento,
      ativo: otd.ativo,
    });
  }
}
