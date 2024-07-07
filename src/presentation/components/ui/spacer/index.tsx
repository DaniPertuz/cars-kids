import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  height: number;
}

export const Spacer = ({ height }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ height }, background]} />
  );
}
