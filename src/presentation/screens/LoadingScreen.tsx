import { Layout, Spinner } from '@ui-kitten/components';
import { globalStyles } from '../styles/global.styles';

export const LoadingScreen = () => {
  return (
    <Layout style={globalStyles.flexAlignJustifyCenter}>
      <Spinner size='large' style={globalStyles.redBorder} />
    </Layout>
  );
};
