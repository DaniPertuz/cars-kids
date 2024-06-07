import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { ProfileHeader, ProfileMenu, ProfileUserImage } from '../../../components/profile';
import { MainLayout, TopNavigation } from '../../../components/ui';
import { useUserInfo } from '../../../hooks';
import { IUserRole } from '../../../../infrastructure/interfaces';

import { globalStyles } from '../../../styles/global.styles';

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { user } = useUserInfo();

  return (
    <MainLayout>
      <TopNavigation top={top} />
      {!user
        ?
        <LoadingScreen />
        :
        <Layout style={{ paddingTop: user.role === IUserRole.Admin ? height * 0.02 : height * 0.08, ...globalStyles.mainLayout }}>
          <ProfileUserImage height={height} />
          <ProfileHeader />
          <ProfileMenu />
        </Layout>
      }
    </MainLayout>
  );
};
