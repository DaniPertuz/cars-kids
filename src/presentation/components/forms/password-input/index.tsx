import { Input } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const PasswordInput = () => {
  return (
    <Input
      placeholder='Contraseña'
      autoCapitalize='none'
      secureTextEntry
      style={globalStyles.input}
    />
  );
};
