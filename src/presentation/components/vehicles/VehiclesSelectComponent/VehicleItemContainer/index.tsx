import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LayoutProps } from '../../../../../infrastructure/interfaces';

export const VehicleItemContainer = ({ children }: LayoutProps) => {
  return (
    <Layout style={styles.container}>
      {children}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 10
  }
});
