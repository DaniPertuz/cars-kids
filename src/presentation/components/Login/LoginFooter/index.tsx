import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';
import { Layout, Text } from '@ui-kitten/components';

interface Props {
  text: string;
  linkText: string;
  onPress: () => void;
}

export const LoginFooter = ({ text, linkText, onPress }: Props) => {
  return (
    <Layout style={styles.footer}>
      <Text style={globalStyles.colorOnyx}>{text} </Text>
      <Text style={globalStyles.colorPrimaryRed} onPress={onPress}>
        {linkText}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    ...globalStyles.mainBackground
  }
});
