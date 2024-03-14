import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const PasswordInput = () => {
  const theme = useTheme();

  return (
    <Input
      placeholder='Contraseña'
      autoCapitalize='none'
      secureTextEntry
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
