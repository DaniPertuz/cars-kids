import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

export const LoadingIndicator = () => {
  return (
    <View style={globalStyles.alignJustifyCenter}>
      <Spinner size='tiny' style={globalStyles.whiteBorder} />
    </View>
  );
};
