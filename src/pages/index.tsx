import styles from "@/styles/Home.module.css";
import { SideNavBar, TopNavBar, pages } from "@/components";
import { PageEnum } from "@/enums";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [page, setPage] = useState(PageEnum.buscaDeContratos);
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);

  function toggleSideNavBar(): void {
    setSideNavBarHidden(!sideNavBarHidden);
  }

  function Page(): JSX.Element {
    switch (page) {
      case PageEnum.dashboard:
        return <pages.Dashboard />;
      case PageEnum.carteiras:
        return <pages.Carteiras />;
      case PageEnum.gateways:
        return <pages.Gateways />;
      case PageEnum.usuarios:
        return <pages.Usuarios />;
      case PageEnum.remessaRetorno:
        return <pages.RemessaRetorno />;
      case PageEnum.buscaDeContratos:
        return <pages.BuscaDeContratos />;
      default:
        return <></>;
    }
  }

  function expandable(style: string): string {
    return style + (sideNavBarHidden ? ` ${styles.expanded}` : "");
  }

  return (
    <main>
      <TopNavBar toggleSideNavBar={toggleSideNavBar} />
      <SideNavBar
        hidden={sideNavBarHidden}
        activePage={page}
        setPage={setPage}
      />
      <div className={expandable(styles.pageContainer)}>
        <Page />
      </div>
    </main>
  );
}
