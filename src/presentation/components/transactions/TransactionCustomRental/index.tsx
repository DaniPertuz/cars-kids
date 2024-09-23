import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { NumericInput } from '../../forms';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

interface Props {
  customRentalTime: number;
  customRentalAmount: number;
  handleRentalAmount: (value: string) => void;
  handleRentalTime: (value: string) => void;
  setCustomRentalTime: (value: number) => void;
  setCustomRentalAmount: (value: number) => void;
}

export const TransactionCustomRental = ({ customRentalTime, customRentalAmount, handleRentalAmount, handleRentalTime, setCustomRentalTime, setCustomRentalAmount }: Props) => {
  const { background } = useCustomTheme();
  return (
    <KeyboardAvoidingView style={styles.flexOne} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Layout style={[background, styles.container]}>
        <Layout style={[background, styles.flexOne]}>
          <NumericInput placeholder='Tiempo' caption='Tiempo' value={customRentalTime} onChangeText={(time: number) => {setCustomRentalTime(time); handleRentalTime(String(time))}} />
        </Layout>
        <Layout style={[background, styles.flexOne]}>
          <NumericInput placeholder='Monto' caption='Monto' value={customRentalAmount} onChangeText={(amount: number) => {setCustomRentalAmount(amount); handleRentalAmount(String(amount))}} />
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'space-between'
  },
  flexOne: {
    flex: 1
  }
});
