import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  bottom: number;
  total: number;
}

export const TotalVehiclesMessage = ({ bottom, total }: Props) => {
  return (
    <Layout style={{ ...styles.container, bottom: bottom + 20 }}>
      <Callout text={`${String(total)} ${total === 1 ? 'vehículo' : 'vehículos'}`} />
    </Layout>
  );
};
