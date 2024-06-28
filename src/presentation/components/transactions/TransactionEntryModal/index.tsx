import { Modal } from '@ui-kitten/components';
import { Desk, Purchase, Rental } from '../../../../core/entities';
import { ModalBody } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  rental?: Rental;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const TransactionEntryModal = ({ desk, purchase, rental, visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <ModalBody desk={desk} purchase={purchase} rental={rental} transaction={'Purchase'} setVisible={setVisible} />
    </Modal>
  );
};
