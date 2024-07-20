import styles from "@/styles/SideNavBar.module.css";

interface SideNavBarButtonProps {
  text: string;
  icon: JSX.Element;
  onClick: VoidFunction;
  active: boolean;
}

export default function SideNavBarButton(props: SideNavBarButtonProps) {
  function activable(style: string): string {
    return style + (props.active ? ` ${styles.activeNavBarButton}` : "");
  }

  return (
    <a className={activable(styles.navBarButton)} onClick={props.onClick}>
      {props.icon}
      <span className={styles.text}>{props.text}</span>
    </a>
  );
}
