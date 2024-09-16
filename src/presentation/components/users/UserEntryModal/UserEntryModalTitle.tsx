import { Layout } from '@ui-kitten/components';
import { HeaderFive, ModalCloseButtonContainer } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  title: string;
  onPress: () => void;
}

export const UserEntryModalTitle = ({ title, onPress }: Props) => {
  return (
    <Layout style={globalStyles.alignCenterRowSpaceBetween}>
      <HeaderFive text={title} />
      <ModalCloseButtonContainer onPress={onPress} />
    </Layout>
  );
};
