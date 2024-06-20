import { Modal } from '@ui-kitten/components';
import { Desk, Purchase } from '../../../../core/entities';
import { ModalBody } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  purchase?: Purchase;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const PurchaseEntryModal = ({ desk, purchase, visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <ModalBody desk={desk} purchase={purchase} transaction={'Purchase'} visible={false} setVisible={setVisible} />
    </Modal>
  );
};
