import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LoadingIndicator } from '../LoadingIndicator';
import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';

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
    flex: 1,
    ...globalStyles.mainBackground
  }
});
