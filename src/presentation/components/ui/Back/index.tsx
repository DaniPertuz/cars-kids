import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { CustomIcon } from '../CustomIcon';

export const Back = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={() => navigator.goBack()}
      style={{ height: 25, width: 25 }}
    >
      <CustomIcon name='arrow-circle-left-outline' />
    </TouchableOpacity>
  );
};
