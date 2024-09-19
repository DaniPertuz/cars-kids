import { Input } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (email: string) => void;
}

export const EmailInput = ({ placeholder, value, onChangeText }: Props) => {
  const { borderColor } = useCustomTheme();

  return (
    <Input
      placeholder={placeholder}
      label={placeholder}
      keyboardType='email-address'
      autoCapitalize='none'
      value={value}
      onChangeText={onChangeText}
      style={[{ borderRadius: 10, borderWidth: 1 }, borderColor]}
    />
  );
};
