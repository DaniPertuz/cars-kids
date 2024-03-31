import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  onPress?: () => void;
}

export const CalloutBold = ({ text, onPress }: Props) => <Text category='s2' style={globalStyles.colorOnyx} onPress={onPress}>{text}</Text>;
