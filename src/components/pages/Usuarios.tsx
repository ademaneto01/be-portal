import { Usuario } from "@/entities";
import styles from "@/styles/Page.module.css";
import { CreateButton, PageContentContainer } from "../shared";
import { Column, Table } from "../table";
import { useEffect, useState } from "react";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";

const columns = [
  new Column("Nome", "nome"),
  new Column("Email", "email"),
  new Column("Ações", "acoes"),
];

export default function Usuarios(): JSX.Element {
  const [data, setData] = useState([] as Usuario[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await backendApi.getUsuarios();
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
        <CreateButton text="Novo usuário" onClick={() => {}} />
        <Table<Usuario>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
        />
      </PageContentContainer>
    </div>
  );
}
