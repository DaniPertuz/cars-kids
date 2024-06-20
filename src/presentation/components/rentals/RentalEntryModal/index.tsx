import { Modal } from '@ui-kitten/components';
import { Desk, Rental } from '../../../../core/entities';
import { ModalBody } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  rental?: Rental;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const RentalEntryModal = ({ desk, rental, visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <ModalBody desk={desk} rental={rental} transaction={'Rental'} visible={false} setVisible={setVisible} />
    </Modal>
  );
};
