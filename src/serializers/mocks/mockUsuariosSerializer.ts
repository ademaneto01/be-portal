import { Usuario } from "@/entities";
import { SerializerInterface } from "@/interfaces";

interface UsuarioMockPayload {
  id: string;
  nome: string;
  email: string;
}

export default class MockUsuarioSerializer implements SerializerInterface {
  toEntity(otd: UsuarioMockPayload): Usuario {
    return new Usuario({
      id: otd.id,
      nome: otd.nome,
      email: otd.email,
    });
  }
}
