import { Carteira } from "@/entities";
import styles from "@/styles/Page.module.css";
import { CreateButton, PageContentContainer } from "../shared";
import { Column, Table } from "../table";
import { useEffect, useState } from "react";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";

const columns = [
  new Column("Ativo", "ativo"),
  new Column("Nome geral", "nomeGeral"),
  new Column("Nome específico", "nomeEspecifico"),
  new Column("URL", "url"),
  new Column("Data de criação", "dataDeCriacao"),
  new Column("Ações", "acoes"),
];

export default function Carteiras(): JSX.Element {
  const [data, setData] = useState([] as Carteira[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const carteiras = await backendApi.getCarteiras();
        setData(carteiras);
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);

  return (
    <div className={styles.pageContainer}>
      <h4>Carteiras</h4>
      <PageContentContainer>
        <CreateButton text="Nova carteira" onClick={() => {}} />
        <Table<Carteira>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
        />
      </PageContentContainer>
    </div>
  );
}
