import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

interface Props {
  iconSize: number;
  onPress: () => void;
}

export const NextButton = ({ iconSize, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={onPress}
      style={{ height: iconSize, width: iconSize }}
    >
      <Icon name='arrow-circle-right-outline' />
    </TouchableOpacity>
  );
};
