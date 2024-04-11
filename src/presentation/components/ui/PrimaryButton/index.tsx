import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import { LoadingIndicator } from '../';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  color?: string;
  text: string;
  disabled: boolean;
  onPress: () => void;
}

export const PrimaryButton = ({ color, text, disabled, onPress }: Props) => {

  return (
    <Button
      style={[styles.button, { backgroundColor: color ? color : globalColors.primaryRed, borderColor: color ? color : globalColors.primaryRed }]}
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
    borderRadius: 15,
    width: '50%'
  }
});
