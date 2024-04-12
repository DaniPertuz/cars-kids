import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { Vehicle } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  item: Vehicle;
}

export const VehicleTitle = ({ item }: Props) => {
  return (
    <Layout style={globalStyles.platinumBackground}>
      <Callout text={item.nickname} />
    </Layout>
  );
};
