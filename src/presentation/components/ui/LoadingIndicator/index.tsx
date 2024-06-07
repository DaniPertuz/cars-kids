import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  color?: string;
  size?: string;
}

export const LoadingIndicator = ({ color, size }: Props) => {
  return (
    <View style={globalStyles.alignJustifyCenter}>
      <Spinner size={size ? size : 'tiny'} style={color ? { borderColor: color } : globalStyles.whiteBorder} />
    </View>
  );
};
