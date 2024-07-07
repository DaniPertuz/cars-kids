import { Text } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  text: string;
  textColor?: string;
}

export const HeaderFive = ({ text, textColor }: Props) => {
  const { defaultColor } = useCustomTheme();
  return <Text category='h5' style={{ color: textColor ? textColor : defaultColor.color }}>{text}</Text>;
};
