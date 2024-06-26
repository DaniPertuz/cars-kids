import { Layout, Spinner } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  color?: string;
  size?: string;
}

export const LoadingIndicator = ({ color, size }: Props) => {
  return (
    <Layout style={{ ...globalStyles.alignJustifyCenter, backgroundColor: 'transparent' }}>
      <Spinner size={size ? size : 'tiny'} style={color ? { borderColor: color } : globalStyles.whiteBorder} />
    </Layout>
  );
};
