import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { ProfileHeader, ProfileMenu, ProfileUserImage } from '../../../components/profile';
import { Back } from '../../../components/ui';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <Layout style={styles.container}>
      <Layout style={{ ...globalStyles.backButtonContainer, marginTop: top }}>
        <Back />
      </Layout>
      <Layout style={{ paddingTop: height * 0.08, ...globalStyles.mainLayout }}>
        <ProfileUserImage height={height} />
        <ProfileHeader />
        <ProfileMenu />
      </Layout>
    </Layout>
  );
};
