import { Layout, Spinner } from '@ui-kitten/components';
import { useCustomTheme } from '../hooks';
import { globalStyles } from '../styles/global.styles';

export const LoadingScreen = () => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[globalStyles.flexAlignJustifyCenter, background]}>
      <Spinner size='giant' style={globalStyles.redBorder} />
    </Layout>
  );
};
