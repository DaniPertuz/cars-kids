import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { ProfileHeader, ProfileMenu, ProfileUserImage } from '../../../components/profile';
import { MainLayout } from '../../../components/ui';
import { useUserInfo } from '../../../hooks';
import { IUserRole } from '../../../../infrastructure/interfaces';

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { user } = useUserInfo();

  return (
    <MainLayout>
      {!user
        ?
        <LoadingScreen />
        :
        <Layout style={{ marginTop: user.role === IUserRole.Admin ? height * 0.03 : height * 0.08  }}>
          <ProfileUserImage height={height} />
          <ProfileHeader />
          <ProfileMenu />
        </Layout>
      }
    </MainLayout>
  );
};
