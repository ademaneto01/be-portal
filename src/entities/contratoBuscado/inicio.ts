import { StatusDeInteracaoDeAcordoEnum, TipoDeAcordoEnum } from "@/enums";

interface InicioProps {
  foneUsado: string;
  whatsapp: string;
  email: string;
  status: StatusDeInteracaoDeAcordoEnum;
  vencimentoParcelas: Date;
  tipoAcordo: TipoDeAcordoEnum;
  condicoesDePagamento: string;
}

export default class Inicio {
  readonly foneUsado: string;
  readonly whatsapp: string;
  readonly email: string;
  readonly status: StatusDeInteracaoDeAcordoEnum;
  readonly vencimentoParcelas: Date;
  readonly tipoAcordo: TipoDeAcordoEnum;
  readonly condicoesDePagamento: string;

  constructor({
    foneUsado,
    whatsapp,
    email,
    status,
    vencimentoParcelas,
    tipoAcordo,
    condicoesDePagamento,
  }: InicioProps) {
    this.foneUsado = foneUsado;
    this.whatsapp = whatsapp;
    this.email = email;
    this.status = status;
    this.vencimentoParcelas = vencimentoParcelas;
    this.tipoAcordo = tipoAcordo;
    this.condicoesDePagamento = condicoesDePagamento;
  }
}
