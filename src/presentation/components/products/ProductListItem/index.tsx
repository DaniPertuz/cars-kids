import { ListItem } from '@ui-kitten/components';

import { Product } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { ProductActions } from '../ProductActions';
import { ProductDescription } from '../ProductDescription';
import { ProductTitle } from '../ProductTitle';

import { styles } from './styles';

interface Props {
  item: Product;
}

export const ProductListItem = ({ item }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <ListItem
      style={[styles.container, platinumItemBackgroundColor]}
      title={<ProductTitle item={item} />}
      description={<ProductDescription item={item} />}
      accessoryRight={<ProductActions product={item} />}
    />
  );
};
