import { Icon, IconElement } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  name: string;
  fillColor?: string;
  size?: { height: number, width: number; };
}

export const CustomIcon = ({ name, fillColor, size }: Props): IconElement => {
  const { customFillColor } = useCustomTheme();
  return (
    <Icon style={!size ? globalStyles.iconSize : size} name={name} fill={fillColor ? fillColor : customFillColor.fillColor} />
  );
};
