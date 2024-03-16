import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, IconElement } from '@ui-kitten/components';
import { RootStackParams } from '../../../navigation/MainNavigator';

const BackIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='arrow-circle-left-outline'
  />
);

export const Back = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={() => navigator.goBack()}
      style={{ height: 25, width: 25 }}
    >
      <BackIcon />
    </TouchableOpacity>
  );
};
