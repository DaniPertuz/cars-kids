import { Fee } from '../../../../infrastructure/interfaces';
import { paymentDescriptions } from '../../../../utils';
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
    <>
      <SelectComponent placeholder={'Medio de pago'} initialValue='' options={Object.values(paymentDescriptions)} handleSelection={(value: string) => handleFeePayment(setFee, value)} />
      <NumericInput placeholder={'Valor'} onChangeText={(value: number) => handleFeeValue(setFee, Number(value))} value={fee.price} caption={'Cuota'} />
    </>
  );
};

export const PurchaseEntryModalPaymentFeesSelects = ({ firstFee, secondFee, thirdFee, handleFeePayment, handleFeeValue, setFirstFee, setSecondFee, setThirdFee }: Props) => {
  return (
    <>
      <FeeSelector fee={firstFee} handleFeePayment={handleFeePayment} handleFeeValue={handleFeeValue} setFee={setFirstFee} />
      <FeeSelector fee={secondFee} handleFeePayment={handleFeePayment} handleFeeValue={handleFeeValue} setFee={setSecondFee} />
      <FeeSelector fee={thirdFee} handleFeePayment={handleFeePayment} handleFeeValue={handleFeeValue} setFee={setThirdFee} />
    </>
  );
};
