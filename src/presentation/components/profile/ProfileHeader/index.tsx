import { Layout } from '@ui-kitten/components';
import { Footnote, Title } from '../../ui';
import { useCustomTheme, useUserInfo } from '../../../hooks';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

export const ProfileHeader = () => {
  const { user } = useUserInfo();
  const { isDarkMode, defaultBackgroundColor } = useCustomTheme();

  return (
    <Layout style={[styles.titleContainer, { backgroundColor: isDarkMode ? defaultBackgroundColor : globalColors.background }]}>
      <Title text={user?.name!} />
      <Footnote text={user?.email!} />
    </Layout>
  );
};
