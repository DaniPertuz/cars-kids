import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { LoadingScreen } from '../../../screens/LoadingScreen';

export const SpinnerContainer = () => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.loadingContainer, background]}>
      <LoadingScreen />
    </Layout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    paddingVertical: '100%'
  }
})
