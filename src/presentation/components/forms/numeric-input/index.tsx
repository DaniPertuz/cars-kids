import { Input } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  caption?: string;
  placeholder: string;
  value: number;
  onChangeText: (text: number) => void;
}

export const NumericInput = ({ caption, placeholder, value, onChangeText }: Props) => {
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
      textStyle={globalStyles.colorOnyx}
      style={globalStyles.input}
    />
  );
};
