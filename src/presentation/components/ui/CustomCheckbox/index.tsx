import { CheckBox } from '@ui-kitten/components';

export const CustomCheckbox = ({ isCustomRentalAmount, handleCustomRentalAmount }: { isCustomRentalAmount: boolean, handleCustomRentalAmount: (value: boolean) => void; }) => {
  return (
    <CheckBox
      checked={isCustomRentalAmount}
      onChange={nextChecked => handleCustomRentalAmount(nextChecked)}
      status='danger'
    >
      {'Personalizado'}
    </CheckBox>
  );
};
