import DadosBasicos from "./dadosBasicos";
import DadosDebito from "./dadosDebito";
import Inicio from "./inicio";
import Parcela from "./parcela";

export interface Parcelas {
  pagas: Parcela[];
  emAtraso: Parcela[];
  aVencer: Parcela[];
  todas: Parcela[];
}

interface ContratoBuscadoProps {
  dadosBasicos: DadosBasicos;
  inicio: Inicio;
  dadosDebito: DadosDebito;
  parcelas: Parcelas;
}

export default class ContratoBuscado {
  readonly dadosBasicos: DadosBasicos;
  readonly inicio: Inicio;
  readonly dadosDebito: DadosDebito;
  readonly parcelas: Parcelas;

  constructor({
    dadosBasicos,
    inicio,
    dadosDebito,
    parcelas,
  }: ContratoBuscadoProps) {
    this.dadosBasicos = dadosBasicos;
    this.inicio = inicio;
    this.dadosDebito = dadosDebito;
    this.parcelas = parcelas;
  }
}
