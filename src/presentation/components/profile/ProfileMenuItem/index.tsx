import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon, HeaderSix } from '../../ui';
import { styles } from './styles';

interface Props {
  iconName: string;
  label: string;
  onPress: () => void;
}

export const ProfileMenuItem = ({ iconName, label, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.justifyCenter} activeOpacity={1} onPress={onPress}>
      <Layout style={styles.menuItem}>
        <Layout style={styles.menuItemLabel}>
          <CustomIcon name={iconName} />
          <HeaderSix text={label} />
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};
