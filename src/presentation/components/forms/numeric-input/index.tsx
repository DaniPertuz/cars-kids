import { StyleProp, TextStyle } from 'react-native';
import { Input } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  caption?: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  value: number;
  onChangeText: (text: number) => void;
}

export const NumericInput = ({ caption, placeholder, style, value, onChangeText }: Props) => {
  const { borderColor } = useCustomTheme();
  const handleTextChange = (text: string) => {
    const numericValue = parseFloat(text);
    onChangeText(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <Input
      placeholder={placeholder}
      caption={caption}
      keyboardType='numeric'
      value={String(value)}
      onChangeText={handleTextChange}
      style={[{ borderRadius: 10, borderWidth: 1 }, borderColor, style]}
    />
  );
};
