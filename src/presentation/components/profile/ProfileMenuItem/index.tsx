import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { CustomIcon, HeaderSix } from '../../ui';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconName: string;
  label: string;
  onPress: () => void;
}

export const ProfileMenuItem = ({ iconName, label, onPress }: Props) => {
  const { isDarkMode, defaultBackgroundColorShadow } = useCustomTheme();
  return (
    <TouchableOpacity style={styles.justifyCenter} activeOpacity={1} onPress={onPress}>
      <Layout style={[styles.menuItem, { backgroundColor: isDarkMode ? defaultBackgroundColorShadow : globalColors.greyLight }]}>
        <CustomIcon name={iconName} />
        <HeaderSix text={label} />
      </Layout>
    </TouchableOpacity>
  );
};
