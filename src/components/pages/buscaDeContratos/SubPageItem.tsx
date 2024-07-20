import styles from "@/styles/BuscaDeContratos.module.css";
import { PropsWithChildren } from "react";

interface SubPageItemProps extends PropsWithChildren {
  onClick: VoidFunction;
  icon: JSX.Element;
  active: boolean;
}

export default function SubPageItem(props: SubPageItemProps): JSX.Element {
  function getClassName(): string {
    const className = [styles.subPageItem];
    if (props.active) {
      className.push(styles.active);
    }
    return className.join(" ");
  }

  return (
    <div className={getClassName()} onClick={props.onClick}>
      <div className={styles.iconContainer}>{props.icon}</div>
      {props.children}
    </div>
  );
}
