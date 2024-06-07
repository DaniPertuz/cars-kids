import { Card, Layout, Modal } from '@ui-kitten/components';

import { DefaultInput, NumericInput } from '../../forms';
import { Headline, PrimaryButton, RadioGroupComponent } from '../../ui';
import { useProductEntryModalData } from '../../../hooks';
import { IStatus } from '../../../../infrastructure/interfaces';
import { Product } from '../../../../core/entities';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  product?: Product;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const ProductEntryModal = ({ product, visible, setVisible }: Props) => {
  const { isAdmin, loading, productState, handleFieldChange, handleStatus, onSubmit } = useProductEntryModalData({ product, visible, setVisible });

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.modalContainer}>
          <Headline text={`${product ? 'Actualizar' : 'Nuevo'} producto`} textColor={globalStyles.colorOnyx} />
          <DefaultInput caption='Este valor es único' placeholder={'Nombre'} value={productState.name} onChangeText={(name) => handleFieldChange('name', name)} />
          <NumericInput caption='Costo' placeholder='' value={productState.cost} onChangeText={(cost) => handleFieldChange('cost', cost)} />
          <NumericInput caption='Precio de venta' placeholder='' value={productState.price} onChangeText={(price) => handleFieldChange('price', price)} />
          {!isAdmin && <RadioGroupComponent initialValue={product ? product.status === IStatus.Active ? 0 : 1 : 0} list={['Activo', 'Inactivo']} handleSelection={handleStatus} />}
          <PrimaryButton disabled={loading} text={product ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
