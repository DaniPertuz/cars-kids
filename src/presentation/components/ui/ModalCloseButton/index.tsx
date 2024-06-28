import { TouchableOpacity } from 'react-native';
import { CustomIcon } from '../CustomIcon';
import { globalColors } from '../../../theme/globalColors';

export const ModalCloseButton = ({ onPress }: { onPress: () => void; }) => {
  return (
    <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
      <CustomIcon name={'close-circle-outline'} size={{ height: 35, width: 35 }} fillColor={globalColors.secondaryRed} />
    </TouchableOpacity>
  );
};
