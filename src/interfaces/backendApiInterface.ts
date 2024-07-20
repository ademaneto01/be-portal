import { Carteira, Gateway, Remessa, Usuario } from "@/entities";
import { SearchTypeEnum } from "@/enums";

export default interface BackendApiInterface {
  getCarteiras(): Promise<Carteira[]>;
  getGateways(): Promise<Gateway[]>;
  getUsuarios(): Promise<Usuario[]>;
  getRemessas(): Promise<Remessa[]>;
  buscarContratos(busca: string, tipo: SearchTypeEnum): Promise<unknown>;
}
