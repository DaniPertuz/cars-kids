import { ListItem } from '@ui-kitten/components';

import { ProductActions } from '../ProductActions';
import { ProductDescription } from '../ProductDescription';
import { ProductTitle } from '../ProductTitle';
import { IProduct } from '../../../../infrastructure/interfaces';

import { styles } from './styles';
import { ProductImage } from '../ProductImage';

interface Props {
  item: IProduct;
}

export const ProductListItem = ({ item }: Props) => {
  return (
    <ListItem
      style={styles.container}
      title={<ProductTitle item={item} />}
      description={<ProductDescription item={item} />}
      accessoryLeft={<ProductImage />}
      accessoryRight={<ProductActions product={item} />}
    />
  );
};
