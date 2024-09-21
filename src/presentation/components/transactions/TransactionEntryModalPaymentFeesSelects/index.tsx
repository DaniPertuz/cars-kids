import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Fee } from '../../../../infrastructure/interfaces';
import { paymentDescriptions } from '../../../../utils';
import { useCustomTheme } from '../../../hooks';
import { NumericInput } from '../../forms';
import { SelectComponent } from '../../ui';

interface Props {
  firstFee: Fee;
  secondFee: Fee;
  thirdFee: Fee;
  handleFeePayment: (feeSetter: React.Dispatch<React.SetStateAction<Fee>>, value: string) => void;
  handleFeeValue: (feeSetter: React.Dispatch<React.SetStateAction<Fee>>, value: number) => void;
  setFirstFee: React.Dispatch<React.SetStateAction<Fee>>;
  setSecondFee: React.Dispatch<React.SetStateAction<Fee>>;
  setThirdFee: React.Dispatch<React.SetStateAction<Fee>>;
}

const FeeSelector = ({ fee, handleFeePayment, handleFeeValue, setFee }: { fee: Fee; handleFeePayment: Function; handleFeeValue: Function; setFee: Function; }) => {
  return (
    <Layout style={styles.selectorContainer}>
      <SelectComponent style={styles.flexOne} placeholder={'Medio'} initialValue='' options={Object.values(paymentDescriptions)} handleSelection={(value: string) => handleFeePayment(setFee, value)} />
      <NumericInput style={styles.flexOne} placeholder={'Valor'} onChangeText={(value: number) => handleFeeValue(setFee, Number(value))} value={fee.price} caption={'Cuota'} />
    </Layout>
  );
};

export const TransactionEntryModalPaymentFeesSelects = ({ firstFee, secondFee, thirdFee, handleFeePayment, handleFeeValue, setFirstFee, setSecondFee, setThirdFee }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.feeSelectContainer, background]}>
      <FeeSelector fee={firstFee} handleFeePayment={handleFeePayment} handleFeeValue={handleFeeValue} setFee={setFirstFee} />
      <FeeSelector fee={secondFee} handleFeePayment={handleFeePayment} handleFeeValue={handleFeeValue} setFee={setSecondFee} />
      <FeeSelector fee={thirdFee} handleFeePayment={handleFeePayment} handleFeeValue={handleFeeValue} setFee={setThirdFee} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
  feeSelectContainer: {
    gap: 10,
    marginTop: 20
  }
});
