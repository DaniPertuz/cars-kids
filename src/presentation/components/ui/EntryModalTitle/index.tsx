import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { HeaderFive, ModalCloseButtonContainer } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  title: string;
  onPress: () => void;
}

export const EntryModalTitle = ({ title, onPress }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={{ ...globalStyles.alignCenterRowSpaceBetween }}>
      <Layout style={{ ...background, flex: 7 }}>
        <HeaderFive text={title} />
      </Layout>
      <Layout style={{ ...background, flex: 1 }}>
        <ModalCloseButtonContainer onPress={onPress} />
      </Layout>
    </Layout>
  );
};
