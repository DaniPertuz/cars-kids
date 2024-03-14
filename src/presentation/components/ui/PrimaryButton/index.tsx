import { Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
}

export const PrimaryButton = ({ text, onPress }: Props) => {
  return (
    <Button style={styles.button} onPress={onPress}>
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E92E29',
    borderColor: '#E92E29',
    borderRadius: 15
  }
});
