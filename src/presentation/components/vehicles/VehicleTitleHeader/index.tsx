import { Layout } from '@ui-kitten/components';
import { HeaderSix } from '../../ui';
import { styles } from './styles';

export const VehicleTitleHeader = () => {
  return (
    <Layout style={styles.titleContainer}>
      <HeaderSix text='Vehículos' />
    </Layout>
  );
};
