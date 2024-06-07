import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  borderColor?: string;
  size?: string;
}

export const LoadingIndicator = ({ borderColor, size }: Props) => {
  return (
    <View style={globalStyles.alignJustifyCenter}>
      <Spinner size={size ? size : 'tiny'} style={borderColor ? { borderColor } : globalStyles.whiteBorder} />
    </View>
  );
};
