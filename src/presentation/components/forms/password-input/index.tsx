import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (password: string) => void;
}

export const PasswordInput = ({ placeholder, value, onChangeText }: Props) => {
  const theme = useTheme();

  return (
    <Input
      placeholder={placeholder}
      autoCapitalize='none'
      secureTextEntry
      value={value}
      onChangeText={onChangeText}
      textStyle={globalStyles.colorOnyx}
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
