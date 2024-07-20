import styles from "@/styles/BuscaDeContratos.module.css";
import backendApi from "@/backendApi";
import { PageContentContainer } from "@/components/shared";
import { ContratoBuscado } from "@/entities";
import { useState } from "react";
import PainelDeContrato from "./PainelDeContrato";
import SearchBox from "./SearchBox";

export default function ContratosSubPage(): JSX.Element {
  const [contratos, setContratos] = useState([] as ContratoBuscado[]);

  return (
    <div className={styles.contratosSubPage}>
      <SearchBox setContratos={setContratos} />
      <PageContentContainer>
        {contratos.map((contrato) => (
          <PainelDeContrato
            key={contrato.dadosBasicos.contrato}
            contrato={contrato}
          />
        ))}
      </PageContentContainer>
    </div>
  );
}
