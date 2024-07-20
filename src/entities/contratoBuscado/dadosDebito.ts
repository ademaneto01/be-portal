interface DadosDebitoProps {
  valorDoImprestimo: number;
  valorEmAtraso: number;
  valorAVencer: number;
  totalParaNegociacao: number;
  valorDaParcela: number;
  qtdParcelasVencidas: number;
  qtdParcelasAVencer: number;
  diasEmAtraso: number;
  valorJurosEMulta: number;
  valorPresenteDesagio: number;
}

export default class DadosDebito {
  readonly valorDoImprestimo: number;
  readonly valorEmAtraso: number;
  readonly valorAVencer: number;
  readonly totalParaNegociacao: number;
  readonly valorDaParcela: number;
  readonly qtdParcelasVencidas: number;
  readonly qtdParcelasAVencer: number;
  readonly diasEmAtraso: number;
  readonly valorJurosEMulta: number;
  readonly valorPresenteDesagio: number;

  constructor({
    valorDoImprestimo,
    valorEmAtraso,
    valorAVencer,
    totalParaNegociacao,
    valorDaParcela,
    qtdParcelasVencidas,
    qtdParcelasAVencer,
    diasEmAtraso,
    valorJurosEMulta,
    valorPresenteDesagio,
  }: DadosDebitoProps) {
    this.valorDoImprestimo = valorDoImprestimo;
    this.valorEmAtraso = valorEmAtraso;
    this.valorAVencer = valorAVencer;
    this.totalParaNegociacao = totalParaNegociacao;
    this.valorDaParcela = valorDaParcela;
    this.qtdParcelasVencidas = qtdParcelasVencidas;
    this.qtdParcelasAVencer = qtdParcelasAVencer;
    this.diasEmAtraso = diasEmAtraso;
    this.valorJurosEMulta = valorJurosEMulta;
    this.valorPresenteDesagio = valorPresenteDesagio;
  }
}
