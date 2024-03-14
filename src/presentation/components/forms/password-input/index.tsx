import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  value: string;
  onChangeText: (password: string) => void;
}

export const PasswordInput = ({ value, onChangeText }: Props) => {
  const theme = useTheme();

  return (
    <Input
      placeholder='Contraseña'
      autoCapitalize='none'
      secureTextEntry
      value={value}
      onChangeText={onChangeText}
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
