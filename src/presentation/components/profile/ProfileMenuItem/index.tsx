import { TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { CustomIcon } from '../../ui';
import { styles } from './styles';

interface Props {
  iconName: string;
  label: string;
  onPress: () => void;
}

export const ProfileMenuItem = ({ iconName, label, onPress }: Props) => {
  return (
    <Layout style={styles.menuItem}>
      <Layout style={styles.menuItemLabel}>
        <CustomIcon name={iconName} />
        <Text category='h6'>{label}</Text>
      </Layout>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <CustomIcon name='arrow-circle-right-outline' />
      </TouchableOpacity>
    </Layout>
  );
};
