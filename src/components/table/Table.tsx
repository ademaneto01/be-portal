import styles from "@/styles/Table.module.css";
import { useMemo } from "react";
import ErrorComponent from "../ErrorComponent";
import { Loader } from "../shared";
import Column from "./Column";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  error?: boolean;
  loaded?: boolean;
}
export type { TableProps };

let id = 0;
function getKey(prefix: string): string {
  id++;
  return prefix + id;
}

export default function Table<T>(props: TableProps<T>): JSX.Element {
  const loaded = "loaded" in props ? props.loaded : true;
  const error = "error" in props ? props.error : false;

  const headers = useMemo(
    () => props.columns.map((column) => column.header),
    [props.columns]
  );
  const accessors = useMemo(
    () => props.columns.map((column) => column.accessor),
    [props.columns]
  );
  if (loaded) {
    if (!error) {
      return (
        <div className={styles.table}>
          <table>
            <TableHeaders headers={headers} />
            <tbody>
              {props.data.map((item) => {
                const key = getKey("row-");
                return (
                  <TableRow<T>
                    key={key}
                    id={id}
                    item={item}
                    accessors={accessors}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <ErrorComponent />;
    }
  } else {
    return <Loader />;
  }
}
