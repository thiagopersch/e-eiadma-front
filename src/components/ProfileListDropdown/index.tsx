import { useState, useMemo } from 'react';
import { signIn, useSession } from 'next-auth/client';

import { useListUserProfiles } from 'requests/queries/user-profile';

import * as S from './styles';

const ProfileListDropdown = () => {
  const [open, setOpen] = useState(false);

  const [session] = useSession();
  const { data: userProfiles } = useListUserProfiles(session, {
    GUSERS_ID: session?.ID
  });

  const selectedProfile = useMemo(() => {
    const selected = userProfiles?.find(
      (profile) => profile.ID === session?.PROFILE_ID
    );
    return selected;
  }, [userProfiles, session]);

  const profilesWithoutSelected = useMemo(() => {
    if (!session?.profileId) return [];

    return userProfiles?.filter((profile) => profile.ID !== session.PROFILE_ID);
  }, [userProfiles, session]);

  const toggleDropdown = () => {
    setOpen((current) => !current);
  };

  const handleClickItem = async (profileId: string) => {
    await signIn('refresh', {
      profileId,
      token: session?.jwt,
      redirect: false
    });

    setOpen(false);
  };

  return (
    <S.Wrapper>
      <S.Container isOpen={open}>
        <S.Title onClick={toggleDropdown}>
          {selectedProfile?.NAME} <S.ArrowIcon isOpen={open} />
        </S.Title>
        <S.Content isOpen={open}>
          <ul>
            {profilesWithoutSelected?.map(({ ID, NAME }) => (
              <S.ListItem key={ID} onClick={() => handleClickItem(ID)}>
                {NAME}
              </S.ListItem>
            ))}
          </ul>
        </S.Content>
      </S.Container>
      <S.Overlay isOpen={open} onClick={() => setOpen(false)} />
    </S.Wrapper>
  );
};

export default ProfileListDropdown;
