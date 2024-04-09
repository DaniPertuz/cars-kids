import { Layout } from '@ui-kitten/components';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { Callout } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  item: IVehicle;
}

export const VehicleTitle = ({ item }: Props) => {
  return (
    <Layout style={globalStyles.platinumBackground}>
      <Callout text={item.nickname} />
    </Layout>
  );
};
