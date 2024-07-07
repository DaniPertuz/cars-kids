import { Layout } from '@ui-kitten/components';
import { Product } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { Callout } from '../../ui';

interface Props {
  item: Product;
}

export const ProductTitle = ({ item }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={platinumItemBackgroundColor}>
      <Callout text={item.name} />
    </Layout>
  );
};
