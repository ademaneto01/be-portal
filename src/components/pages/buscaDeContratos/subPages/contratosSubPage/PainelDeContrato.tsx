import { ContratoBuscado } from "@/entities";
import DadosBasicos from "./DadosBasicos";

interface PainelDeContratoProps {
  contrato: ContratoBuscado;
}

export default function PainelDeContrato(
  props: PainelDeContratoProps
): JSX.Element {
  return (
    <>
      <DadosBasicos contrato={props.contrato} />
    </>
  );
}
