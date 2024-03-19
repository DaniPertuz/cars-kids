import { Icon, IconElement } from '@ui-kitten/components';

interface Props {
  name: string;
  fillColor?: string;
}

export const CustomIcon = ({ name, fillColor }: Props): IconElement => <Icon style={{ height: 25, width: 25 }} name={name} fill={fillColor} />;
