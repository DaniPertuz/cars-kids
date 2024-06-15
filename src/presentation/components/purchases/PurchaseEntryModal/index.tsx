import { useMemo } from 'react';
import { Card, Input, Layout, Modal } from '@ui-kitten/components';

import { Desk, Purchase } from '../../../../core/entities';
import { usePurchaseEntryModalData } from '../../../hooks';
import { ModalTitle, PrimaryButton, SelectComponent } from '../../ui';
import { PurchaseEntryModalPaymentFeesSelects } from '../PurchaseEntryModalPaymentFeesSelects';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const PurchaseEntryModal = ({ desk, purchase, visible, setVisible }: Props) => {
  const {
    customPayment,
    firstFee,
    loading,
    newPurchase,
    products,
    secondFee,
    thirdFee,
    convertPurchasePayment,
    handleFeePayment,
    handleFeeValue,
    handlePayment,
    handleProduct,
    handleQuantity,
    paymentOptions,
    quantityPurchases,
    setFirstFee,
    setSecondFee,
    setThirdFee,
    onSubmit
  } = usePurchaseEntryModalData({ desk, purchase, visible, setVisible });

  const productOptions = useMemo(() => products.map(p => p.name), [products]);

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.transactionsContainer}>
          <Layout style={globalStyles.transactionsOptionsContainer}>
            <ModalTitle purchase={purchase} transaction='Purchase' />
            <SelectComponent placeholder={'Producto'} initialValue={purchase ? purchase.product.name : ''} options={productOptions} handleSelection={handleProduct} />
            {(newPurchase.product.price || purchase?.product.price) && <Input label={'Precio'} disabled value={String(purchase ? purchase.product.price : newPurchase.product.price)} />}
            <SelectComponent placeholder={'Cantidad'} initialValue={purchase ? String(purchase.quantity) : ''} options={quantityPurchases()} handleSelection={handleQuantity} />
            <SelectComponent placeholder={'Medio de pago'} initialValue={purchase ? convertPurchasePayment(purchase.payment) : ''} options={paymentOptions()} handleSelection={handlePayment} />
            {customPayment &&
              <PurchaseEntryModalPaymentFeesSelects
                firstFee={firstFee}
                secondFee={secondFee}
                thirdFee={thirdFee}
                handleFeePayment={handleFeePayment}
                handleFeeValue={handleFeeValue}
                setFirstFee={setFirstFee}
                setSecondFee={setSecondFee}
                setThirdFee={setThirdFee}
              />
            }
          </Layout>
          <PrimaryButton disabled={loading} text={purchase ? 'Actualizar' : 'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
