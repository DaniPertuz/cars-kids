import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import { LoadingIndicator } from '../';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  text: string;
  disabled: boolean;
  onPress: () => void;
}

export const PrimaryButton = ({ text, disabled, onPress }: Props) => {

  return (
    <Button
      style={styles.button}
      disabled={disabled}
      onPress={onPress}
      accessoryLeft={disabled ? LoadingIndicator : undefined}
    >
      {!disabled ? text : undefined}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: globalColors.primaryRed,
    borderColor: globalColors.primaryRed,
    borderRadius: 15,
    width: '50%'
  }
});
