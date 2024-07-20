import { ContratoBuscado } from "@/entities";
import {
  DadosBasicos,
  DadosDebito,
  Inicio,
  Parcela,
} from "@/entities/contratoBuscado";
import { Parcelas } from "@/entities/contratoBuscado/contratoBuscado";
import {
  beesEnum,
  SituacaoDeParcelaEnum,
  StatusDeContratoEnum,
  StatusDeInteracaoDeAcordoEnum,
  TipoDeAcordoEnum,
} from "@/enums";
import { contratoBeesInterface, SerializerInterface } from "@/interfaces";

export default class BeesContratoSerializer implements SerializerInterface {
  statusDeContratoMap: Map<beesEnum.StatusDeContrato, StatusDeContratoEnum>;

  constructor() {
    this.statusDeContratoMap = new Map();
    this.statusDeContratoMap.set(
      beesEnum.StatusDeContrato.PENDING,
      StatusDeContratoEnum.emAberto
    );
    this.statusDeContratoMap.set(
      beesEnum.StatusDeContrato.PAID,
      StatusDeContratoEnum.emDia
    );
    this.statusDeContratoMap.set(
      beesEnum.StatusDeContrato.OVERDUE,
      StatusDeContratoEnum.inadimplente
    );
  }

  public toEntity(otd: contratoBeesInterface.Contrato): ContratoBuscado {
    const parcelas = this.buidParcelas(otd);
    return new ContratoBuscado({
      dadosBasicos: this.buidDadosBasicos(otd),
      inicio: this.buildInicio(otd),
      dadosDebito: this.buildDadosDebito(otd, parcelas),
      parcelas,
    });
  }

  private buidParcelas(otd: contratoBeesInterface.Contrato): Parcelas {
    const parcelas: Parcelas = {
      pagas: [],
      emAtraso: [],
      aVencer: [],
      todas: [],
    };
    for (let installment of otd.installments) {
      let parcela;
      const numero = installment.number;
      const valor = installment.value;
      const tipoDoContrato = "TBD";
      const vencimentoOriginal = new Date(installment.due_date);
      switch (installment.status) {
        case beesEnum.StatusDeParcela.PAID:
          parcela = Parcela.buildPaga({
            situacao: SituacaoDeParcelaEnum.pago,
            numero,
            valor,
            tipoDoContrato,
            vencimentoOriginal,
          });
          parcelas.pagas.push(parcela);
          break;

        case beesEnum.StatusDeParcela.PENDING:
          parcela = Parcela.buildAVencer({
            situacao: SituacaoDeParcelaEnum.aVencer,
            numero,
            valor,
            tipoDoContrato,
            vencimentoOriginal,
            valorDesagio: 0,
            boletoUrl: "TBD",
          });
          parcelas.aVencer.push(parcela);
          break;

        case beesEnum.StatusDeParcela.OVERDUE:
          parcela = Parcela.buildEmAtraso({
            situacao: SituacaoDeParcelaEnum.inadimplente,
            numero,
            valor,
            multa: 0, //TBD
            juros: installment.interest_value,
            tipoDoContrato,
            vencimentoOriginal,
            diasEmAtraso: this.diasEmAtraso(new Date(installment.due_date)),
          });
          parcelas.emAtraso.push(parcela);
          break;

        default:
          parcela = new Parcela({
            situacao: SituacaoDeParcelaEnum.desconhecido,
            numero,
            valor,
            multa: 0,
            juros: installment.interest_value,
            tipoDoContrato,
            vencimentoOriginal,
            diasEmAtraso: this.diasEmAtraso(new Date(installment.due_date)),
            valorDesagio: 0,
            boletoUrl: "TBD",
          });
          break;
      }
      parcelas.todas.push(parcela);
    }
    return parcelas;
  }

  private diasEmAtraso(date: Date): number {
    const timeDiff = new Date().getTime() - date.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  private buidDadosBasicos(otd: contratoBeesInterface.Contrato): DadosBasicos {
    const contact = otd.contacts[0];
    return new DadosBasicos({
      nomeDoCliente: contact.name,
      email: contact.emails[0].email,
      dataDeImportacao: new Date(otd.issue_date),
      contrato: otd.external_id,
      telefone: this.parsePhone(contact.phones[0]),
      fundo: otd.partner,
      cpfCnpj: otd.document,
      status: this.parseStatusDeContrato(otd.status),
      realizadoPor: "TBD",
    });
  }

  private buildInicio(otd: contratoBeesInterface.Contrato): Inicio {
    // TBD: Make db with custom data that enriches bees payload
    const contact = otd.contacts[0];
    return new Inicio({
      foneUsado: this.parsePhone(contact.phones[0]),
      whatsapp: this.parsePhone(contact.phones[0]),
      email: contact.emails[0].email,
      status: StatusDeInteracaoDeAcordoEnum.semInteracao,
      vencimentoParcelas: new Date(otd.financial_information.first_amount_date),
      tipoAcordo: TipoDeAcordoEnum.nenhum,
      condicoesDePagamento: "TBD",
    });
  }

  private buildDadosDebito(
    otd: contratoBeesInterface.Contrato,
    parcelas: Parcelas
  ): DadosDebito {
    //TBD
    return new DadosDebito({
      valorDoImprestimo: otd.principal_value,
      valorEmAtraso: parcelas.emAtraso.reduce(
        (valor, parcela) => valor + parcela.valor,
        0
      ),
      valorAVencer: parcelas.aVencer.reduce(
        (valor, parcela) => valor + parcela.valor,
        0
      ),
      totalParaNegociacao: 1,
      valorDaParcela: parcelas.todas[0].valor,
      qtdParcelasVencidas: parcelas.emAtraso.length,
      qtdParcelasAVencer: parcelas.aVencer.length,
      diasEmAtraso:
        parcelas.emAtraso.length > 0
          ? parcelas.emAtraso[0].diasEmAtraso || 0
          : 0,
      valorJurosEMulta: otd.financial_information.gross_costs_total_value,
      valorPresenteDesagio: 0,
    });
  }

  private parsePhone(phone: contratoBeesInterface.Phone): string {
    const number = phone.number.toString();
    const dashIndex = number.length - 4;
    return `+${phone.ddi}(${phone.ddd})${number.substring(
      0,
      dashIndex
    )}-${number.substring(dashIndex)}`;
  }

  private parseStatusDeContrato(status: string): StatusDeContratoEnum {
    return (
      this.statusDeContratoMap.get(status as beesEnum.StatusDeContrato) ||
      StatusDeContratoEnum.desconhecido
    );
  }
}
