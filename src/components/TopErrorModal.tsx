import { ModalErrorMessage } from "@/entities";
import styles from "@/styles/TopErrorModal.module.css";
import { useEffect, useState } from "react";

const showTime = 2000;

interface TopErrorModalProps {
  error: ModalErrorMessage;
}

export default function TopErrorModal(props: TopErrorModalProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [timeStamp, setTimestamp] = useState(props.error.timeStamp);

  useEffect(() => {
    if (props.error.message && props.error.timeStamp !== timeStamp) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false), setTimestamp(props.error.timeStamp);
      }, showTime);
      return () => clearTimeout(timeout);
    }
  }, [props, timeStamp]);

  function getClassName(): string {
    let style = styles.container;
    if (visible) {
      style += ` ${styles.visible}`;
    }
    return style;
  }

  return <div className={getClassName()}>{props.error.message}</div>;
}
