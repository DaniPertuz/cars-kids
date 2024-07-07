import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Input, Layout } from '@ui-kitten/components';

import { Desk, Purchase, Rental } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useCustomTheme, useTransactionEntryModalData } from '../../../hooks';
import { DefaultInput, NumericInput } from '../../forms';
import { TransactionEntryModalPaymentFeesSelects } from '../TransactionEntryModalPaymentFeesSelects';
import { CustomCheckbox, LoadingIndicator, ModalTitle, PrimaryButton, SelectComponent } from '../../ui';
import { VehiclesSelectComponent } from '../../vehicles/VehiclesSelectComponent';

import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  rental?: Rental;
  transaction: Transaction;
  setVisible: (value: boolean) => void;
}

export const ModalBody = ({ desk, purchase, rental, transaction, setVisible }: Props) => {
  const { background } = useCustomTheme();
  const {
    customPayment,
    customRentalAmount,
    firstFee,
    isCustomRentalAmount,
    loading,
    newPurchase,
    newRental,
    products,
    secondFee,
    thirdFee,
    vehicles,
    convertPurchasePayment,
    handleCustomRentalAmount,
    setFirstFee,
    setSecondFee,
    setThirdFee,
    handleFeePayment,
    handleFeeValue,
    handlePayment,
    handleProduct,
    handleQuantity,
    handleRentalException,
    handleRentalClient,
    handleRentalTime,
    handleRentalVehicle,
    paymentOptions,
    quantityPurchases,
    setCustomRentalAmount,
    onSubmit
  } = useTransactionEntryModalData({ desk, purchase, rental, setVisible });

  const productOptions = useMemo(() => products.map(p => p.name), [products]);

  return (
    <Card style={background}>
      <Layout style={[{ ...globalStyles.transactionsContainer, height: loading ? transaction === 'Rental' ? 425 : 288 : 'auto' }, background]}>
        {loading
          ?
          <Layout style={[background, styles.container]}>
            <LoadingIndicator color={globalColors.primaryRed} />
          </Layout>
          :
          <>
            <Layout style={[globalStyles.transactionsOptionsContainer, background]}>
              <ModalTitle purchase={purchase} rental={rental} transaction={transaction} setVisible={() => setVisible(false)} />
              <>
                {transaction === 'Purchase'
                  ?
                  <>
                    <SelectComponent placeholder={'Producto'} initialValue={purchase?.product.name || ''} options={productOptions} handleSelection={handleProduct} />
                    {(newPurchase.product.price || purchase?.product.price) && <Input label={'Precio'} disabled value={String(purchase ? purchase.product.price : newPurchase.product.price)} />}
                    <SelectComponent placeholder={'Cantidad'} initialValue={purchase ? String(purchase?.quantity) : ''} options={quantityPurchases()} handleSelection={(value: string) => handleQuantity(value, 'Purchase')} />
                    <SelectComponent placeholder={'Medio de pago'} initialValue={convertPurchasePayment(purchase?.payment!) || ''} options={paymentOptions()} handleSelection={(value: string) => handlePayment(value, 'Purchase')} />
                  </>
                  :
                  <>
                    <DefaultInput placeholder={'Cliente'} value={newRental?.client || ''} onChangeText={(client: string) => handleRentalClient(client)} />
                    <SelectComponent placeholder={'Tiempo'} initialValue={rental ? String(rental.time) : ''} options={['15', '20', '30']} handleSelection={handleRentalTime} />
                    <VehiclesSelectComponent placeholder={'Vehículo'} initialValue={rental?.vehicle.nickname || ''} vehicles={vehicles} handleSelection={handleRentalVehicle} />
                    <SelectComponent placeholder={'Medio de pago'} initialValue={convertPurchasePayment(rental?.payment!) || ''} options={paymentOptions()} handleSelection={(value: string) => handlePayment(value, 'Rental')} />
                    {isCustomRentalAmount && <NumericInput placeholder='Monto' value={customRentalAmount || 0} onChangeText={(amount: number) => setCustomRentalAmount(amount)} />}
                    <DefaultInput placeholder={'Observación'} value={newRental?.exception || ''} onChangeText={(exception: string) => handleRentalException(exception)} />
                    <CustomCheckbox isCustomRentalAmount={isCustomRentalAmount} handleCustomRentalAmount={handleCustomRentalAmount} />
                  </>
                }
                {customPayment &&
                  <TransactionEntryModalPaymentFeesSelects
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
              </>
            </Layout>
            <PrimaryButton disabled={loading} text={rental ? 'Actualizar' : 'Agregar'} onPress={() => onSubmit(transaction === 'Purchase' ? 'Purchase' : 'Rental')} />
          </>
        }
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})
