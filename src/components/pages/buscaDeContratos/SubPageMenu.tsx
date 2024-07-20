import styles from "@/styles/BuscaDeContratos.module.css";
import SubPageItem from "./SubPageItem";
import { HiOutlineSearch } from "react-icons/hi";
import { AiTwotoneHourglass } from "react-icons/ai";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { BuscaDeContratosSubPageEnum } from "@/enums";

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: "1.15em" } });
}

interface SubPageMenuProps {
  setSubPage: Dispatch<SetStateAction<BuscaDeContratosSubPageEnum>>;
}

export default function SubPageMenu(props: SubPageMenuProps): JSX.Element {
  const [activeSubPage, setActiveSubPage] = useState(
    BuscaDeContratosSubPageEnum.buscaDeContratos
  );

  function isActive(subPage: BuscaDeContratosSubPageEnum): boolean {
    return subPage === activeSubPage;
  }

  function activate(subPage: BuscaDeContratosSubPageEnum): void {
    props.setSubPage(subPage);
    setActiveSubPage(subPage);
  }

  return (
    <div className={styles.centerdContainer}>
      <div className={styles.subPageMenu}>
        <SubPageItem
          icon={reactIcon(HiOutlineSearch)}
          active={isActive(BuscaDeContratosSubPageEnum.buscaDeContratos)}
          onClick={() => {
            activate(BuscaDeContratosSubPageEnum.buscaDeContratos);
          }}
        >
          Busca de contratos
        </SubPageItem>
        <SubPageItem
          icon={reactIcon(AiTwotoneHourglass)}
          active={isActive(BuscaDeContratosSubPageEnum.atendimentosPendentes)}
          onClick={() => {
            activate(BuscaDeContratosSubPageEnum.atendimentosPendentes);
          }}
        >
          Atendimentos pendentes
        </SubPageItem>
        <SubPageItem
          icon={reactIcon(AiTwotoneHourglass)}
          active={isActive(BuscaDeContratosSubPageEnum.acordos)}
          onClick={() => {
            activate(BuscaDeContratosSubPageEnum.acordos);
          }}
        >
          Acordos
        </SubPageItem>
      </div>
    </div>
  );
}
