import { StatusDeContratoEnum } from "@/enums";

interface DadosBasicosProps {
  nomeDoCliente: string;
  email: string;
  dataDeImportacao: Date;
  contrato: string;
  telefone: string;
  fundo: string;
  cpfCnpj: string;
  status: StatusDeContratoEnum;
  realizadoPor: string;
}

export default class DadosBasicos {
  readonly nomeDoCliente: string;
  readonly email: string;
  readonly dataDeImportacao: Date;
  readonly contrato: string;
  readonly telefone: string;
  readonly fundo: string;
  readonly cpfCnpj: string;
  readonly status: StatusDeContratoEnum;
  readonly realizadoPor: string;

  constructor({
    nomeDoCliente,
    email,
    dataDeImportacao,
    contrato,
    telefone,
    fundo,
    cpfCnpj,
    status,
    realizadoPor,
  }: DadosBasicosProps) {
    this.nomeDoCliente = nomeDoCliente;
    this.email = email;
    this.dataDeImportacao = dataDeImportacao;
    this.contrato = contrato;
    this.telefone = telefone;
    this.fundo = fundo;
    this.cpfCnpj = cpfCnpj;
    this.status = status;
    this.realizadoPor = realizadoPor;
  }
}
