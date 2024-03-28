import { Layout } from '@ui-kitten/components';
import { DeleteButton, EditButton } from '../../ui';
import { styles } from './styles';

export const VehicleActions = () => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} />
      <DeleteButton iconSize={25} />
    </Layout>
  );
};
