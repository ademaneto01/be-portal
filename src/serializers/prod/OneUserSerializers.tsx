import { EntitiesOneUser } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  uid: string;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  id_ee: string;
  ativo: boolean;
}

export default class OneUserSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesOneUser {
    return new EntitiesOneUser({
      uid: otd.uid,
      nome: otd.nome,
      email: otd.email,
      senha: otd.senha,
      perfil: otd.perfil,
      id_ee: otd.id_ee,
      ativo: otd.ativo,
    });
  }
}
