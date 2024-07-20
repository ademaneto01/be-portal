import { EntitiesUrl } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface UsersMockPayload {
  uid: string;
  id_ee: string;
  url_painel: string;
  time_stamp: string;
}

export default class UrlSerializers implements SerializerInterface {
  toEntity(otd: UsersMockPayload): EntitiesUrl {
    return new EntitiesUrl({
      uid: otd.uid,
      id_ee: otd.id_ee,
      url_painel: otd.url_painel,
      time_stamp: otd.time_stamp,
    });
  }
}
