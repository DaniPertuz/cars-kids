import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { CustomIcon } from '../CustomIcon';

interface Props {
  activeOpacity: number;
  fillColor: string;
  iconName: string;
  size?: { height: number, width: number; };
  style?: StyleProp<ViewStyle>
  onPress: () => void;
}

export const BasicButton = ({ activeOpacity, fillColor, iconName, size, onPress }: Props) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
      <CustomIcon name={iconName} size={size} fillColor={fillColor} />
    </TouchableOpacity>
  );
};
