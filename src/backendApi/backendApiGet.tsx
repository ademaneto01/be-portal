import {
  EntitiesUrl,
  EntitiesUsers,
  EntitiesMetaBaseIframe,
  EntitiesEntidadesEscolares
} from '@/entities';
import { FailedToFetchError } from '@/errors';
import { BackendApiInterfaceGet, SerializerInterface } from '@/interfaces';
import {
  UsersSerializers,
  MetaBaseIframeSerializers,
  UrlSerializers,
  EntidadesEscolaresSerializers
} from '@/serializers/prod';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class BackendApiGet implements BackendApiInterfaceGet {
  private api: AxiosInstance;
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || undefined;

    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.accessToken
          ? `Bearer ${this.accessToken}`
          : undefined,
      },
    });
  }

  public async localizarUsuarios(): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuarios',
      new UsersSerializers(),
    );
  }

  public async localizarEntidadeEscolar(
    id_ec: any,
  ): Promise<EntitiesEntidadesEscolares[]> {
    return await this.get<EntitiesEntidadesEscolares>(
      '/localizarEntidadeEscolar',
      new EntidadesEscolaresSerializers(),
      { uid: id_ec },
    );
  }
  public async metaBaseIframe(
    nomeEscola: any,
  ): Promise<EntitiesMetaBaseIframe[]> {
    return await this.get<EntitiesMetaBaseIframe>(
      '/metaBaseIframe',
      new MetaBaseIframeSerializers(),
      { uid: nomeEscola },
    );
  }

  public async getUrl(uid: any): Promise<EntitiesUrl[]> {
    return await this.get<EntitiesUrl>(
      '/findDadosUser',

      new UrlSerializers(),
      { uid: uid },
    );
  }

 

  public async localizarUsuario(uid: any): Promise<EntitiesUsers[]> {
    return await this.get<EntitiesUsers>(
      '/localizarUsuario',

      new UsersSerializers(),
      { uid: uid },
    );
  }
 
  public async localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]> {
    return await this.get<EntitiesUrl>(
      '/localizarUrlPainel',
      new UrlSerializers(),
      { uid: id_ee },
    );
  }

  private async get<T>(
    route: string,
    serializer: SerializerInterface,
    data?: any,
  ): Promise<T[]> {
    let response: AxiosResponse;

    response = data
      ? await this.api.get(
          `${route}?uid=${
            route === '/listarIndividualAlunados' ||
            route === '/listarIndividualTurmas' ||
            route === '/metaBaseIframe'
              ? JSON.stringify(data.uid)
              : data.uid
          }`,
        )
      : await this.api.get(route);
     
    return this.serializeOrError<T>(response, serializer);
  }

  private serializeOrError<T>(
    response: AxiosResponse,
    serializer: SerializerInterface,
  ): T[] {
    if (response.status === 200 || response.status === 201) {
      const entities: T[] = [];
      for (let otd of response.data) {
        const entity = serializer.toEntity(otd);

        entities.push(entity);
      }

      return entities;
    } else {
      throw FailedToFetchError;
    }
  }
}
