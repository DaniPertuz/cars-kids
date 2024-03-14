import { Input } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const DefaultInput = () => {
  return (
    <Input
      placeholder='Nombre'
      keyboardType='default'
      style={globalStyles.input}
    />
  );
};
