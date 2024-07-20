import Image from "next/image";
import styles from "@/styles/TopNavBar.module.css";
import { TfiMenu } from "react-icons/tfi";
import { HiChevronDown } from "react-icons/hi";

interface TopNavBarProps {
  toggleSideNavBar: VoidFunction;
}

export default function TopNavBar(props: TopNavBarProps) {
  return (
    <div className={styles.topNavBar}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/salt-logo.png"
          alt="Salt"
          width={25}
          height={25}
        />
        <Image
          className={styles.logo}
          src="/salt-name.png"
          alt="Salt Systems"
          width={100}
          height={25}
        />
      </div>

      <a href="#" onClick={props.toggleSideNavBar}>
        <TfiMenu size="1.1em" />
      </a>

      <div className={styles.spacer} />

      <a href="#" className={styles.user}>
        Chico - Saltsystems
        <HiChevronDown />
      </a>
    </div>
  );
}
