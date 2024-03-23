import { Layout, Text } from '@ui-kitten/components';
import { CustomIcon } from '../../ui';
import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const LogoutComponent = () => {
  return (
    <Layout style={styles.logoutContainer}>
      <CustomIcon name='power-outline' fillColor={globalColors.primaryRed} />
      <Text category='h6' style={globalStyles.colorPrimaryRed}>Cerrar sesión</Text>
    </Layout>
  );
};
