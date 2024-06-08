import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { Desk } from '../../../../core/entities';
import { useMainScreenHeaderData } from '../../../hooks/useMainScreenHeaderData';
import { MainScreenHeaderButton } from '../MainScreenHeaderButton';
import { MainScreenHeaderTitle } from '../MainScreenHeaderTitle';
import { MainScreenHeaderLoadingSpinner } from '../MainScreenHeaderLoadingSpinner';

import { styles } from './styles';

interface Props {
  purchases: boolean;
  title: string;
  ModalComponent: React.ComponentType<{ visible: boolean; setVisible: (visible: boolean) => void; desk: Desk; }>;
}

export const MainScreenHeader = ({ purchases, title, ModalComponent }: Props) => {
  const { top } = useSafeAreaInsets();
  const { desks, selectedDesk, loading, visible, handleDesk, handleUpload, setVisible, showPurchaseModal } = useMainScreenHeaderData({ purchases });

  return (
    <Layout style={{ marginTop: top, ...styles.container }}>
      <MainScreenHeaderButton iconName={'plus-circle'} onPress={showPurchaseModal} />
      <MainScreenHeaderTitle desks={desks} selectedDesk={selectedDesk!} title={title} handleDesk={handleDesk} />
      {!loading
        ?
        <MainScreenHeaderButton iconName={'upload-outline'} onPress={handleUpload} />
        :
        <MainScreenHeaderLoadingSpinner />
      }
      <ModalComponent visible={visible} setVisible={setVisible} desk={selectedDesk!} />
    </Layout>
  );
};
