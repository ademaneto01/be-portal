import {
  Carteira,
  Gateway,
  Remessa,
  Usuario,
  ContratoBuscado,
} from "@/entities";
import { SearchTypeEnum } from "@/enums";
import { FailedToFetchError } from "@/errors";
import { BackendApiInterface, SerializerInterface } from "@/interfaces";
import { BeesContratoSerializer } from "@/serializers";
import {
  MockCarteiraSerializer,
  MockGatewaySerializer,
  MockRemessaSerializer,
  MockUsuarioSerializer,
} from "@/serializers/mocks";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class BackendApiMock implements BackendApiInterface {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000/api",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getCarteiras(): Promise<Carteira[]> {
    return await this.get<Carteira>(
      "/carteirasMock",
      new MockCarteiraSerializer()
    );
  }

  public async getGateways(): Promise<Gateway[]> {
    return await this.get<Gateway>(
      "/gatewaysMock",
      new MockGatewaySerializer()
    );
  }

  public async getUsuarios(): Promise<Usuario[]> {
    return await this.get<Usuario>(
      "/usuariosMock",
      new MockUsuarioSerializer()
    );
  }

  public async getRemessas(): Promise<Remessa[]> {
    return await this.get<Remessa>(
      "/remessasMock",
      new MockRemessaSerializer()
    );
  }

  public async buscarContratos(
    busca: string,
    tipo: SearchTypeEnum
  ): Promise<ContratoBuscado[]> {
    const response = await this.api.post("/buscarContratosMock", {
      busca,
      tipo,
    });
    const serializer = new BeesContratoSerializer();
    return this.serializeOrError<ContratoBuscado>(response, serializer);
  }

  private async get<T>(
    route: string,
    serializer: SerializerInterface
  ): Promise<T[]> {
    const response = await this.api.get(route);
    return this.serializeOrError<T>(response, serializer);
  }

  private serializeOrError<T>(
    response: AxiosResponse,
    serializer: SerializerInterface
  ): T[] {
    if (response.status === 200) {
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
