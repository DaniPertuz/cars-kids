import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { globalColors } from '../../../theme/globalColors';

export const SpinnerContainer = () => {
  return (
    <Layout style={styles.loadingContainer}>
      <LoadingScreen />
    </Layout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: globalColors.background,
    paddingVertical: '100%'
  }
})
