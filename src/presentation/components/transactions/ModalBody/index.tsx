import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Input, Layout } from '@ui-kitten/components';

import { Desk, Purchase, Rental } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useCustomTheme, useTransactionEntryModalData } from '../../../hooks';
import { DefaultInput } from '../../forms';
import { TransactionEntryModalPaymentFeesSelects } from '../TransactionEntryModalPaymentFeesSelects';
import { CustomCheckbox, ModalTitle, PrimaryButton, SelectComponent } from '../../ui';
import { VehiclesSelectComponent } from '../../vehicles/VehiclesSelectComponent';
import { TransactionCustomRental } from '../TransactionCustomRental';
import { TransactionLoadingIndicator } from '../TransactionLoadingIndicator';

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
    customRentalTime,
    firstFee,
    isCustomRentalInfo,
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
    handleRentalAmount,
    handleRentalException,
    handleRentalClient,
    handleRentalTime,
    handleRentalVehicle,
    paymentOptions,
    quantityPurchases,
    setCustomRentalAmount,
    setCustomRentalTime,
    onSubmit
  } = useTransactionEntryModalData({ desk, purchase, rental, setVisible });

  const productOptions = useMemo(() => products.map(p => p.name), [products]);
  const rentalInfoOptions = newRental.vehicle.rentalInfo?.map(info => String(info.time));
  const isCustomTime = newRental.vehicle.rentalInfo?.find(info => info.time === rental?.time) === undefined;

  return (
    <Card style={background}>
      <Layout style={[styles.mainContainer, background]}>
        {loading
          ?
          <TransactionLoadingIndicator />
          :
          <Layout style={[globalStyles.transactionsOptionsContainer, background]}>
            <ModalTitle purchase={purchase} rental={rental} transaction={transaction} setVisible={() => setVisible(false)} />
            <>
              {transaction === 'Purchase'
                ?
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[background, styles.scrollContainer]}>
                  <SelectComponent disabled={products.length === 0} placeholder={products.length === 0 ? 'No hay productos' : 'Producto'} initialValue={purchase?.product.name || ''} options={productOptions} handleSelection={handleProduct} />
                  {(newPurchase.product.price || purchase?.product.price) && <Input label={'Precio'} disabled value={String(purchase ? purchase.product.price : newPurchase.product.price)} />}
                  <SelectComponent placeholder={'Cantidad'} initialValue={purchase ? String(purchase?.quantity) : ''} options={quantityPurchases()} handleSelection={(value: string) => handleQuantity(value, 'Purchase')} />
                  <SelectComponent placeholder={'Medio de pago'} initialValue={convertPurchasePayment(purchase?.payment!) || ''} options={paymentOptions()} handleSelection={(value: string) => handlePayment(value, 'Purchase')} />
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
                </ScrollView>
                :
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[background, styles.scrollContainer]}>
                  <DefaultInput placeholder={'Cliente'} value={newRental?.client || ''} onChangeText={(client: string) => handleRentalClient(client)} />
                  <VehiclesSelectComponent disabled={vehicles.length === 0} placeholder={vehicles.length === 0 ? 'No hay vehículos' : 'Vehículo'} initialValue={rental?.vehicle.nickname || ''} vehicles={vehicles} handleSelection={handleRentalVehicle} />
                  {(newRental.vehicle && Object.keys(newRental.vehicle).length > 0) &&
                    <Layout style={styles.selectsContainer}>
                      <SelectComponent disabled={(rentalInfoOptions === undefined || rentalInfoOptions?.length === 0) || isCustomRentalInfo} placeholder={(rentalInfoOptions === undefined || rentalInfoOptions?.length === 0) ? 'Ingrese tiempos de vehículo' : 'Tiempo'} initialValue={rental ? isCustomTime ? '' : String(rental.time) : ''} options={rentalInfoOptions || []} handleSelection={handleRentalTime} />
                      <SelectComponent placeholder={'Medio'} initialValue={convertPurchasePayment(rental?.payment!) || ''} options={paymentOptions()} handleSelection={(value: string) => handlePayment(value, 'Rental')} />
                      {(isCustomRentalInfo) &&
                        <TransactionCustomRental
                          handleRentalAmount={handleRentalAmount}
                          handleRentalTime={handleRentalTime}
                          customRentalTime={customRentalTime}
                          customRentalAmount={customRentalAmount}
                          setCustomRentalTime={setCustomRentalTime}
                          setCustomRentalAmount={setCustomRentalAmount} />
                      }
                      <DefaultInput placeholder={'Observación'} value={newRental?.exception || ''} onChangeText={(exception: string) => handleRentalException(exception)} />
                      <CustomCheckbox isCustomRentalAmount={isCustomRentalInfo} handleCustomRentalAmount={handleCustomRentalAmount} />
                    </Layout>
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
                </ScrollView>
              }
            </>
          </Layout>
        }
      </Layout>
      {((newRental.vehicle && Object.keys(newRental.vehicle).length > 0) || transaction === 'Purchase') &&
        <PrimaryButton disabled={loading} text={rental ? 'Actualizar' : 'Agregar'} onPress={() => onSubmit(transaction === 'Purchase' ? 'Purchase' : 'Rental')} />
      }
    </Card>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, gap: 15 },
  mainContainer: { ...globalStyles.transactionsContainer, minHeight: 250, maxHeight: 320, paddingVertical: 20 },
  selectsContainer: { gap: 20 }
});
