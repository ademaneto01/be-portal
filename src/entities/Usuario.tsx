import { TableActions } from "@/components/actions";

interface UsuarioProps {
  id: string;
  nome: string;
  email: string;
}

export default class Usuario {
  readonly id: string;
  readonly nome: string;
  readonly email: string;

  constructor({ id, nome, email }: UsuarioProps) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }

  public get acoes(): JSX.Element {
    return <TableActions />;
  }
}
