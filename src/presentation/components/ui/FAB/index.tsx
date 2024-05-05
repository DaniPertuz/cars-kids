import { Icon, Layout } from '@ui-kitten/components';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './styles';

interface Props {
  onPress: () => void;
  iconSize: number;
  iconName: string;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({ iconName, iconSize, style, onPress }: Props) => {
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={onPress}
        style={[{ height: iconSize, width: iconSize }, style]}
      >
        <Icon name={iconName} />
      </TouchableOpacity>
    </Layout>
  );
};
