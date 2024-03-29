import { Layout, Spinner } from '@ui-kitten/components';
import { globalStyles } from '../styles/global.styles';

export const LoadingScreen = () => {
  return (
    <Layout style={globalStyles.flexAlignJustifyCenter}>
      <Spinner size='giant' style={globalStyles.redBorder} />
    </Layout>
  );
};
