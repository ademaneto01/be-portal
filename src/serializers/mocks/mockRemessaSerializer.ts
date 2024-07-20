import { Remessa } from "@/entities";
import { formatDate } from "@/format";
import { SerializerInterface } from "@/interfaces";

interface RemessaMockPayload {
  id: string;
  data: string;
  status: string;
  quantidadeDeBoletos: number;
}

export default class MockRemessaSerializer implements SerializerInterface {
  toEntity(otd: RemessaMockPayload): Remessa {
    return new Remessa({
      id: otd.id,
      data: formatDate.fromIso(otd.data),
      status: otd.status,
      quantidadeDeBoletos: otd.quantidadeDeBoletos,
    });
  }
}
