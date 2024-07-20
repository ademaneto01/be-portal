import { TableActions } from "@/components/actions";
import { OnOffToggler } from "@/components/shared";

interface CarteiraProps {
  id: string;
  ativo: boolean;
  nomeGeral: string;
  nomeEspecifico: string;
  url: string;
  dataDeCriacao: string;
}

export default class Carteira {
  readonly id: string;
  readonly nomeGeral: string;
  readonly nomeEspecifico: string;
  readonly url: string;
  readonly dataDeCriacao: string;
  private readonly _ativo: boolean;

  constructor({
    id,
    ativo,
    nomeGeral,
    nomeEspecifico,
    url,
    dataDeCriacao,
  }: CarteiraProps) {
    this.id = id;
    this.nomeGeral = nomeGeral;
    this.nomeEspecifico = nomeEspecifico;
    this.url = url;
    this.dataDeCriacao = dataDeCriacao;
    this._ativo = ativo;
  }

  public get ativo(): JSX.Element {
    return <OnOffToggler active={this._ativo} />;
  }

  public get acoes(): JSX.Element {
    return <TableActions />;
  }
}
