import { PageEnum } from '@/enums';
import React from 'react';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { RiComputerFill, RiComputerLine } from 'react-icons/ri';
import SideNavBarButton from './SideNavBarButton';
import { BackendApiGet } from '@/backendApi';
import { ErrorComponent } from '@/errors';
import handleApiErrors from '@/utils/HandleApiErrors';

function reactIcon(icon: IconType, color?: string): JSX.Element {
  return icon({ style: { fontSize: '1.3em', color: color } });
}

interface SideNavBarProps {
  hidden: boolean;
  setPage: Dispatch<SetStateAction<PageEnum>>;
  activePage: PageEnum;
}

export default function SideNavBar(props: SideNavBarProps) {
  const [perfil, setPerfil] = useState('');
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const uid = localStorage.getItem('uid');
    const backendApi = new BackendApiGet(`${token}`);
    const fetchUserData = async () => {
      try {
        const user = await backendApi.localizarUsuario(uid);

        if (user && user.length > 0) {
          setPerfil(user[0].perfil || '');
        }
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
      }
    };

    fetchUserData();
  }, []);

  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.hidden}` : '');
  }

  function isActive(page: PageEnum): boolean {
    return page === props.activePage;
  }

  return (
    <div className={hidable(styles.navBar)}>
      <div className={styles.buttonsContainer}>
        <SideNavBarButton
          text="Painel de Acompanhamento"
          onClick={() => {
            props.setPage(PageEnum.digitalResources);
          }}
          icon={
            isActive(PageEnum.digitalResources)
              ? reactIcon(RiComputerFill)
              : reactIcon(RiComputerLine)
          }
          buttonHidden={props.hidden && perfil === 'Escola'}
          active={isActive(PageEnum.digitalResources)}
          hidden={perfil === 'Escola' ? true : false}
        />
      </div>
      {error && <ErrorComponent message={msgError} />}
    </div>
  );
}
