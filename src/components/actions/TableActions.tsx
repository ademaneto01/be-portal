import styles from "@/styles/Action.module.css";
import Action from "./Action";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { IconBaseProps, IconType } from "react-icons";

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = "1.3em";
  options.color = color;

  return icon(options);
}

export default function TableActions(): JSX.Element {
  return (
    <div className={styles.container}>
      <Action icon={reactIcon(FiEdit)} onClick={() => {}} />
      <Action icon={reactIcon(FaTrashAlt, "#f1646c")} onClick={() => {}} />
    </div>
  );
}
