import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { Desk } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useCustomTheme, useMainScreenHeaderData } from '../../../hooks';
import { BasicButton } from '../BasicButton';
import { MainScreenHeaderTitle } from '../MainScreenHeaderTitle';
import { MainScreenHeaderLoadingSpinner } from '../MainScreenHeaderLoadingSpinner';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  transaction: Transaction;
  title: string;
  ModalComponent: React.ComponentType<{ transaction: Transaction, visible: boolean; setVisible: (visible: boolean) => void; desk: Desk; }>;
}

export const MainScreenHeader = ({ transaction, title, ModalComponent }: Props) => {
  const { top } = useSafeAreaInsets();
  const { background } = useCustomTheme();
  const { desks, selectedDesk, loading, visible, handleDesk, uploadPurchase, setVisible, showTransactionModal } = useMainScreenHeaderData({ transaction });

  return (
    <Layout style={[{ marginTop: Platform.OS === 'ios' ? top : top + 5, ...styles.container }, background]}>
      <BasicButton activeOpacity={0.5} iconName='plus-circle' fillColor={globalColors.primaryRed} size={{ height: 45, width: 45 }} onPress={showTransactionModal} />
      <MainScreenHeaderTitle desks={desks} selectedDesk={selectedDesk!} title={title} handleDesk={handleDesk} />
      {!loading
        ?
        <BasicButton activeOpacity={0.5} iconName='upload-outline' fillColor={globalColors.primaryRed} size={{ height: 45, width: 45 }} onPress={transaction === 'Purchase' ? uploadPurchase : uploadPurchase} />
        :
        <MainScreenHeaderLoadingSpinner />
      }
      <ModalComponent transaction={transaction} visible={visible} setVisible={setVisible} desk={selectedDesk!} />
    </Layout>
  );
};
