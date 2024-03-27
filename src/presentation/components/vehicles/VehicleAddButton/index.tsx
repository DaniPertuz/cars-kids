import { Layout } from '@ui-kitten/components';
import { styles } from './styles';
import { AddButton } from '../../ui';

interface Props {
  top: number;
}

export const VehicleAddButton = ({ top }: Props) => {
  return (
    <Layout style={{ marginTop: top, ...styles.container }}>
      <AddButton iconSize={50} onPress={() => { }} />
    </Layout>
  );
};
