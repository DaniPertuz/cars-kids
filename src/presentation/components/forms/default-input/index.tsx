import { Input } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  caption?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const DefaultInput = ({ caption, placeholder, value, onChangeText }: Props) => {

  return (
    <Input
      placeholder={placeholder}
      caption={caption}
      keyboardType='default'
      value={value}
      onChangeText={onChangeText}
      textStyle={globalStyles.colorOnyx}
      style={globalStyles.input}
    />
  );
};
