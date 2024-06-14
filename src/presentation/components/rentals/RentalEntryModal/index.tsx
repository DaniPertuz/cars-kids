import { Card, Layout, Modal } from '@ui-kitten/components';

import { Desk, Rental } from '../../../../core/entities';
import { PrimaryButton } from '../../ui';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desk: Desk;
  rental?: Rental
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const RentalEntryModal = ({ desk, rental, visible, setVisible }: Props) => {

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={{}}>
          
          <PrimaryButton disabled={false} text={rental ? 'Actualizar' : 'Agregar'} onPress={() => {}} />
        </Layout>
      </Card>
    </Modal>
  );
};
