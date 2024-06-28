import { Modal } from '@ui-kitten/components';
import { Desk, Purchase, Rental } from '../../../../core/entities';
import { ModalBody } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';
import { Transaction } from '../../../../infrastructure/interfaces';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  rental?: Rental;
  transaction: Transaction;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const TransactionEntryModal = ({ desk, purchase, rental, transaction, visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <ModalBody desk={desk} purchase={purchase} rental={rental} transaction={transaction} setVisible={setVisible} />
    </Modal>
  );
};
