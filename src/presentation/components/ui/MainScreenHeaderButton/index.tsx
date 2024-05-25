import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomIcon } from '../CustomIcon';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  iconName: string;
  onPress: () => void;
}

export const MainScreenHeaderButton = ({ iconName, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
      <CustomIcon name={iconName} fillColor={globalColors.primaryRed} size={styles.iconSize} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  iconSize: {
    height: 40,
    width: 40
  }
});
