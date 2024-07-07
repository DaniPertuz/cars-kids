import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { useCustomTheme } from '../../../hooks';
import { CustomIcon, HeaderSix } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

export const LogoutComponent = () => {
  const { logout } = useAuthStore();
  const { isDarkMode, defaultBackgroundColor } = useCustomTheme();

  return (
    <TouchableOpacity activeOpacity={1.0} onPress={logout}>
      <Layout style={[styles.logoutContainer, { backgroundColor: isDarkMode ? defaultBackgroundColor : globalColors.background }]}>
        <CustomIcon name='power-outline' fillColor={globalColors.primaryRed} />
        <HeaderSix text='Cerrar sesión' textColor={globalColors.primaryRed} />
      </Layout>
    </TouchableOpacity>
  );
};
