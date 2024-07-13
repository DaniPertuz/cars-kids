import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LayoutProps } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';

export const InputContainer = ({ children }: LayoutProps) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.inputContainer, background]}>
      {children}
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
    width: '100%'
  }
});
