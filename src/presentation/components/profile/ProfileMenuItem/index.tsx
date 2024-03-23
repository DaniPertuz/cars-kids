import { Layout, Text } from '@ui-kitten/components';
import { CustomIcon } from '../../ui';
import { styles } from './styles';

interface Props {
  iconName: string;
  label: string;
}

export const ProfileMenuItem = ({ iconName, label }: Props) => {
  return (
    <Layout style={styles.menuItem}>
      <Layout style={styles.menuItemLabel}>
        <CustomIcon name={iconName} />
        <Text category='h6'>{label}</Text>
      </Layout>
      <CustomIcon name='arrow-circle-right-outline' />
    </Layout>
  );
};
