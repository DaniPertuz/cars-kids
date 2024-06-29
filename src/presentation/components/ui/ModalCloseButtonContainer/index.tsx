import { Layout } from '@ui-kitten/components';
import { ModalCloseButton } from '../ModalCloseButton';
import { globalStyles } from '../../../styles/global.styles';

export const ModalCloseButtonContainer = ({ onPress }: { onPress: () => void; }) => {
  return (
    <Layout style={{ ...globalStyles.mainBackground, alignItems: 'flex-end' }}>
      <ModalCloseButton onPress={onPress} />
    </Layout>
  );
};
