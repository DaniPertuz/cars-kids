import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  linkText: string;
  onPress: () => void;
}

export const LoginFooter = ({ text, linkText, onPress }: Props) => {
  const { background, defaultColor } = useCustomTheme();
  return (
    <Layout style={[styles.footer, background]}>
      <Text style={defaultColor}>{text} </Text>
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
    justifyContent: 'center'
  }
});
