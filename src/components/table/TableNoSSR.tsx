import dynamic from "next/dynamic";
import { TableProps } from "./Table";

// NoSSR == No Server Side Rrendering
// Used for avoid errors when creating mock data
// May be removed for increased performance if
// Valid data don't throws hydration error
// Then just export Table directly

const TableNoServerSideRendering = dynamic(() => import("./Table"), {
  ssr: false,
});

export default function Table<T>(props: TableProps<T>) {
  return (
    <TableNoServerSideRendering data={props.data} columns={props.columns} />
  );
}
