import styles from "@/styles/BuscaDeContratos.module.css";

interface RadioProps {
  text: string;
  active: boolean;
  onClick: VoidFunction;
}

export default function Radio(props: RadioProps): JSX.Element {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        checked={props.active}
        onClick={props.onClick}
        onChange={() => {}}
      />
      {props.text}
    </div>
  );
}
