import { Gateway, Remessa } from "@/entities";
import styles from "@/styles/Page.module.css";
import { CreateButton, PageContentContainer } from "../shared";
import { Column, Table } from "../table";
import { useEffect, useState } from "react";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";

const columns = [
  new Column("Data", "data"),
  new Column("Status", "status"),
  new Column("Qtd. boletos", "quantidadeDeBoletos"),
  new Column("Ações", "acoes"),
];

export default function RemessaRetorno(): JSX.Element {
  const [data, setData] = useState([] as Remessa[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await backendApi.getRemessas();
        setData(data);
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
      <h4>Gateways</h4>
      <PageContentContainer>
        <CreateButton text="Gerar" onClick={() => {}} />
        <Table<Remessa>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
        />
      </PageContentContainer>
    </div>
  );
}
