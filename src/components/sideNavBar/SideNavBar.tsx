import { PageEnum } from "@/enums";
import styles from "@/styles/SideNavBar.module.css";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import { HiOutlineSearch } from "react-icons/hi";
import {
  TfiBarChart,
  TfiBriefcase,
  TfiLock,
  TfiSettings,
  TfiUser,
} from "react-icons/tfi";
import { FaBarcode } from "react-icons/fa";
import SideNavBarButton from "./SideNavBarButton";

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: "1.15em" } });
}

interface SideNavBarProps {
  hidden: boolean;
  setPage: Dispatch<SetStateAction<PageEnum>>;
  activePage: PageEnum;
}

export default function SideNavBar(props: SideNavBarProps) {
  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.hidden}` : "");
  }

  function isActive(page: PageEnum): boolean {
    return page === props.activePage;
  }

  return (
    <div className={hidable(styles.navBar)}>
      <div className={styles.buttonsContainer}>
        <SideNavBarButton
          text="Dashboard"
          onClick={() => props.setPage(PageEnum.dashboard)}
          icon={reactIcon(TfiBarChart)}
          active={isActive(PageEnum.dashboard)}
        />
        <SideNavBarButton
          text="Carteiras"
          onClick={() => {
            props.setPage(PageEnum.carteiras);
          }}
          icon={reactIcon(TfiBriefcase)}
          active={isActive(PageEnum.carteiras)}
        />
        <SideNavBarButton
          text="Gateways"
          onClick={() => {
            props.setPage(PageEnum.gateways);
          }}
          icon={reactIcon(TfiSettings)}
          active={isActive(PageEnum.gateways)}
        />
        <SideNavBarButton
          text="Usuários"
          onClick={() => {
            props.setPage(PageEnum.usuarios);
          }}
          icon={reactIcon(TfiUser)}
          active={isActive(PageEnum.usuarios)}
        />
        <SideNavBarButton
          text="Remessa/Retorno"
          onClick={() => {
            props.setPage(PageEnum.remessaRetorno);
          }}
          icon={reactIcon(FaBarcode)}
          active={isActive(PageEnum.remessaRetorno)}
        />
        <SideNavBarButton
          text="Busca de contratos"
          onClick={() => {
            props.setPage(PageEnum.buscaDeContratos);
          }}
          icon={reactIcon(HiOutlineSearch)}
          active={isActive(PageEnum.buscaDeContratos)}
        />
        <SideNavBarButton
          text="Logout"
          onClick={() => {}}
          icon={reactIcon(TfiLock)}
          active={false}
        />
      </div>
    </div>
  );
}
