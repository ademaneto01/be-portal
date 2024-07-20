'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from '@/styles/Home.module.css';
import { PageEnum } from '@/enums';
import SideNavBar from '@/components/sideNavBar';
import TopNavBar from '@/components/topNavBaR';
import { BackendApiGet } from '@/backendApi';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/shared';
import * as pages from '@/components/pages';

interface User {
  nome: string;
  escola: string;
  perfil?: string;
}

export default function Home(): JSX.Element {
  const router = useRouter();
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);
  const [page, setPage] = useState(PageEnum.loaderPage);
  const [perfil, setPerfil] = useState('');
  const [user, setUser] = useState<User>({ nome: '', escola: '' });
  const fetchUserDataCalled = useRef(false); // Add a ref to track if the function was called

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const uid = localStorage.getItem('uid');

    if (!token || !uid) {
      router.push('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const backendApi = new BackendApiGet(token);
        const user = await backendApi.localizarUsuario(uid);

        if (user && user.length > 0) {
          const userData = user[0] as User;
          setUser(userData);
          setPerfil(user[0].perfil || '');
          switch (user[0].perfil) {
            case 'Escola':
              setPage(PageEnum.digitalResources);
              break;
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/');
      }
    };

    if (!fetchUserDataCalled.current) {
      fetchUserDataCalled.current = true;
      fetchUserData();
    }
  }, [router]);

  const toggleSideNavBar = useCallback(() => {
    setSideNavBarHidden(prevState => !prevState);
  }, []);

  function renderPage(): JSX.Element {
        switch (page) {
          case PageEnum.digitalResources:
            return <pages.DigitalResources />;
          default:
            return <></>;
        }
    }
    
  const expandable = (style: string): string => `${style}${sideNavBarHidden ? ` ${styles.expanded}` : ''}`;

  if (page === PageEnum.loaderPage) {
    return (
      <div className={styles.containerFundo}>
        <div className={styles.boxLoaderLogin}>
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <main className={styles.main}>
        <TopNavBar toggleSideNavBar={toggleSideNavBar} user={user} hidden={sideNavBarHidden} />
        <SideNavBar hidden={sideNavBarHidden} activePage={page} setPage={setPage} /> 
        <div className={expandable(styles.pageContainer)}>{renderPage()}</div>
      </main>
    );
  }
}
