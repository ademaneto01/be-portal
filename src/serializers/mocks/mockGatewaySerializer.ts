import { Gateway } from "@/entities";
import { SerializerInterface } from "@/interfaces";

interface GatewayMockPayload {
  id: string;
  nome: string;
  tipo: string;
}

export default class MockGatewaySerializer implements SerializerInterface {
  toEntity(otd: GatewayMockPayload): Gateway {
    return new Gateway({
      id: otd.id,
      nome: otd.nome,
      tipo: otd.tipo,
    });
  }
}
