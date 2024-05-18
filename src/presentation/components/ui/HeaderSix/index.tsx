import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  textColor?: string;
}

export const HeaderSix = ({ text, textColor }: Props) => <Text category='h6' style={textColor ? { color: textColor } : globalStyles.colorOnyx}>{text}</Text>;
