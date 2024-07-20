import { TableActions } from "@/components/actions";

interface GatewayProps {
  id: string;
  nome: string;
  tipo: string;
}

export default class Gateway {
  readonly id: string;
  readonly nome: string;
  readonly tipo: string;

  constructor({ id, nome, tipo }: GatewayProps) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
  }

  public get acoes(): JSX.Element {
    return <TableActions />;
  }
}
