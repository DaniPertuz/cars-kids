import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { CustomIcon } from '../';
import { IProduct, IVehicle } from '../../../../infrastructure/interfaces';
import { ProductEntryModal } from '../../products/ProductEntryModal';
import { VehicleEntryModal } from '../../vehicles/VehicleEntryModal';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
  product?: IProduct;
  vehicle?: IVehicle;
}

export const EditButton = ({ iconSize, product, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
      <Layout style={styles.container}>
        <CustomIcon name='edit-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
        {product && <ProductEntryModal product={product} visible={visible} setVisible={setVisible} />}
        {vehicle && <VehicleEntryModal vehicle={vehicle} visible={visible} setVisible={setVisible} />}
      </Layout>
    </TouchableOpacity>
  );
};
