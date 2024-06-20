import { Card, Layout, Modal } from '@ui-kitten/components';

import { Desk, Rental } from '../../../../core/entities';
import { useTransactionEntryModalData } from '../../../hooks';
import { DefaultInput } from '../../forms';
import { TransactionEntryModalPaymentFeesSelects } from '../../transactions/TransactionEntryModalPaymentFeesSelects';
import { LoadingIndicator, ModalTitle, PrimaryButton, SelectComponent } from '../../ui';
import { VehiclesSelectComponent } from '../../vehicles/VehiclesSelectComponent';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  rental?: Rental;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const RentalEntryModal = ({ desk, rental, visible, setVisible }: Props) => {  
  const {
    customPayment,
    firstFee,
    loading,
    newRental,
    secondFee,
    thirdFee,
    vehicles,
    setFirstFee,
    setSecondFee,
    setThirdFee,
    handleFeePayment,
    handleFeeValue,
    handlePayment,
    handleRentalClient,
    handleRentalTime,
    handleRentalVehicle,
    paymentOptions,
    onSubmit
  } = useTransactionEntryModalData({ desk, visible, setVisible });

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      {loading
        ?
        <LoadingIndicator />
        :
        <Card style={globalStyles.mainBackground}>
          <Layout style={globalStyles.transactionsContainer}>
            <Layout style={globalStyles.transactionsOptionsContainer}>
              <ModalTitle rental={rental} transaction='Rental' setVisible={() => setVisible(false)} />
              <DefaultInput placeholder={'Cliente'} value={newRental.client} onChangeText={(client: string) => handleRentalClient(client)} />
              <SelectComponent placeholder={'Tiempo'} initialValue={''} options={['15', '20', '30']} handleSelection={handleRentalTime} />
              <VehiclesSelectComponent placeholder={'Vehículo'} initialValue={''} vehicles={vehicles} handleSelection={handleRentalVehicle} />
              <SelectComponent placeholder={'Medio de pago'} initialValue={''} options={paymentOptions()} handleSelection={(value: string) => handlePayment(value, "Rental")} />
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
            </Layout>
            <PrimaryButton disabled={false} text={rental ? 'Actualizar' : 'Agregar'} onPress={() => onSubmit('Rental')} />
          </Layout>
        </Card>
      }
    </Modal>
  );
};
