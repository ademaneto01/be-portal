import { EntitiesUserLogin } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  uid: string;
  nome: string;
  email: string;
  token: string;
  perfil: string;
  id_ee: string;
}

export default class UserLoginSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUserLogin {
    return new EntitiesUserLogin({
      uid: otd.uid,
      nome: otd.nome,
      email: otd.email,
      token: otd.token,
      perfil: otd.perfil,
      id_ee: otd.id_ee,
    });
  }
}
