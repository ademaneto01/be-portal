import {
    EntitiesUserLogin,
  } from '@/entities';
  import { FailedToFetchError } from '@/errors';
  import { BackendApiInterfacePost, SerializerInterface } from '@/interfaces';
  import {
    UserLoginSerializers,
  } from '@/serializers/prod';
  
  import axios, { AxiosInstance, AxiosResponse } from 'axios';
  
  export default class BackendApiPost implements BackendApiInterfacePost {
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
  
    public async userLogin(userData: any): Promise<EntitiesUserLogin[]> {
      return await this.post<EntitiesUserLogin>(
        '/login',
        userData,
        new UserLoginSerializers(),
      );
    }
  
   
    private async post<T>(
      route: string,
      data: any,
      serializer: SerializerInterface,
    ): Promise<T[]> {
      const response = await this.api.post(route, data);
  
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
        throw new FailedToFetchError();
      }
    }
  }
  