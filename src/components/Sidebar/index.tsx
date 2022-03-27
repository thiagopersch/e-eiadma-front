import { memo, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import { ADMINISTRADOR } from 'configs/sidebar.routes';

import * as S from './styles';

const Sidebar = () => {
  const { pathname } = useRouter();

  const { data: session } = useSession();
  const routes = useMemo(() => {
    if (session?.ACCESSLEVELS?.CODE === 'ADMINISTRADOR') return ADMINISTRADOR;

    return [];
  }, [session]);

  return (
    <S.Wrapper>
      <Link href="/" passHref>
        <S.Logo>
          <Image src="/img/logo.png" width={150} height={60} quality={80} />
        </S.Logo>
      </Link>
      <S.Menu>
        <S.MenuItem active={pathname === '/'}>
          <Link href="/">
            <a>Início</a>
          </Link>
        </S.MenuItem>
        {routes.map(({ name, path }) => (
          <S.MenuItem key={`${name}-${path}`} active={path === pathname}>
            <Link href={path}>
              <a>{name}</a>
            </Link>
          </S.MenuItem>
        ))}
      </S.Menu>
    </S.Wrapper>
  );
};

export default memo(Sidebar);
