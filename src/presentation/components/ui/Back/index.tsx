import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { CustomIcon } from '../CustomIcon';
import { globalStyles } from '../../../styles/global.styles';

export const Back = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={() => navigator.goBack()}
      style={globalStyles.iconSize}
    >
      <CustomIcon name='arrow-circle-left-outline' />
    </TouchableOpacity>
  );
};
