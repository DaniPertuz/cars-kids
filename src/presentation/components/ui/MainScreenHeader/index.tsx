import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { Desk } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useCustomTheme, useMainScreenHeaderData } from '../../../hooks';
import { AddTransactionButton } from './AddTransactionButton';
import { HeaderTitleContainer } from './HeaderTitleContainer';
import { UploadTransactionsButton } from './UploadTransactionsButton';

import { styles } from './styles';

interface Props {
  transaction: Transaction;
  title: string;
  ModalComponent: React.ComponentType<{ transaction: Transaction, visible: boolean; setVisible: (visible: boolean) => void; desk: Desk; }>;
}

export const MainScreenHeader = ({ transaction, title, ModalComponent }: Props) => {
  const { top } = useSafeAreaInsets();
  const { background } = useCustomTheme();
  const { desks, selectedDesk, loading, visible, handleDesk, uploadTransaction, setVisible, showTransactionModal } = useMainScreenHeaderData({ transaction });
  const buttonSize = { height: 45, width: 45 };

  return (
    <>
      <Layout style={[{ marginTop: Platform.OS === 'ios' ? top : top + 5, ...styles.container }, background]}>
        <AddTransactionButton buttonSize={buttonSize} onPress={showTransactionModal} />
        <HeaderTitleContainer desks={desks} selectedDesk={selectedDesk!} title={title} onPress={handleDesk} />
        <UploadTransactionsButton loading={loading} buttonSize={buttonSize} onPress={uploadTransaction} />
      </Layout>
      <ModalComponent transaction={transaction} visible={visible} setVisible={setVisible} desk={selectedDesk!} />
    </>
  );
};
