import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export const DefaultInput = ({ value, onChangeText }: Props) => {
  const theme = useTheme();

  return (
    <Input
      placeholder='Nombre'
      keyboardType='default'
      value={value}
      onChangeText={onChangeText}
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
