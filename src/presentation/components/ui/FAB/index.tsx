import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { CustomIcon } from '../CustomIcon';
import { styles } from './styles';

interface Props {
  iconSize: number;
  iconName: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const FAB = ({ iconName, iconSize, style, onPress }: Props) => {
  const { customFillColor } = useCustomTheme();
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={style}
        onPress={onPress}
      >
        <CustomIcon name={iconName} fillColor={customFillColor.fillColor} size={{ height: iconSize, width: iconSize }} />
      </TouchableOpacity>
    </Layout>
  );
};
