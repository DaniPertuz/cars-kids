import { TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { CustomIcon } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const LogoutComponent = () => {
  const { logout } = useAuthStore();

  return (
    <TouchableOpacity activeOpacity={1.0} onPress={logout}>
      <Layout style={styles.logoutContainer}>
        <CustomIcon name='power-outline' fillColor={globalColors.primaryRed} />
        <Text category='h6' style={globalStyles.colorPrimaryRed}>Cerrar sesión</Text>
      </Layout>
    </TouchableOpacity>
  );
};
