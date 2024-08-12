import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LoadingIndicator } from '../LoadingIndicator';
import { globalColors } from '../../../theme/globalColors';

export const MainScreenHeaderLoadingSpinner = () => {
  return (
    <Layout style={styles.container}>
      <LoadingIndicator color={globalColors.primaryRed} size='medium' />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 0.2
  }
});
