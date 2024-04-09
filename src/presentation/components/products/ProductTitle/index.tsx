import { Layout } from '@ui-kitten/components';
import { IProduct, IVehicle } from '../../../../infrastructure/interfaces';
import { Callout } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  item: IProduct;
}

export const ProductTitle = ({ item }: Props) => {
  return (
    <Layout style={globalStyles.platinumBackground}>
      <Callout text={item.name} />
    </Layout>
  );
};
