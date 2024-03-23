import { Input } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (email: string) => void;
}

export const EmailInput = ({ placeholder, value, onChangeText }: Props) => {

  return (
    <Input
      placeholder={placeholder}
      keyboardType='email-address'
      autoCapitalize='none'
      value={value}
      onChangeText={onChangeText}
      textStyle={globalStyles.colorOnyx}
      style={globalStyles.input}
    />
  );
};
