
interface EntidadesEscolaresProps {
  uid: string;
  id_ec: string;
  nome_operacional: string;
  cnpj: string;
  cep: string;
  logradouro: string;
  municipio: string;
  uf: string;
  bairro: string;
  complemento: string;
  ativo: boolean;
}

export default class EntitiesEntidadesEscolares {
  readonly uid: string;
  readonly id_ec: string;
  readonly nome_operacional: string;
  readonly cnpj: string;
  readonly cep: string;
  readonly logradouro: string;
  readonly municipio: string;
  readonly uf: string;
  readonly bairro: string;
  readonly complemento: string;
  readonly ativo: boolean;

  constructor({
    uid,
    id_ec,
    nome_operacional,
    cnpj,
    cep,
    logradouro,
    municipio,
    uf,
    bairro,
    complemento,
    ativo,
  }: EntidadesEscolaresProps) {
    this.uid = uid;
    this.id_ec = id_ec;
    this.nome_operacional = nome_operacional;
    this.cnpj = cnpj;
    this.cep = cep;
    this.logradouro = logradouro;
    this.municipio = municipio;
    this.uf = uf;
    this.bairro = bairro;
    this.complemento = complemento;
    this.ativo = ativo;
  }
 
}
