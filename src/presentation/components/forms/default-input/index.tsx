import { Input, useTheme } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const DefaultInput = () => {
  const theme = useTheme();

  return (
    <Input
      placeholder='Nombre'
      keyboardType='default'
      style={[globalStyles.input, { backgroundColor: theme['color-basic-100'] }]}
    />
  );
};
