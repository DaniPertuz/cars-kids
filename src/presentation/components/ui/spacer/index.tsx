import { Layout } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  height: number;
}

export const Spacer = ({ height }: Props) => <Layout style={{ height, ...globalStyles.mainBackground }} />;
