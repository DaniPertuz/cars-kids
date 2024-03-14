import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  value: string;
  onChangeText: (email: string) => void;
}

export const EmailInput = ({ value, onChangeText }: Props) => {
  const theme = useTheme();

  return (
    <Input
      placeholder='Email'
      keyboardType='email-address'
      autoCapitalize='none'
      value={value}
      onChangeText={onChangeText}
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
