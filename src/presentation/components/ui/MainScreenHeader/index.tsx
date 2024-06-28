import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { Desk } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useMainScreenHeaderData } from '../../../hooks/useMainScreenHeaderData';
import { MainScreenHeaderButton } from '../MainScreenHeaderButton';
import { MainScreenHeaderTitle } from '../MainScreenHeaderTitle';
import { MainScreenHeaderLoadingSpinner } from '../MainScreenHeaderLoadingSpinner';

import { styles } from './styles';

interface Props {
  transaction: Transaction;
  title: string;
  ModalComponent: React.ComponentType<{ transaction: Transaction, visible: boolean; setVisible: (visible: boolean) => void; desk: Desk; }>;
}

export const MainScreenHeader = ({ transaction, title, ModalComponent }: Props) => {
  const { top } = useSafeAreaInsets();
  const { desks, selectedDesk, loading, visible, handleDesk, uploadPurchase, setVisible, showTransactionModal } = useMainScreenHeaderData({ transaction });

  return (
    <Layout style={{ marginTop: top, ...styles.container }}>
      <MainScreenHeaderButton iconName={'plus-circle'} onPress={showTransactionModal} />
      <MainScreenHeaderTitle desks={desks} selectedDesk={selectedDesk!} title={title} handleDesk={handleDesk} />
      {!loading
        ?
        <MainScreenHeaderButton iconName={'upload-outline'} onPress={transaction === 'Purchase' ? uploadPurchase : uploadPurchase} />
        :
        <MainScreenHeaderLoadingSpinner />
      }
      <ModalComponent transaction={transaction} visible={visible} setVisible={setVisible} desk={selectedDesk!} />
    </Layout>
  );
};
