import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  iconSize: number;
  prevUrl: string | null;
  onPress: () => void;
}

export const PrevButton = ({ iconSize, prevUrl, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={onPress}
      disabled={!prevUrl}
      style={{ height: iconSize, width: iconSize }}
    >
      <Icon name='arrow-circle-left-outline' fill={prevUrl ? globalColors.dark : globalColors.darkDisabled} />
    </TouchableOpacity>
  );
};
