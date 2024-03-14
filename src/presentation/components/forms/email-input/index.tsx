import { Input } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const EmailInput = () => {
  return (
    <Input
      placeholder='Email'
      keyboardType='email-address'
      autoCapitalize='none'
      style={globalStyles.input}
    />
  );
};
