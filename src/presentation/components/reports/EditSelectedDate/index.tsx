import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { HeaderSix, CustomIcon } from '../../ui';
import { styles } from './styles';

interface Props {
  text: string;
  onPress: () => void;
}

export const EditSelectedDate = ({ text, onPress }: Props) => {
  return (
    <Layout style={styles.container}>
      <HeaderSix text={text} />
      <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
        <CustomIcon name='edit-outline' />
      </TouchableOpacity>
    </Layout>
  );
};
