import { useEffect, useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { addProduct, updateProduct } from '../../../../actions/products';
import { DefaultInput, NumericInput } from '../../forms';
import { Headline, PrimaryButton } from '../../ui';
import { IProduct, IStatus } from '../../../../infrastructure/interfaces';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  product?: IProduct;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const ProductEntryModal = ({ product, visible, setVisible }: Props) => {
  const init: IProduct = {
    _id: '',
    name: '',
    cost: 0,
    price: 0,
    status: IStatus.Active,
  };
  const [loading, setLoading] = useState(false);
  const [productState, setProductState] = useState<IProduct>({
    _id: product?._id || '',
    name: product?.name || '',
    cost: product?.cost || 0,
    price: product?.price || 0,
    status: product?.status || IStatus.Active
  });

  const handleFieldChange = (fieldName: keyof IProduct, value: string | number) => {
    setProductState(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const onSubmit = async () => {
    setLoading(true);

    const resp = product ? await updateProduct(product.name, productState) : await addProduct(productState);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const actionText = product ? 'actualizado' : 'registrado';
    const successMessage = `Producto ${actionText} exitosamente`;

    setLoading(false);
    Snackbar.show({ text: successMessage, duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setProductState(product ? productState : init);
  };

  useEffect(() => {
    if (!product && !visible) {
      setProductState({ ...productState, name: '' });
    }
  }, [product, visible]);

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card>
        <Layout style={styles.container}>
          <Headline text={`${product ? 'Actualizar' : 'Nuevo'} producto`} textColor={globalStyles.colorOnyx} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre'} value={productState.name} onChangeText={(name) => handleFieldChange('name', name)} />
          <NumericInput placeholder='Costo' value={productState.cost} onChangeText={(cost) => handleFieldChange('cost', cost)} />
          <NumericInput placeholder='Precio de venta' value={productState.price} onChangeText={(price) => handleFieldChange('price', price)} />
          <PrimaryButton disabled={loading} text={product ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
