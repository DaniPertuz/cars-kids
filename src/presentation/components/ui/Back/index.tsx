import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { CustomIcon } from '../CustomIcon';
import { globalStyles } from '../../../styles/global.styles';

export const Back = ({ top }: { top: number; }) => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <Layout style={{ ...globalStyles.backButtonContainer, marginTop: top }}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => navigator.goBack()}
        style={globalStyles.iconSize}
      >
        <CustomIcon name='arrow-circle-left-outline' />
      </TouchableOpacity>
    </Layout>
  );
};
