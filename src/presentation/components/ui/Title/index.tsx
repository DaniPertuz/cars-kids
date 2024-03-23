import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  onPress?: () => void;
}

export const Title = ({ text, onPress }: Props) => <Text category='h1' style={globalStyles.colorOnyx} onPress={onPress}>{text}</Text>;
