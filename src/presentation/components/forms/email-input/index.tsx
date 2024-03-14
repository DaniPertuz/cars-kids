import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const EmailInput = () => {
  const theme = useTheme();

  return (
    <Input
      placeholder='Email'
      keyboardType='email-address'
      autoCapitalize='none'
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
