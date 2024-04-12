import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { Product } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  item: Product;
}

export const ProductTitle = ({ item }: Props) => {
  return (
    <Layout style={globalStyles.platinumBackground}>
      <Callout text={item.name} />
    </Layout>
  );
};
