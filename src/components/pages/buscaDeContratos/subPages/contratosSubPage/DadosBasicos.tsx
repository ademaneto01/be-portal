import styles from "@/styles/BuscaDeContratos.module.css";
import { ContratoBuscado } from "@/entities";
import { PropsWithChildren } from "react";
import { formatDate } from "@/format";

interface DadosBasicosProps {
  contrato: ContratoBuscado;
}

interface ItemProps extends PropsWithChildren {
  label: string;
}

function Item(props: ItemProps): JSX.Element {
  return (
    <div className={styles.dadoBasico}>
      <label>{props.label}:</label>
      <p>{props.children}</p>
    </div>
  );
}

export default function DadosBasicos(props: DadosBasicosProps): JSX.Element {
  return (
    <div className={styles.dadosBasicosContainer}>
      <h4>Dados básicos</h4>
      <div className={styles.dadosBasicos}>
        <div className={styles.colunaDadosBasicos}>
          <Item label="Nome">{props.contrato.dadosBasicos.nomeDoCliente}</Item>
          <Item label="E-mail">{props.contrato.dadosBasicos.email}</Item>
          <Item label="Data de importação">
            {formatDate.toString(props.contrato.dadosBasicos.dataDeImportacao)}
          </Item>
        </div>

        <div className={styles.colunaDadosBasicos}>
          <Item label="Contrato">{props.contrato.dadosBasicos.contrato}</Item>
          <Item label="Telefone">{props.contrato.dadosBasicos.telefone}</Item>
          <Item label="Fundo">{props.contrato.dadosBasicos.fundo}</Item>
        </div>

        <div className={styles.colunaDadosBasicos}>
          <Item label="CPF/CNPJ">{props.contrato.dadosBasicos.cpfCnpj}</Item>
          <Item label="Status do contrato">
            {props.contrato.dadosBasicos.status}
          </Item>
          <Item label="Realizado por">
            {props.contrato.dadosBasicos.realizadoPor}
          </Item>
        </div>
      </div>
    </div>
  );
}
