import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { ProfileHeader, ProfileMenu, ProfileUserImage } from '../../../components/profile';
import { MainLayout } from '../../../components/ui';
import { useCustomTheme, useUserInfo } from '../../../hooks';

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { background } = useCustomTheme();
  const { user } = useUserInfo();

  const styles = {
    container: {
      flex: 1,
      paddingTop: top
    },
    section: {
      ...background,
      flex: 1
    },
    userImageSection: {
      ...background,
      flex: 3
    },
    headerSection: {
      ...background,
      flex: 2
    },
    menuSection: {
      ...background,
      flex: 9
    },
  };

  return (
    <MainLayout>
      {!user
        ?
        <LoadingScreen />
        :
        <Layout style={styles.container}>
          <Layout style={styles.userImageSection}>
            <ProfileUserImage />
          </Layout>
          <Layout style={styles.headerSection}>
            <ProfileHeader />
          </Layout>
          <Layout style={styles.menuSection}>
            <ProfileMenu />
          </Layout>
        </Layout>
      }
    </MainLayout>
  );
};
