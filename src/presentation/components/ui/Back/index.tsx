import { Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { CustomIcon } from '../CustomIcon';
import { globalStyles } from '../../../styles/global.styles';

export const Back = ({ top }: { top: number; }) => {
  const { background } = useCustomTheme();
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <Layout style={{ ...globalStyles.backButtonContainer, marginTop: Platform.OS === 'android' ? top + 20 : top }}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => navigator.goBack()}
        style={[globalStyles.iconSize, background]}
      >
        <CustomIcon name='arrow-circle-left-outline' />
      </TouchableOpacity>
    </Layout>
  );
};
