import { BuscaDeContratosSubPageEnum } from "@/enums";
import pageStyle from "@/styles/Page.module.css";
import { useState } from "react";
import SubPageMenu from "./SubPageMenu";
import {
  AcordosSubPage,
  AtendimentosSubPage,
  ContratosSubPage,
} from "./subPages";

export default function BuscaDeContratos() {
  const [subPage, setSubPage] = useState(
    BuscaDeContratosSubPageEnum.buscaDeContratos
  );

  function SubPage(): JSX.Element {
    switch (subPage) {
      case BuscaDeContratosSubPageEnum.buscaDeContratos:
        return <ContratosSubPage />;
      case BuscaDeContratosSubPageEnum.atendimentosPendentes:
        return <AtendimentosSubPage />;
      case BuscaDeContratosSubPageEnum.acordos:
        return <AcordosSubPage />;
      default:
        return <></>;
    }
  }

  return (
    <div className={pageStyle.pageContainer}>
      <h4>Busca de contratos</h4>
      <SubPageMenu setSubPage={setSubPage} />
      <SubPage />
    </div>
  );
}
