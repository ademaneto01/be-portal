import { SituacaoDeParcelaEnum } from "@/enums";

interface ParcelaProps {
  situacao: SituacaoDeParcelaEnum;
  numero: number;
  valor: number;
  multa?: number | null;
  juros?: number | null;
  tipoDoContrato: string;
  vencimentoOriginal: Date;
  diasEmAtraso?: number | null;
  valorDesagio?: number | null;
  boletoUrl?: string | null;
}

interface ParcelaPagaProps {
  situacao: SituacaoDeParcelaEnum;
  numero: number;
  valor: number;
  tipoDoContrato: string;
  vencimentoOriginal: Date;
}

interface ParcelaEmAtrasoProps {
  situacao: SituacaoDeParcelaEnum;
  numero: number;
  valor: number;
  multa: number;
  juros: number;
  tipoDoContrato: string;
  vencimentoOriginal: Date;
  diasEmAtraso: number;
}

interface ParcelaAVencerProps {
  situacao: SituacaoDeParcelaEnum;
  numero: number;
  valor: number;
  tipoDoContrato: string;
  vencimentoOriginal: Date;
  valorDesagio: number;
  boletoUrl: string;
}

export default class Parcela {
  readonly situacao: SituacaoDeParcelaEnum;
  readonly numero: number;
  readonly valor: number;
  readonly multa: number | null;
  readonly juros: number | null;
  readonly tipoDoContrato: string;
  readonly vencimentoOriginal: Date;
  readonly diasEmAtraso: number | null;
  readonly valorDesagio: number | null;
  readonly boletoUrl: string | null;

  constructor({
    situacao,
    numero,
    valor,
    multa = null,
    juros = null,
    tipoDoContrato,
    vencimentoOriginal,
    diasEmAtraso = null,
    valorDesagio = null,
    boletoUrl = null,
  }: ParcelaProps) {
    this.situacao = situacao;
    this.numero = numero;
    this.valor = valor;
    this.multa = multa;
    this.juros = juros;
    this.tipoDoContrato = tipoDoContrato;
    this.vencimentoOriginal = vencimentoOriginal;
    this.diasEmAtraso = diasEmAtraso;
    this.valorDesagio = valorDesagio;
    this.boletoUrl = boletoUrl;
  }

  static buildPaga({
    situacao,
    numero,
    valor,
    tipoDoContrato,
    vencimentoOriginal,
  }: ParcelaPagaProps) {
    return new Parcela({
      situacao,
      numero,
      valor,
      tipoDoContrato,
      vencimentoOriginal,
    });
  }

  static buildEmAtraso({
    situacao,
    numero,
    valor,
    multa,
    juros,
    tipoDoContrato,
    vencimentoOriginal,
    diasEmAtraso,
  }: ParcelaEmAtrasoProps) {
    return new Parcela({
      situacao,
      numero,
      valor,
      multa,
      juros,
      tipoDoContrato,
      vencimentoOriginal,
      diasEmAtraso,
    });
  }

  static buildAVencer({
    situacao,
    numero,
    valor,
    tipoDoContrato,
    vencimentoOriginal,
    valorDesagio,
    boletoUrl,
  }: ParcelaAVencerProps) {
    return new Parcela({
      situacao,
      numero,
      valor,
      tipoDoContrato,
      vencimentoOriginal,
      valorDesagio,
      boletoUrl,
    });
  }
}
