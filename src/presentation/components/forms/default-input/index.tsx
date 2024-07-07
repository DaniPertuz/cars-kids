import { Input } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  caption?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const DefaultInput = ({ caption, placeholder, value, onChangeText }: Props) => {
  const { borderColor } = useCustomTheme();

  return (
    <Input
      placeholder={placeholder}
      caption={caption}
      keyboardType='default'
      value={value}
      onChangeText={onChangeText}
      style={[{ borderRadius: 10, borderWidth: 1 }, borderColor]}
    />
  );
};
