import { TableActions } from "@/components/actions";

interface RemessaProps {
  id: string;
  data: string;
  status: string;
  quantidadeDeBoletos: number;
}

export default class Remessa {
  readonly id: string;
  readonly data: string;
  readonly status: string;
  readonly quantidadeDeBoletos: number;

  constructor({ id, data, status, quantidadeDeBoletos }: RemessaProps) {
    this.id = id;
    this.data = data;
    this.status = status;
    this.quantidadeDeBoletos = quantidadeDeBoletos;
  }

  public get acoes(): JSX.Element {
    return <TableActions />;
  }
}
